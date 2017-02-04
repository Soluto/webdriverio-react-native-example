package com.perfectoexample;

import android.os.Environment;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.util.UUID;

public class DeviceIdModule extends ReactContextBaseJavaModule {
    public DeviceIdModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "DeviceIdProvider";
    }

    @ReactMethod
    public void get(Promise promise) {
        try {
            int currentCharcterIndex = 0;
            File currentCharacterFile = getCharacterFileForIndex(currentCharcterIndex);
            StringBuilder deviceIdBuilder = new StringBuilder();


            if (!currentCharacterFile.exists()) {
                promise.resolve("device id was not found");
            }

            while (currentCharacterFile.exists()){
                char currentCharacter = getCharacterFromFileLength(currentCharacterFile);
                deviceIdBuilder.append(currentCharacter);

                currentCharcterIndex++;
                currentCharacterFile = getCharacterFileForIndex(currentCharcterIndex);
            }

            String deviceId = deviceIdBuilder.toString();
            promise.resolve(validateDeviceId(deviceId) ? deviceId : "device id was found ["+ deviceId+ "], but it is not a valid UUID");
        }
        catch (Exception ex){
            promise.resolve("error occurred when trying to read device id - " + ex.getMessage());
        }
    }

    private File getCharacterFileForIndex(int index){
        String publicStoragePath = Environment.getExternalStorageDirectory().getPath();
        return new File(publicStoragePath +"/soluto-automation/" + index + ".txt");
    }

    private char getCharacterFromFileLength(File fileRepresentingASingleAsciiCharacter){
        // file content aaaa...(103 times) = ascii code 103 = character 'g'
        long asciiCodeRepresentingCurrentCharacter = fileRepresentingASingleAsciiCharacter.length();
        return  (char)asciiCodeRepresentingCurrentCharacter;
    }

    private boolean validateDeviceId(String deviceId){
        try{
            UUID.fromString(deviceId);
            return true;
        } catch (IllegalArgumentException exception){
            return false;
        }
    }


}
