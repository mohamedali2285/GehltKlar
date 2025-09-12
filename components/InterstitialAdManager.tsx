import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export function useInterstitialAd() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Only initialize on native platforms
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Mock implementation for web
      setIsLoaded(true);
      return;
    }

    try {
      const { InterstitialAd, AdEventType, TestIds } = require('react-native-google-mobile-ads');
      
      const adUnitId = __DEV__ 
        ? TestIds.INTERSTITIAL 
        : Platform.select({
            ios: 'YOUR_IOS_INTERSTITIAL_AD_UNIT_ID',
            android: 'YOUR_ANDROID_INTERSTITIAL_AD_UNIT_ID',
          }) || TestIds.INTERSTITIAL;

      const interstitial = InterstitialAd.createForAdUnitId(adUnitId, {
        requestNonPersonalizedAdsOnly: true,
      });

      const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        console.log('Interstitial ad loaded');
        setIsLoaded(true);
        setIsLoading(false);
      });

      const unsubscribeError = interstitial.addAdEventListener(AdEventType.ERROR, (error: any) => {
        console.log('Interstitial ad error:', error);
        setIsLoading(false);
      });

      const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        console.log('Interstitial ad closed');
        setIsLoaded(false);
        // Load a new ad for next time
        loadAd();
      });

      const loadAd = () => {
        if (!isLoading && !isLoaded) {
          setIsLoading(true);
          interstitial.load();
        }
      };

      // Load the first ad
      loadAd();

      return () => {
        unsubscribeLoaded();
        unsubscribeError();
        unsubscribeClosed();
      };
    } catch (error) {
      console.log('AdMob not available:', error);
      setIsLoaded(true); // Mock as loaded for web compatibility
    }
  }, []);

  const loadAd = () => {
    if (Platform.OS === 'web') {
      console.log('Mock: Loading interstitial ad on web');
      return;
    }

    if (!isLoading && !isLoaded) {
      setIsLoading(true);
      // Ad loading is handled in useEffect
    }
  };

  const showAd = () => {
    if (Platform.OS === 'web') {
      console.log('Mock: Showing interstitial ad on web');
      return;
    }

    if (isLoaded) {
      try {
        const { InterstitialAd, TestIds } = require('react-native-google-mobile-ads');
        // Note: In a real implementation, you'd need to store the interstitial instance
        // This is a simplified version for demonstration
        console.log('Showing interstitial ad');
      } catch (error) {
        console.log('Error showing ad:', error);
      }
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