package com.ftrntemplate.nativemodules;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.ProgressBar;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.CustomTarget;
import com.bumptech.glide.request.transition.Transition;
import com.ftrntemplate.R;
import com.google.vr.sdk.widgets.pano.VrPanoramaView;
import com.google.vr.sdk.widgets.pano.VrPanoramaView.Options;


public class Activity360ImageDisplay extends Activity {
  private VrPanoramaView panoWidgetView;
  private ProgressBar progressBarLoading;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_30_image_view);

    panoWidgetView = (VrPanoramaView) findViewById(R.id.pano_view);
//    panoWidgetView.setEventListener(new VrPanoramaEventListener());
    panoWidgetView.setInfoButtonEnabled(false);
    panoWidgetView.setFullscreenButtonEnabled(false);
    panoWidgetView.setStereoModeButtonEnabled(false);
    progressBarLoading = (ProgressBar)findViewById(R.id.progressBar_loading_hero);
    handleIntent(getIntent());

    findViewById(R.id.iv_back).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        finish();
      }
    });
  }

  @Override
  protected void onNewIntent(Intent intent) {
    setIntent(intent);
    handleIntent(intent);
  }

  private void handleIntent(Intent intent) {
    if(intent!=null && intent.getExtras()!=null && intent.getExtras().getString("url")!=null) {
      progressBarLoading.setVisibility(View.VISIBLE);
      new Handler().postDelayed(new Runnable() {
        @Override
        public void run() {
          if(isFinishing())
            return;
          Glide.with(Activity360ImageDisplay.this).asBitmap().load(intent.getExtras().getString("url")).into(new CustomTarget<Bitmap>() {
            @Override
            public void onResourceReady(Bitmap bitmap, Transition<? super Bitmap> transition) {
              if(isFinishing())
                return;
              Options panoOptions = new Options();
              panoOptions.inputType = Options.TYPE_MONO;
              panoWidgetView.loadImageFromBitmap(bitmap, panoOptions);
              progressBarLoading.setVisibility(View.GONE);
            }
            @Override
            public void onLoadCleared(Drawable placeholder) {
            }
          });
        }
      },2000);
    }
  }


  @Override
  protected void onPause() {
    panoWidgetView.pauseRendering();
    super.onPause();
  }

  @Override
  protected void onResume() {
    super.onResume();
    panoWidgetView.resumeRendering();
  }

  @Override
  protected void onDestroy() {
    panoWidgetView.shutdown();
    super.onDestroy();
  }

}
