# webdriver.io - React Native Example

## Installation
Go to `end-to-end` folder and execute `npm i`

## Run locally
### Android
Go to `end-to-end` folder and execute:

`npm run test-android -- --app FULL_PATH_TO_APK`

Where FULL_PATH_TO_APK is the full file system path the the apk named 'app.apk' in end-to-end folder.
You can rebuild the app and reference to an other apk file if you need.

## Run on Perfecto
### Android

Make sure you uploaded `app.apk` to your private Perfecto storage, then go to `end-to-end` folder and execute:

`npm run test-android-perfecto -- --app PRIVATE:app.apk --appPackage com.perfectoexample --user PERFECTO_USER --password PERFECTO_PASSWORD --deviceName PERFECTO_DEVICE_NANE`
