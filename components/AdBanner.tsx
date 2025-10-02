import React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';

interface AdBannerProps {
  size?: any;
  style?: any;
}

export default function AdBanner({ size, style }: AdBannerProps) {
  const isNative = Platform.OS !== 'web';

  return (
    <View style={[styles.container, style]}>
      {isNative && (
        <AdMobBanner size={size} style={style} />
      )}
      {!isNative && (
        <View style={[styles.webPlaceholder]}>
          <Text style={styles.placeholderText}>Ad Space (Web Preview)</Text>
        </View>
      )}
    </View>
  );
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

const AdMobBanner = ({ size, style }: AdBannerProps) => {
  return null;
};

const BannerAdView = ({ bannerAd, style }: { bannerAd: any; style: any }) => {
  return (
    <View style={style}>
      {bannerAd && (
        <View style={{ width: bannerAd.getSize().width, height: bannerAd.getSize().height }}>
          {bannerAd}
        </View>
      )}
    </View>
  );
};
