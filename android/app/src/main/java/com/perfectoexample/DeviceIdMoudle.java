package com.perfectoexample;

import android.os.Environment;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class DeviceIdMoudle extends ReactContextBaseJavaModule {
    public DeviceIdMoudle(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "DeviceIdProvider";
    }

    @ReactMethod
    public void get(Promise promise) {
        StringBuilder text = new StringBuilder();
        try {
            String publicStoragePath = Environment.getExternalStorageDirectory().getPath();
            Log.d("", "public storage path - " + publicStoragePath);
            File file = new File(publicStoragePath +"/perfecto-example/deviceId.txt");
            BufferedReader br = new BufferedReader(new FileReader(file));
            String line;

            while ((line = br.readLine()) != null) {
                text.append(line);
                text.append('\n');
            }
            br.close();
        }
        catch (IOException e) {
            promise.resolve("failed to retrieve");
        }
        promise.resolve(text.toString());
    }


}
