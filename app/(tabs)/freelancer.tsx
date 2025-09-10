import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, Euro, Building, Info, CircleAlert as AlertCircle } from 'lucide-react-native';
import { calculateFreelancerNet } from '@/utils/taxCalculations';

const { width } = Dimensions.get('window');

export default function FreelancerCalculator() {
  const [jahresgewinn, setJahresgewinn] = useState('');
  const [krankenversicherung, setKrankenversicherung] = useState('');
  const [betriebsausgaben, setBetriebsausgaben] = useState('');

  const annualProfit = parseFloat(jahresgewinn) || 0;
  const healthInsurance = parseFloat(krankenversicherung) || 0;
  const businessExpenses = parseFloat(betriebsausgaben) || 0;
  
  const adjustedProfit = Math.max(0, annualProfit - businessExpenses);

  const result = calculateFreelancerNet({
    annualProfit: adjustedProfit,
    healthInsurance,
  });

  // Helper to format currency for breakdown items, ensuring it handles undefined/NaN
  const formatCurrency = (value: number | undefined | null) => {
    if (value === undefined || value === null || isNaN(value)) {
      return '€ 0,00'; // Default to zero if value is invalid
    }
    return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>GehaltKlar</Text>
          <Text style={styles.headerSubtitle}>Freiberufler-Rechner</Text>
          <View style={styles.headerIcon}>
            <TrendingUp size={24} color="#2E7D32" />
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>💼 Geschäftsdaten</Text>
          
          <View style={styles.inputCard}>
            <View style={styles.inputHeader}>
              <Euro size={20} color="#2E7D32" />
              <Text style={styles.inputTitle}>Jahresgewinn (vor Steuern)</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.mainInput}
                value={jahresgewinn}
                onChangeText={setJahresgewinn}
                placeholder="60000"
                keyboardType="numeric"
                placeholderTextColor="#9E9E9E"
              />
              <Text style={styles.currencyLabel}>€</Text>
            </View>
            <View style={styles.helperContainer}>
              <Info size={16} color="#757575" />
              <Text style={styles.helperText}>
                Ihr erwartetes Einkommen vor Steuern und Abzügen
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>🏥 Versicherung & Ausgaben</Text>
          
          <View style={styles.inputCard}>
            <View style={styles.inputHeader}>
              <Building size={20} color="#2E7D32" />
              <Text style={styles.inputTitle}>Krankenversicherung (jährlich)</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.mainInput}
                value={krankenversicherung}
                onChangeText={setKrankenversicherung}
                placeholder="4800"
                keyboardType="numeric"
                placeholderTextColor="#9E9E9E"
              />
              <Text style={styles.currencyLabel}>€</Text>
            </View>
            <View style={styles.helperContainer}>
              <Info size={16} color="#757575" />
              <Text style={styles.helperText}>
                Private oder freiwillig gesetzliche Krankenversicherung
              </Text>
            </View>
          </View>

          <View style={styles.inputCard}>
            <View style={styles.inputHeader}>
              <Building size={20} color="#2E7D32" />
              <Text style={styles.inputTitle}>Betriebsausgaben (optional)</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.mainInput}
                value={betriebsausgaben}
                onChangeText={setBetriebsausgaben}
                placeholder="10000"
                keyboardType="numeric"
                placeholderTextColor="#9E9E9E"
              />
              <Text style={styles.currencyLabel}>€</Text>
            </View>
            <View style={styles.helperContainer}>
              <Info size={16} color="#757575" />
              <Text style={styles.helperText}>
                Bürokosten, Equipment, Software, etc.
              </Text>
            </View>
          </View>

          {businessExpenses > 0 && (
            <View style={styles.inputCard}>
              <View style={styles.profitDisplay}>
                <View style={styles.profitInfo}>
                  <Text style={styles.profitLabel}>Bereinigter Gewinn</Text>
                  <Text style={styles.profitSubtext}>Nach Betriebsausgaben</Text>
                </View>
                <Text style={styles.profitValue}>
                  {adjustedProfit.toLocaleString('de-DE', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.resultSection}>
          <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Geschätztes Netto</Text>
          <View style={styles.disclaimerContainer}>
            <AlertCircle size={16} color="rgba(255, 255, 255, 0.8)" />
            <Text style={styles.disclaimer}>
              Schätzung basierend auf Standardsätzen
            </Text>
          </View>
          <View style={styles.resultDivider} />
          
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Monatlich:</Text>
            <Text style={styles.resultValue}>
              {formatCurrency(result.monthlyNet)}
            </Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Jährlich:</Text>
            <Text style={styles.resultValue}>
              {formatCurrency(result.yearlyNet)}
            </Text>
          </View>
          </View>
          
          <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>Geschätzte Abzüge</Text>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Einkommensteuer:</Text>
            <Text style={styles.breakdownValue}>
              {/* Safely format the value, providing a default if it's undefined or NaN */}
              {formatCurrency(result.breakdown?.einkommensteuer)}
            </Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Solidaritätszuschlag:</Text>
            <Text style={styles.breakdownValue}>
              {formatCurrency(result.breakdown?.solidaritaetszuschlag)}
            </Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Krankenversicherung:</Text>
            <Text style={styles.breakdownValue}>
              {formatCurrency(healthInsurance)}
            </Text>
          </View>
        </View>
        </View>

        <View style={styles.warningCard}>
          <View style={styles.warningHeader}>
            <AlertCircle size={24} color="#FF9800" />
          <Text style={styles.infoTitle}>Wichtige Hinweise</Text>
          </View>
          <View style={styles.infoList}>
          <Text style={styles.infoText}>
            • Diese Berechnung ist eine Schätzung für Freiberufler ohne Gewerbe
          </Text>
          <Text style={styles.infoText}>
            • Kirchensteuer und andere individuelle Faktoren sind nicht berücksichtigt
          </Text>
          <Text style={styles.infoText}>
            • Für genaue Berechnungen konsultieren Sie einen Steuerberater
          </Text>
          <Text style={styles.infoText}>
            • Vergessen Sie nicht, Vorauszahlungen für das Finanzamt einzuplanen
          </Text>
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
    color: '#2E7D32',
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
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 50,
  },
  inputSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 16,
    paddingLeft: 4,
  },
  inputCard: {
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
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginLeft: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E8EAED',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  mainInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  currencyLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D32',
    marginLeft: 12,
  },
  helperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  helperText: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
    flex: 1,
  },
  profitDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2E7D32',
  },
  profitInfo: {
    flex: 1,
  },
  profitLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
  },
  profitSubtext: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 2,
  },
  profitValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  resultSection: {
    marginTop: 8,
  },
  resultCard: {
    backgroundColor: '#2E7D32',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  disclaimerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  disclaimer: {
    fontSize: 14,
    color: '#E8F5E8',
    fontWeight: '500',
  },
  resultDivider: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 20,
    borderRadius: 1,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 16,
    color: '#E8F5E8',
    fontWeight: '500',
  },
  resultValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  breakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 12,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#757575',
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  warningCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF9800',
  },
  infoList: {
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});
