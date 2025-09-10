package com.yourpackage.yourapp

    import android.os.Bundle
    import android.widget.Button
    import android.widget.FrameLayout
    import androidx.activity.ComponentActivity
    import androidx.activity.compose.setContent
    import androidx.compose.foundation.layout.Box
    import androidx.compose.foundation.layout.fillMaxSize
    import androidx.compose.foundation.layout.fillMaxWidth
    import androidx.compose.foundation.layout.height
    import androidx.compose.foundation.layout.padding
    import androidx.compose.material3.MaterialTheme
    import androidx.compose.material3.Surface
    import androidx.compose.material3.Text
    import androidx.compose.runtime.Composable
    import androidx.compose.ui.Alignment
    import androidx.compose.ui.Modifier
    import androidx.compose.ui.platform.LocalContext
    import androidx.compose.ui.tooling.preview.Preview
    import androidx.compose.ui.unit.dp
    import androidx.compose.ui.viewinterop.AndroidView
    import com.google.android.gms.ads.AdRequest
    import com.google.android.gms.ads.AdSize
    import com.google.android.gms.ads.AdView
    import com.google.android.gms.ads.FullScreenContentCallback
    import com.google.android.gms.ads.LoadAdError
    import com.google.android.gms.ads.interstitial.InterstitialAd
    import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback
    import com.yourpackage.yourapp.ui.theme.YourAppTheme
    import android.util.Log

    class MainActivity : ComponentActivity() {

        private lateinit var interstitialAdManager: InterstitialAdManager

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContent {
                YourAppTheme {
                    Surface(
                        modifier = Modifier.fillMaxSize(),
                        color = MaterialTheme.colorScheme.background
                    ) {
                        MainScreen()
                    }
                }
            }

            interstitialAdManager = InterstitialAdManager(this)
            interstitialAdManager.loadAd("YOUR_INTERSTITIAL_AD_UNIT_ID") // Replace with your ad unit ID
        }

        @Composable
        fun MainScreen() {
            Box(modifier = Modifier.fillMaxSize()) {
                Text(
                    text = "Hello, AdMob!",
                    modifier = Modifier.align(Alignment.Center)
                )
                BannerAd(adUnitId = "YOUR_BANNER_AD_UNIT_ID") // Replace with your ad unit ID
                Button(
                    onClick = { interstitialAdManager.showAd() },
                    modifier = Modifier
                        .align(Alignment.BottomCenter)
                        .padding(bottom = 60.dp)
                ) {
                    Text("Show Interstitial Ad")
                }
            }
        }

        @Composable
        fun BannerAd(adUnitId: String) {
            val context = LocalContext.current
            AndroidView(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(50.dp) // Adjust height as needed
                    .align(Alignment.BottomCenter),
                factory = { context ->
                    AdView(context).apply {
                        adUnitId = adUnitId
                        setAdSize(AdSize.BANNER) // Or AdSize.LARGE_BANNER, etc.
                        loadAd(AdRequest.Builder().build())
                    }
                }
            )
        }
    }

    class InterstitialAdManager(private val context: Context) {
        private var interstitialAd: InterstitialAd? = null
        private val TAG = "InterstitialAdManager"

        fun loadAd(adUnitId: String) {
            val adRequest = AdRequest.Builder().build()
            InterstitialAd.load(context, adUnitId, adRequest, object : InterstitialAdLoadCallback() {
                override fun onAdFailedToLoad(adError: LoadAdError) {
                    Log.d(TAG, adError.toString())
                    interstitialAd = null
                }

                override fun onAdLoaded(ad: InterstitialAd) {
                    Log.d(TAG, "onAdLoaded")
                    interstitialAd = ad
                    interstitialAd?.fullScreenContentCallback = object : FullScreenContentCallback() {
                        override fun onAdDismissedFullScreenContent() {
                            // Called when ad is dismissed.
                            interstitialAd = null
                            Log.d(TAG, "Ad was dismissed.")
                            // Optionally, load a new ad here
                            loadAd(adUnitId)
                        }

                        override fun onAdFailedToShowFullScreenContent(adError: com.google.android.gms.ads.AdError) {
                            // Called when ad fails to show.
                            Log.d(TAG, "Ad failed to show.")
                            interstitialAd = null
                        }

                        override fun onAdShowedFullScreenContent() {
                            // Called when ad is shown.
                            Log.d(TAG, "Ad showed fullscreen content.")
                        }
                    }
                }
            })
        }

        fun showAd() {
            if (interstitialAd != null) {
                interstitialAd?.show(context)
            } else {
                Log.d(TAG, "The interstitial ad wasn't ready yet.")
                // Optionally, load a new ad here
            }
        }
    }
