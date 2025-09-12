# Complete Google AdMob Integration Guide for Android Kotlin

## Overview
This guide provides a complete implementation of Google AdMob ads in your Android Kotlin app, including both Jetpack Compose and XML layout approaches.

## 1. Gradle Dependencies

Add this to your app-level `build.gradle.kts` (or `build.gradle`):

```kotlin
dependencies {
    implementation("com.google.android.gms:play-services-ads:23.6.0")
}
```

## 2. AndroidManifest.xml Configuration

Add the following to your `AndroidManifest.xml`:

```xml
<!-- Add permissions -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

<!-- Inside <application> tag -->
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="YOUR_ADMOB_APP_ID"/>
```

**Replace `YOUR_ADMOB_APP_ID`** with your actual AdMob App ID from the AdMob console.

## 3. SDK Initialization

Initialize the SDK in your `Application` class:

```kotlin
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        
        MobileAds.initialize(this) { initializationStatus ->
            Log.d("AdMob", "SDK initialized successfully")
        }
    }
}
```

## 4. Test Ad Unit IDs

For testing, use these Google-provided test ad unit IDs:

- **Banner:** `ca-app-pub-3940256099942544/6300978111`
- **Interstitial:** `ca-app-pub-3940256099942544/1033173712`

## 5. Implementation Options

### Option A: Jetpack Compose (Recommended)
Use `MainActivity.kt` for a modern Compose-based implementation with:
- Adaptive banner ads
- Proper lifecycle management
- Modern UI patterns

### Option B: XML Layouts
Use `MainActivityXML.kt` and `activity_main_xml.xml` for traditional XML-based layouts.

## 6. Key Features Implemented

### Banner Ads
- **Adaptive sizing** for optimal display across devices
- **Proper lifecycle management** (pause/resume/destroy)
- **Error handling** with detailed logging

### Interstitial Ads
- **Preloading** for better user experience
- **Automatic reloading** after display
- **Full-screen content callbacks** for tracking

## 7. Best Practices Included

1. **Null safety** - All nullable types properly handled
2. **Logging** - Comprehensive logging for debugging
3. **Error handling** - Graceful handling of ad load failures
4. **Memory management** - Proper cleanup in lifecycle methods
5. **Test device configuration** - Easy setup for development testing

## 8. Next Steps

1. Replace all placeholder ad unit IDs with your actual AdMob ad unit IDs
2. Replace `YOUR_ADMOB_APP_ID` with your actual AdMob App ID
3. Test with the provided test ad unit IDs first
4. Add your test device ID for development testing
5. Remove test configuration before production release

## 9. Additional Ad Formats

This implementation can be extended to include:
- Rewarded ads
- Native ads
- App open ads
- Banner ads in RecyclerView

## 10. Production Checklist

- [ ] Replace test ad unit IDs with production IDs
- [ ] Remove test device configuration
- [ ] Test on multiple devices and orientations
- [ ] Verify ad placement doesn't interfere with app functionality
- [ ] Review AdMob policies compliance

## Support

For additional help:
- [AdMob Android Documentation](https://developers.google.com/admob/android)
- [AdMob Help Center](https://support.google.com/admob)
