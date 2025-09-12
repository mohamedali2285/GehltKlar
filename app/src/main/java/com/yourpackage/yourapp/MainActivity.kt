package com.yourpackage.yourapp

import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import com.google.android.gms.ads.*
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback
import com.yourpackage.yourapp.ui.theme.YourAppTheme

class MainActivity : ComponentActivity() {
    private val TAG = "MainActivity"
    private var interstitialAd: InterstitialAd? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Load interstitial ad
        loadInterstitialAd()
        
        setContent {
            YourAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    MainScreen(
                        onShowInterstitialClick = { showInterstitialAd() }
                    )
                }
            }
        }
    }

    @Composable
    fun MainScreen(onShowInterstitialClick: () -> Unit) {
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Main content
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Text(
                    text = "Hello, AdMob!",
                    style = MaterialTheme.typography.headlineMedium
                )
                
                Spacer(modifier = Modifier.height(32.dp))
                
                Button(
                    onClick = onShowInterstitialClick,
                    modifier = Modifier.padding(16.dp)
                ) {
                    Text("Show Interstitial Ad")
                }
            }
            
            // Banner ad at the bottom
            AdaptiveBannerAd(
                adUnitId = "YOUR_BANNER_AD_UNIT_ID",
                modifier = Modifier.fillMaxWidth()
            )
        }
    }

    @Composable
    fun AdaptiveBannerAd(
        adUnitId: String,
        modifier: Modifier = Modifier
    ) {
        val context = LocalContext.current
        
        AndroidView(
            modifier = modifier,
            factory = { context ->
                AdView(context).apply {
                    // Get adaptive banner size
                    val display = (context as ComponentActivity).windowManager.defaultDisplay
                    val outMetrics = android.util.DisplayMetrics()
                    display.getMetrics(outMetrics)
                    
                    val density = outMetrics.density
                    var adWidthPixels = outMetrics.widthPixels.toFloat()
                    
                    if (adWidthPixels == 0f) {
                        adWidthPixels = outMetrics.widthPixels.toFloat()
                    }
                    
                    val adWidth = (adWidthPixels / density).toInt()
                    val adaptiveSize = AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize(context, adWidth)
                    
                    setAdSize(adaptiveSize)
                    this.adUnitId = adUnitId
                    
                    // Set ad listener for debugging
                    adListener = object : AdListener() {
                        override fun onAdClicked() {
                            Log.d("BannerAd", "Ad was clicked.")
                        }
                        
                        override fun onAdClosed() {
                            Log.d("BannerAd", "Ad was closed.")
                        }
                        
                        override fun onAdFailedToLoad(adError: LoadAdError) {
                            Log.d("BannerAd", "Ad failed to load: ${adError.message}")
                        }
                        
                        override fun onAdImpression() {
                            Log.d("BannerAd", "Ad recorded an impression.")
                        }
                        
                        override fun onAdLoaded() {
                            Log.d("BannerAd", "Ad was loaded.")
                        }
                        
                        override fun onAdOpened() {
                            Log.d("BannerAd", "Ad was opened.")
                        }
                    }
                    
                    // Load the ad
                    loadAd(AdRequest.Builder().build())
                }
            }
        )
    }

    private fun loadInterstitialAd() {
        val adRequest = AdRequest.Builder().build()
        
        InterstitialAd.load(
            this,
            "YOUR_INTERSTITIAL_AD_UNIT_ID",
            adRequest,
            object : InterstitialAdLoadCallback() {
                override fun onAdFailedToLoad(adError: LoadAdError) {
                    Log.d(TAG, "Interstitial ad failed to load: ${adError.message}")
                    interstitialAd = null
                }

                override fun onAdLoaded(ad: InterstitialAd) {
                    Log.d(TAG, "Interstitial ad loaded successfully")
                    interstitialAd = ad
                    
                    // Set full screen content callback
                    interstitialAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                        override fun onAdClicked() {
                            Log.d(TAG, "Interstitial ad was clicked.")
                        }
                        
                        override fun onAdDismissedFullScreenContent() {
                            Log.d(TAG, "Interstitial ad was dismissed.")
                            interstitialAd = null
                            // Load a new ad for next time
                            loadInterstitialAd()
                        }

                        override fun onAdFailedToShowFullScreenContent(adError: AdError) {
                            Log.d(TAG, "Interstitial ad failed to show: ${adError.message}")
                            interstitialAd = null
                        }

                        override fun onAdImpression() {
                            Log.d(TAG, "Interstitial ad recorded an impression.")
                        }

                        override fun onAdShowedFullScreenContent() {
                            Log.d(TAG, "Interstitial ad showed fullscreen content.")
                        }
                    }
                }
            }
        )
    }

    private fun showInterstitialAd() {
        interstitialAd?.let { ad ->
            ad.show(this)
        } ?: run {
            Log.d(TAG, "The interstitial ad wasn't ready yet.")
            // Optionally load a new ad
            loadInterstitialAd()
        }
    }
}
