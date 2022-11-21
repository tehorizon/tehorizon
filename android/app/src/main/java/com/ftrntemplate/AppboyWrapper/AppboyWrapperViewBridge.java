package com.ftrntemplate.AppboyWrapper;


import android.content.Context;
import android.view.InflateException;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.ftrntemplate.R;

public class AppboyWrapperViewBridge extends SimpleViewManager<FrameLayout> {
    public static final String REACT_CLASS = "AppboyWrapper";

    View view = null;
    @Override
    public String getName() {
        return REACT_CLASS;
    }
    ReactApplicationContext mCallerContext;

    public AppboyWrapperViewBridge(ReactApplicationContext reactContext) {
        mCallerContext = reactContext;
    }
    @Override
    protected FrameLayout createViewInstance(ThemedReactContext reactContext) {

        if (view != null) {
            ViewGroup parent = (ViewGroup) view.getParent();
            if (parent != null)
                parent.removeView(view);
        }

        try {
            LayoutInflater inflater = (LayoutInflater) reactContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            view = inflater.inflate(R.layout.appboyframelayout, null, false);
        } catch (InflateException ignore) {
        }

        return (FrameLayout) view;
    }
}