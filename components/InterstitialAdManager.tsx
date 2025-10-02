import { useEffect, useState, useCallback } from 'react';
import { Platform } from 'react-native';

export function useInterstitialAd() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const showAd = useCallback(async () => {
    // No-op on web
  }, []);

  return { isLoaded, isLoading, showAd };
}
