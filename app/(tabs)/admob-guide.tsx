import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen } from 'lucide-react-native';

export default function AdMobGuideScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AdMob Integration</Text>
          <Text style={styles.headerSubtitle}>Android Kotlin Guide</Text>
          <View style={styles.headerIcon}>
            <BookOpen size={24} color="#1565C0" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Gradle Dependencies</Text>
          <View style={styles.contentCard}>
            <Text style={styles.label}>Add to app/build.gradle.kts:</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                dependencies {'{'}
                {'\n  '}// Google Mobile Ads SDK
                {'\n  '}implementation("com.google.android.gms:play-services-ads:23.6.0")
                {'\n'}
                {'}'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. AndroidManifest.xml</Text>
          <View style={styles.contentCard}>
            <Text style={styles.label}>Inside {'<application>'} tag:</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                {'<meta-data'}
                {'\n  '}android:name="com.google.android.gms.ads.APPLICATION_ID"
                {'\n  '}android:value="YOUR_ADMOB_APP_ID"/>
              </Text>
            </View>
            <Text style={styles.label}>Permissions (outside {'<application>'}tag):</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                {'<uses-permission android:name="android.permission.INTERNET"/>'}
                {'\n'}
                {'<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. SDK Initialization</Text>
          <View style={styles.contentCard}>
            <Text style={styles.label}>Create Application class:</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                class MyApplication : Application() {'{'}
                {'\n  '}override fun onCreate() {'{'}
                {'\n    '}super.onCreate()
                {'\n    '}
                {'\n    '}CoroutineScope(Dispatchers.IO).launch {'{'}
                {'\n      '}MobileAds.initialize(this@MyApplication)
                {'\n    '}
                {'}'}
                {'\n  '}
                {'}'}
                {'\n'}
                {'}'}
              </Text>
            </View>
            <Text style={styles.infoText}>Register in AndroidManifest.xml:</Text>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                {'<application android:name=".MyApplication" ...>'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Banner Ad (Compose)</Text>
          <View style={styles.contentCard}>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                @Composable
                {'\n'}fun AdmobBanner(adUnitId: String) {'{'}
                {'\n  '}AndroidView(
                {'\n    '}factory = {'{ context ->'}
                {'\n      '}AdView(context).apply {'{'}
                {'\n        '}setAdUnitId(adUnitId)
                {'\n        '}setAdSize(AdSize.BANNER)
                {'\n        '}loadAd(AdRequest.Builder().build())
                {'\n      '}
                {'}'}
                {'\n    '}
                {'}'}
                {'\n  '}
                {')'}
                {'\n'}
                {'}'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Interstitial Ad</Text>
          <View style={styles.contentCard}>
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}>
                class InterstitialAdManager(
                {'\n  '}private val activity: Activity
                {'\n'}
                ) {'{'}
                {'\n  '}private var interstitialAd: InterstitialAd? = null
                {'\n  '}
                {'\n  '}fun loadAd() {'{'}
                {'\n    '}val adRequest = AdRequest.Builder().build()
                {'\n    '}
                {'\n    '}InterstitialAd.load(
                {'\n      '}activity,
                {'\n      '}"YOUR_AD_UNIT_ID",
                {'\n      '}adRequest,
                {'\n      '}object : InterstitialAdLoadCallback() {'{'}
                {'\n        '}override fun onAdLoaded(ad: InterstitialAd) {'{'}
                {'\n          '}interstitialAd = ad
                {'\n        '}
                {'}'}
                {'\n      '}
                {'}'}
                {'\n    '}
                {')'}
                {'\n  '}
                {'}'}
                {'\n  '}
                {'\n  '}fun showAd() {'{'}
                {'\n    '}interstitialAd?.show(activity)
                {'\n  '}
                {'}'}
                {'\n'}
                {'}'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Ad Unit IDs</Text>
          <View style={styles.contentCard}>
            <Text style={styles.listItem}>• Banner: ca-app-pub-3940256099942544/6300978111</Text>
            <Text style={styles.listItem}>• Interstitial: ca-app-pub-3940256099942544/1033173712</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best Practices</Text>
          <View style={styles.contentCard}>
            <Text style={styles.listItem}>✓ Preload interstitial ads early</Text>
            <Text style={styles.listItem}>✓ Handle lifecycle events properly</Text>
            <Text style={styles.listItem}>✓ Use test ads during development</Text>
            <Text style={styles.listItem}>✓ Initialize SDK in Application class</Text>
            <Text style={styles.listItem}>✓ Handle ad failures gracefully</Text>
            <Text style={styles.listItem}>✓ Respect user experience</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 20,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#757575',
    fontWeight: '500',
  },
  headerIcon: {
    position: 'absolute',
    top: 20,
    right: 0,
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 50,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 16,
    paddingLeft: 4,
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  codeBlock: {
    backgroundColor: '#263238',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: '#A5D6A7',
    lineHeight: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 15,
    color: '#333333',
    marginBottom: 8,
    lineHeight: 22,
  },
});
