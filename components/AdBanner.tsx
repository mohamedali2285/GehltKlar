import React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';

interface AdBannerProps {
  size?: any;
  style?: any;
}

export default function AdBanner({ size, style }: AdBannerProps) {
  // Only load AdMob on native platforms
  if (Platform.OS === 'web') {
    // Show placeholder on web
    return (
      <View style={[styles.container, styles.webPlaceholder, style]}>
        <Text style={styles.placeholderText}>Ad Space (Web Preview)</Text>
      </View>
    );
  }

  // Dynamically import AdMob components only on native platforms
  try {
    const { BannerAd, BannerAdSize, TestIds } = require('react-native-google-mobile-ads');
    
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
          size={size || BannerAdSize.ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdLoaded={() => {
            console.log('Banner ad loaded');
          }}
          onAdFailedToLoad={(error: any) => {
            console.log('Banner ad failed to load:', error);
          }}
        />
      </View>
    );
  } catch (error) {
    // Fallback if AdMob is not available
    return (
      <View style={[styles.container, styles.webPlaceholder, style]}>
        <Text style={styles.placeholderText}>Ad Space</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
  },
  webPlaceholder: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  placeholderText: {
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
  },
});