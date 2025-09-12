import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

interface AdBannerProps {
  size?: BannerAdSize;
  style?: any;
}

export default function AdBanner({ size = BannerAdSize.ADAPTIVE_BANNER, style }: AdBannerProps) {
  // Use test ad unit ID for development
  const adUnitId = __DEV__ 
    ? TestIds.ADAPTIVE_BANNER 
    : Platform.select({
        ios: 'YOUR_IOS_BANNER_AD_UNIT_ID',
        android: 'YOUR_ANDROID_BANNER_AD_UNIT_ID',
      }) || TestIds.ADAPTIVE_BANNER;

  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={adUnitId}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log('Banner ad loaded');
        }}
        onAdFailedToLoad={(error) => {
          console.log('Banner ad failed to load:', error);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
  },
});