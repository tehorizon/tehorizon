package com.ftrntemplate;
import expo.modules.ReactActivityDelegateWrapper;

import android.content.Intent;
import android.os.Bundle;
import android.view.WindowManager;

import com.datatheorem.android.trustkit.TrustKit;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.react.modules.network.ReactCookieJarContainer;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import org.devio.rn.splashscreen.SplashScreen;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import io.branch.rnbranch.RNBranchModule;
import okhttp3.OkHttpClient;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ftrntemplate";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegateWrapper(this, new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        try {
            TrustKit.initializeWithNetworkSecurityConfiguration(this);
        } catch (Exception e) {
            e.printStackTrace();
        }
        OkHttpClientProvider.setOkHttpClientFactory(new CustomClientFactory());
        super.onCreate(savedInstanceState);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
        SplashScreen.show(this);
    }

    @Override
    protected void onStart() {
        super.onStart();
        RNBranchModule.initSession(getIntent().getData(), this);
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        if (intent != null &&
        intent.hasExtra("branch_force_new_session") && 
        intent.getBooleanExtra("branch_force_new_session",false)) 
        {
             RNBranchModule.onNewIntent(intent);
        }
    }

    private class CustomClientFactory implements OkHttpClientFactory {
        @Override
        public OkHttpClient createNewNetworkModuleClient() {
            String hostname = null;
            try {
                hostname = new URL("https://www.theentertainerme.com").getHost();
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }

            OkHttpClient.Builder client = new OkHttpClient.Builder()
                    .connectTimeout(0, TimeUnit.MILLISECONDS)
                    .readTimeout(0, TimeUnit.MILLISECONDS)
                    .writeTimeout(0, TimeUnit.MILLISECONDS)
                    .cookieJar(new ReactCookieJarContainer())
                    .sslSocketFactory(TrustKit.getInstance().getSSLSocketFactory(hostname),TrustKit.getInstance().getTrustManager(hostname));
            return OkHttpClientProvider.enableTls12OnPreLollipop(client).build();
        }
    }
}
