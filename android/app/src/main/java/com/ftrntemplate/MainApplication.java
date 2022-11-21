package com.ftrntemplate;
import android.content.res.Configuration;
import expo.modules.ApplicationLifecycleDispatcher;
import expo.modules.ReactNativeHostWrapper;

import android.app.Application;
import com.facebook.react.bridge.JSIModulePackage;
  import com.swmansion.reanimated.ReanimatedJSIModulePackage;

import com.appboy.Appboy;
import com.appboy.AppboyLifecycleCallbackListener;
//import com.appboy.configuration.AppboyConfig;
// import com.appboy.support.AppboyLogger;
import com.appboy.reactbridge.AppboyReactPackage;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.ftrntemplate.AppboyWrapper.AppboyWrapperViewPackage;
import com.facebook.react.ReactInstanceManager; 
import com.reactnativejnikeys.CLibController;
import com.reactnativejnikeys.JniKeysModule;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;
import com.braze.Braze;
import com.appboy.AppboyLifecycleCallbackListener;
import android.content.Context;
import android.util.Log;
import io.branch.rnbranch.RNBranchModule;
import com.braze.Braze;
import com.appboy.AppboyLifecycleCallbackListener;
import com.braze.configuration.BrazeConfig;
import com.braze.support.BrazeLogger;

public class MainApplication extends Application implements ReactApplication {
  private AppboyLifecycleCallbackListener appboyLifecycleCallbackListener;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHostWrapper(this, new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
           packages.add( new AppboyWrapperViewPackage());

      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected JSIModulePackage getJSIModulePackage() {
      return new ReanimatedJSIModulePackage(); // <- add
    }
  
  });

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    registerActivityLifecycleCallbacks(new AppboyLifecycleCallbackListener());
    // AppboyLogger.setLogLevel(Log.VERBOSE);
    RNBranchModule.getAutoInstance(this);
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    registerAppBoyCallBack();
    ApplicationLifecycleDispatcher.onApplicationCreate(this);
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
          Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.rndiffapp.ReactNativeFlipper");
        aClass
                .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
                .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }

//  private void registerAppBoyCallBack() {
//
//    String appboyKey = JniKeysModule.getKeySync("APP_BOY_API_KEY_ANDROID");
//    AppboyConfig appboyConfig = new AppboyConfig.Builder()
//            .setApiKey(appboyKey)
//            .setPushHtmlRenderingEnabled(true)
//            .setContentCardsUnreadVisualIndicatorEnabled(true)
//            .setPushDeepLinkBackStackActivityEnabled(true)
//            .setInAppMessageTestPushEagerDisplayEnabled(true)
//            .setHandlePushDeepLinksAutomatically(true)
//            .setDefaultNotificationChannelName(getApplicationContext().getString(R.string.appboy_channel_name))
//            .setDefaultNotificationChannelDescription(getApplicationContext().getString(R.string.appboy_channel_description))
//            .build();
//    Appboy.configure(getApplicationContext(), appboyConfig);
//    registerActivityLifecycleCallbacks(new AppboyLifecycleCallbackListener());
//
//  }
  private void registerAppBoyCallBack() {


    try {
      String appboyKey = JniKeysModule.getKeySync("APP_BOY_API_KEY_ANDROID");
      BrazeConfig appboyConfig = new BrazeConfig.Builder()
              .setApiKey(appboyKey)
              .setPushHtmlRenderingEnabled(true)
              .setIsFirebaseCloudMessagingRegistrationEnabled(true)
              .setFirebaseCloudMessagingSenderIdKey("114064630624")
              .setContentCardsUnreadVisualIndicatorEnabled(true)
              .setPushDeepLinkBackStackActivityEnabled(true)
//                    .setInAppMessageTestPushEagerDisplayEnabled(true)
              .setHandlePushDeepLinksAutomatically(true)
              .setDefaultNotificationChannelName(getApplicationContext().getString(R.string.appboy_channel_name))
              .setDefaultNotificationChannelDescription(getApplicationContext().getString(R.string.appboy_channel_description))
              .build();
      Braze.configure(getApplicationContext(), appboyConfig);
      registerActivityLifecycleCallbacks(new AppboyLifecycleCallbackListener());
      } catch (Exception ignore) {
    }

    appboyLifecycleCallbackListener = new AppboyLifecycleCallbackListener();
    registerActivityLifecycleCallbacks(appboyLifecycleCallbackListener);
  }

  @Override
  public void onTerminate() {


    if (appboyLifecycleCallbackListener != null)
      unregisterActivityLifecycleCallbacks(appboyLifecycleCallbackListener);
    super.onTerminate();
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig);
  }
}
