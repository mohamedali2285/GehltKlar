import { useEffect, useState, useCallback } from 'react';
import { Platform } from 'react-native';

export function useInterstitialAd() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [interstitial, setInterstitial] = useState<any>(null); // Add state for interstitial ad

  const showAd = useCallback(async () => {
    if (!interstitial) return; // Prevent error if interstitial is not loaded
    try {
      setIsLoading(true);
      await interstitial.show();
      setIsLoading(false);
    } catch (error) {
      console.error("Interstitial ad failed to show:", error);
      setIsLoading(false);
    }
  }, [interstitial]);

  useEffect(() => {
    const loadInterstitialAd = async () => {
      if (Platform.OS === 'web') {
        setIsLoaded(true);
        return;
      }

      try {
        const { InterstitialAd, AdEventType, TestIds } = await import('react-native-google-mobile-ads');
        const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : Platform.select({
          ios: 'YOUR_IOS_INTERSTITIAL_AD_UNIT_ID',
          android: 'YOUR_ANDROID_INTERSTITIAL_AD_UNIT_ID',
        }) || TestIds.INTERSTITIAL;

        const interstitialAd = InterstitialAd.createForAdUnitId(adUnitId, {
          requestNonPersonalizedAdsOnly: true,
        });

        await interstitialAd.load();
        setInterstitial(interstitialAd); // Set the interstitial ad to the state
        setIsLoaded(true);
      } catch (error) {
        console.log('AdMob not available:', error);
        setIsLoaded(true);
      }
    };

    loadInterstitialAd();
  }, []);

  return { isLoaded, isLoading, showAd }; // Return showAd function
}
