import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

// Create the interstitial ad instance
const adUnitId = __DEV__ 
  ? TestIds.INTERSTITIAL 
  : Platform.select({
      ios: 'YOUR_IOS_INTERSTITIAL_AD_UNIT_ID',
      android: 'YOUR_ANDROID_INTERSTITIAL_AD_UNIT_ID',
    }) || TestIds.INTERSTITIAL;

const interstitial = InterstitialAd.createForAdUnitId(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

export function useInterstitialAd() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      console.log('Interstitial ad loaded');
      setIsLoaded(true);
      setIsLoading(false);
    });

    const unsubscribeError = interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
      console.log('Interstitial ad error:', error);
      setIsLoading(false);
    });

    const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      console.log('Interstitial ad closed');
      setIsLoaded(false);
      // Load a new ad for next time
      loadAd();
    });

    // Load the first ad
    loadAd();

    return () => {
      unsubscribeLoaded();
      unsubscribeError();
      unsubscribeClosed();
    };
  }, []);

  const loadAd = () => {
    if (!isLoading && !isLoaded) {
      setIsLoading(true);
      interstitial.load();
    }
  };

  const showAd = () => {
    if (isLoaded) {
      interstitial.show();
    } else {
      console.log('Interstitial ad not ready yet');
      loadAd(); // Try to load if not already loaded
    }
  };

  return {
    isLoaded,
    isLoading,
    showAd,
    loadAd,
  };
}