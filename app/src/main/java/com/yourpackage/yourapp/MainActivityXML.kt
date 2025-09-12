package com.yourpackage.yourapp

import android.os.Bundle
import android.util.Log
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.ads.*
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback

/**
 * Example Activity for XML-based layout with AdMob integration
 * Use this if you prefer XML layouts over Jetpack Compose
 */
class MainActivityXML : AppCompatActivity() {
    private val TAG = "MainActivityXML"
    private var interstitialAd: InterstitialAd? = null
    private lateinit var adView: AdView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main_xml)

        // Initialize banner ad
        setupBannerAd()
        
        // Load interstitial ad
        loadInterstitialAd()
        
        // Setup button click listener
        findViewById<Button>(R.id.btn_show_interstitial).setOnClickListener {
            showInterstitialAd()
        }
    }

    private fun setupBannerAd() {
        adView = findViewById(R.id.adView)
        
        // Set adaptive banner size
        val display = windowManager.defaultDisplay
        val outMetrics = android.util.DisplayMetrics()
        display.getMetrics(outMetrics)
        
        val density = outMetrics.density
        val adWidthPixels = outMetrics.widthPixels.toFloat()
        val adWidth = (adWidthPixels / density).toInt()
        
        adView.setAdSize(AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize(this, adWidth))
        
        // Set ad listener
        adView.adListener = object : AdListener() {
            override fun onAdClicked() {
                Log.d(TAG, "Banner ad was clicked.")
            }
            
            override fun onAdClosed() {
                Log.d(TAG, "Banner ad was closed.")
            }
            
            override fun onAdFailedToLoad(adError: LoadAdError) {
                Log.d(TAG, "Banner ad failed to load: ${adError.message}")
            }
            
            override fun onAdImpression() {
                Log.d(TAG, "Banner ad recorded an impression.")
            }
            
            override fun onAdLoaded() {
                Log.d(TAG, "Banner ad was loaded.")
            }
            
            override fun onAdOpened() {
                Log.d(TAG, "Banner ad was opened.")
            }
        }
        
        // Load the ad
        val adRequest = AdRequest.Builder().build()
        adView.loadAd(adRequest)
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
                    
                    interstitialAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                        override fun onAdClicked() {
                            Log.d(TAG, "Interstitial ad was clicked.")
                        }
                        
                        override fun onAdDismissedFullScreenContent() {
                            Log.d(TAG, "Interstitial ad was dismissed.")
                            interstitialAd = null
                            loadInterstitialAd() // Load next ad
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
            loadInterstitialAd()
        }
    }

    override fun onPause() {
        adView.pause()
        super.onPause()
    }

    override fun onResume() {
        super.onResume()
        adView.resume()
    }

    override fun onDestroy() {
        adView.destroy()
        super.onDestroy()
    }
}
