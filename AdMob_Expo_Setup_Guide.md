# AdMob Integration Guide for Expo React Native App

## Overview
This guide shows how to integrate Google AdMob ads into your Expo React Native app using the `react-native-google-mobile-ads` library.

## 1. Installation

```bash
npx expo install react-native-google-mobile-ads
```

## 2. Configuration

### app.json Configuration
Add the AdMob plugin to your `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "react-native-google-mobile-ads",
        {
          "androidAppId": "YOUR_ANDROID_ADMOB_APP_ID",
          "iosAppId": "YOUR_IOS_ADMOB_APP_ID"
        }
      ]
    ]
  }
}
```

## 3. Test Ad Unit IDs

For development, the library provides test ad unit IDs:
- **Banner:** Uses `TestIds.ADAPTIVE_BANNER`
- **Interstitial:** Uses `TestIds.INTERSTITIAL`

## 4. Components Created

### AdBanner Component
- Displays adaptive banner ads
- Automatically uses test ads in development
- Handles loading and error states

### InterstitialAdManager Hook
- Manages interstitial ad lifecycle
- Preloads ads for better performance
- Provides easy-to-use interface

## 5. Implementation

### Banner Ads
Banner ads are now displayed at the bottom of both calculator screens:
- Employee calculator (`app/(tabs)/index.tsx`)
- Freelancer calculator (`app/(tabs)/freelancer.tsx`)

### Interstitial Ads
The hook is ready to use. You can trigger interstitial ads by calling:
```typescript
const { showAd, isLoaded } = useInterstitialAd();

// Show ad when needed
if (isLoaded) {
  showAd();
}
```

## 6. Building for Production

### Development Build
Since this uses native code, you'll need to create a development build:

```bash
# Create development build
npx expo run:android
# or
npx expo run:ios
```

### EAS Build
For production builds with EAS:

```bash
eas build --platform android
eas build --platform ios
```

## 7. Replace Placeholders

Before publishing:
1. Replace `YOUR_ANDROID_ADMOB_APP_ID` with your actual Android AdMob App ID
2. Replace `YOUR_IOS_ADMOB_APP_ID` with your actual iOS AdMob App ID
3. Replace ad unit ID placeholders in the components with your actual ad unit IDs

## 8. Testing

The ads will only work in:
- Development builds (not Expo Go)
- Production builds
- Physical devices or emulators with Google Play Services

## 9. Important Notes

- **Expo Go Limitation:** AdMob ads don't work in Expo Go due to native dependencies
- **Development Build Required:** You need to create a development build to test ads
- **Test Ads:** The implementation automatically uses test ads in development mode
- **Revenue:** Only real ads (not test ads) generate revenue

## 10. Next Steps

1. Test the implementation with a development build
2. Replace test ad unit IDs with your production IDs
3. Submit your app for AdMob review
4. Monitor ad performance in the AdMob console
