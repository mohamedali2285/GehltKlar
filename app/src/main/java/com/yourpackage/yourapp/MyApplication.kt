package com.yourpackage.yourapp

    import android.app.Application
    import com.google.android.gms.ads.MobileAds
    import com.google.android.gms.ads.RequestConfiguration
    import android.util.Log

    class MyApplication : Application() {
        private val TAG = "MyApplication"
        
        override fun onCreate() {
            super.onCreate()
            
            // Initialize the Mobile Ads SDK
            MobileAds.initialize(this) { initializationStatus ->
                Log.d(TAG, "AdMob SDK initialized successfully")
                
                // Optional: Log adapter statuses
                val statusMap = initializationStatus.adapterStatusMap
                for (adapterClass in statusMap.keys) {
                    val status = statusMap[adapterClass]
                    Log.d(TAG, "Adapter name: $adapterClass, Description: ${status?.description}, Latency: ${status?.latency}")
                }
            }
            
            // Optional: Set test device IDs for development
            // Remove this in production
            val testDeviceIds = listOf("YOUR_TEST_DEVICE_ID")
            val configuration = RequestConfiguration.Builder()
                .setTestDeviceIds(testDeviceIds)
                .build()
            MobileAds.setRequestConfiguration(configuration)
        }
    }
