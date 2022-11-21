package com.ftrntemplate;

import android.content.Intent;
import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.ftrntemplate.nativemodules.Activity360ImageDisplay;
import com.reactnativejnikeys.JniKeysModule;
//import com.theentertainerme.getaways.GetAways;
//import com.theentertainerme.getaways.GetAwaysConfigs;
//import com.theentertainerme.getaways.utils.CLibController;

import org.json.JSONObject;

import java.util.Map;
import java.util.HashMap;

public class NativeSdkLauncher extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    NativeSdkLauncher(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "NativeSdkLauncher";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void lunch360ImageViewer(String url) {
        Intent intent = new Intent(this.getReactApplicationContext(), Activity360ImageDisplay.class);
        intent.putExtra("url",url);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK );
        this.getReactApplicationContext().startActivity(intent);

    }

//    @ReactMethod
//    public void getAways(ReadableMap data) {
//        if (data != null) {
//        HashMap params = new HashMap<String, String>();
//            params.put("location_id", data.getString("locationID"));
//            params.put("flavor", data.getString("node"));
//
//            String sessionToken  = data.getString("userSessionToken");
//
//            GetAwaysConfigs getAwaysConfigs = new GetAwaysConfigs(
//                    JniKeysModule.getKeySync("GETAWAYS_KEY"),
//                    sessionToken,
//                    getReactApplicationContext().getResources().getString(R.string.app_name),
//                    BuildConfig.VERSION_NAME,
//                    "en",
//                    "",
//                    params,
//                    null
//            );
//            com.theentertainerme.getaways.GetAways.withConfig(getAwaysConfigs);
//        }
//    }
}