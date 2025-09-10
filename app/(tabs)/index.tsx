import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Dimensions,
  Modal,
  FlatList,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Euro, Calculator, Info, X, Calendar, Minus, Plus } from 'lucide-react-native';
import { calculateEmployeeNet } from '@/utils/taxCalculations';

const { width } = Dimensions.get('window');

const BUNDESLAENDER = [
  'Baden-Württemberg',
  'Bayern',
  'Berlin',
  'Brandenburg',
  'Bremen',
  'Hamburg',
  'Hessen',
  'Mecklenburg-Vorpommern',
  'Niedersachsen',
  'Nordrhein-Westfalen',
  'Rheinland-Pfalz',
  'Saarland',
  'Sachsen',
  'Sachsen-Anhalt',
  'Schleswig-Holstein',
  'Thüringen',
];

const INSURANCE_OPTIONS = [
  { label: 'Gesetzlich versichert', value: 'gesetzlich' },
  { label: 'Privat versichert', value: 'privat' },
];

// Possible values for Kinderfreibetrag based on the provided image and glossary
const KINDERFREIBETRAG_OPTIONS = [
  '0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5',
];

export default function EmployeeCalculator() {
  const [bruttogehalt, setBruttogehalt] = useState('');
  const [abrechnungszeitraum, setAbrechnungszeitraum] = useState<'Jahr' | 'Monat'>('Monat');
  const [geldwerterVorteil, setGeldwerterVorteil] = useState('');
  const [abrechnungsjahr, setAbrechnungsjahr] = useState(new Date().getFullYear().toString());
  const [steuerfreibetrag, setSteuerfreibetrag] = useState('');
  const [steuerklasse, setSteuerklasse] = useState('1');
  const [inKirche, setInKirche] = useState(false);
  const [bundesland, setBundesland] = useState('Nordrhein-Westfalen');
  const [alter, setAlter] = useState(''); // State for age
  const [habenKinder, setHabenKinder] = useState(false);
  const [kinderfreibetrag, setKinderfreibetrag] = useState('0'); // State for Kinderfreibetrag
  const [kinderUnter25, setKinderUnter25] = useState('0'); // State for children under 25
  const [krankenversicherung, setKrankenversicherung] = useState('gesetzlich');
  const [kvZusatzbeitrag, setKvZusatzbeitrag] = useState('2.5'); // Default to average 2.5% as per glossary
  const [rentenversicherung, setRentenversicherung] = useState('gesetzlich');
  const [arbeitslosenversicherung, setArbeitslosenversicherung] = useState('gesetzlich');

  const [isBundeslandModalVisible, setBundeslandModalVisible] = useState(false);
  const [isSteuerklasseModalVisible, setSteuerklasseModalVisible] = useState(false);
  const [isKrankenversicherungModalVisible, setKrankenversicherungModalVisible] = useState(false);
  const [isRentenversicherungModalVisible, setRentenversicherungModalVisible] = useState(false);
  const [isArbeitslosenversicherungModalVisible, setArbeitslosenversicherungModalVisible] = useState(false);
  const [isKinderfreibetragModalVisible, setKinderfreibetragModalVisible] = useState(false); // New modal state

  // State to hold the calculation results
  const [calculationResult, setCalculationResult] = useState({
    monthlyNet: 0,
    yearlyNet: 0,
    breakdown: {
      lohnsteuer: 0,
      solidaritaetszuschlag: 0,
      kirchensteuer: 0,
      rentenversicherung: 0,
      arbeitslosenversicherung: 0,
      krankenversicherung: 0,
      pflegeversicherung: 0,
    },
  });

  // Function to perform calculation
  const performCalculation = () => {
    console.log('--- Performing Calculation ---');
    const grossAmount = parseFloat(bruttogehalt) || 0;
    const monthlyGross = abrechnungszeitraum === 'Monat' ? grossAmount : grossAmount / 12;
    const age = parseInt(alter) || 0; // Parse age
    const geldwerterVorteilValue = parseFloat(geldwerterVorteil) || 0;
    const steuerfreibetragValue = parseFloat(steuerfreibetrag) || 0;
    const kinderfreibetragValue = parseFloat(kinderfreibetrag) || 0; // Use parseFloat for the value
    const kinderUnter25Value = parseInt(kinderUnter25) || 0; // Parse children under 25
    const kvZusatzbeitragValue = parseFloat(kvZusatzbeitrag) || 0;

    console.log('Inputs for calculation:', {
      monthlyGross,
      steuerklasse,
      bundesland,
      kinder: kinderfreibetragValue, // Pass the parsed float value for Kinderfreibetrag
      kirchensteuer: inKirche,
      alter: age, // Pass the parsed age
      geldwerterVorteil: geldwerterVorteilValue,
      abrechnungsjahr: parseInt(abrechnungsjahr),
      steuerfreibetrag: steuerfreibetragValue,
      habenKinder: habenKinder,
      kinderUnter25: kinderUnter25Value, // Pass the parsed value for children under 25
      krankenversicherung: krankenversicherung,
      kvZusatzbeitrag: kvZusatzbeitragValue,
      rentenversicherung: rentenversicherung,
      arbeitslosenversicherung: arbeitslosenversicherung,
    });

    const result = calculateEmployeeNet({
      monthlyGross,
      steuerklasse,
      bundesland,
      kinder: kinderfreibetragValue, // Pass the parsed float value for Kinderfreibetrag
      kirchensteuer: inKirche,
      alter: age, // Pass the parsed age
      geldwerterVorteil: geldwerterVorteilValue,
      abrechnungsjahr: parseInt(abrechnungsjahr),
      steuerfreibetrag: steuerfreibetragValue,
      habenKinder: habenKinder,
      kinderUnter25: kinderUnter25Value, // Pass the parsed value for children under 25
      krankenversicherung: krankenversicherung,
      kvZusatzbeitrag: kvZusatzbeitragValue,
      rentenversicherung: rentenversicherung,
      arbeitslosenversicherung: arbeitslosenversicherung,
    });

    console.log('Calculation Result:', result);
    setCalculationResult(result);
  };

  // Effect to recalculate when inputs change or on mount
  useEffect(() => {
    console.log('useEffect triggered. Bruttogehalt:', bruttogehalt);
    // Always perform calculation if any input changes, or on mount if bruttogehalt is present.
    // If bruttogehalt is empty, we still want to ensure the result is reset to zero.
    if (bruttogehalt || Object.values(calculationResult).some(val => val !== 0)) { // Recalculate if bruttogehalt exists OR if results are not zero (meaning a previous calculation happened)
      performCalculation();
    } else {
      // Reset results if bruttogehalt is cleared and no previous calculation exists
      console.log('Resetting calculation results to zero.');
      setCalculationResult({
        monthlyNet: 0,
        yearlyNet: 0,
        breakdown: {
          lohnsteuer: 0,
          solidaritaetszuschlag: 0,
          kirchensteuer: 0,
          rentenversicherung: 0,
          arbeitslosenversicherung: 0,
          krankenversicherung: 0,
          pflegeversicherung: 0,
        },
      });
    }
  }, [
    bruttogehalt,
    abrechnungszeitraum,
    geldwerterVorteil,
    abrechnungsjahr,
    steuerfreibetrag,
    steuerklasse,
    inKirche,
    bundesland,
    alter, // Added alter to dependencies
    habenKinder,
    kinderfreibetrag, // Added kinderfreibetrag to dependencies
    kinderUnter25, // Added kinderUnter25 to dependencies
    krankenversicherung,
    kvZusatzbeitrag,
    rentenversicherung,
    arbeitslosenversicherung,
  ]);

  // Initial calculation on mount if there's a default gross salary
  // This useEffect is now redundant due to the refined logic in the main useEffect.
  // Keeping it commented out for now, but the main useEffect should handle initial calculation.
  /*
  useEffect(() => {
    if (bruttogehalt) {
      performCalculation();
    }
  }, []); // Empty dependency array ensures this runs only once on mount
  */

  const renderModalItem = (item: string, onPress: () => void) => (
    <TouchableOpacity style={styles.modalItem} onPress={onPress}>
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderInsuranceItem = (item: { label: string; value: string }, onPress: () => void) => (
    <TouchableOpacity style={styles.modalItem} onPress={onPress}>
      <Text style={styles.modalItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const handleIncrement = (setter: (value: string) => void, currentValue: string) => {
    const num = parseFloat(currentValue) || 0; // Use parseFloat for potential decimals
    setter((num + 0.5).toString()); // Increment by 0.5 to match the options
  };

  const handleDecrement = (setter: (value: string) => void, currentValue: string) => {
    const num = parseFloat(currentValue) || 0; // Use parseFloat for potential decimals
    if (num >= 0.5) { // Ensure we don't go below 0
      setter((num - 0.5).toString()); // Decrement by 0.5
    } else {
      setter('0'); // Set to 0 if already at or below the minimum possible decrement
    }
  };

  // Helper to format currency for breakdown items
  const formatCurrency = (value: number) => {
    // Ensure value is a number before formatting
    if (typeof value !== 'number' || isNaN(value)) {
      return '€ 0,00';
    }
    return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>GehaltKlar</Text>
          <Text style={styles.headerSubtitle}>Angestellten-Rechner</Text>
          <View style={styles.headerIcon}>
            <Calculator size={24} color="#1565C0" />
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>💰 Einkommensdaten</Text>
          
          <View style={styles.inputCard}>
            <View style={styles.inputHeader}>
              <Euro size={20} color="#1565C0" />
              <Text style={styles.inputTitle}>Bruttoeinkommen</Text>
            </View>
            <View style={styles.salaryInputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.salaryInput}
                  value={bruttogehalt}
                  onChangeText={setBruttogehalt}
                  placeholder="3000"
                  keyboardType="numeric"
                  placeholderTextColor="#9E9E9E"
                />
                <Text style={styles.currencyLabel}>€</Text>
              </View>
              <View style={styles.periodToggle}>
                <TouchableOpacity
                  style={[styles.toggleButton, abrechnungszeitraum === 'Monat' && styles.toggleButtonActive]}
                  onPress={() => setAbrechnungszeitraum('Monat')}>
                  <Text style={[styles.toggleText, abrechnungszeitraum === 'Monat' && styles.toggleTextActive]}>
                    Monat
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.toggleButton, abrechnungszeitraum === 'Jahr' && styles.toggleButtonActive]}
                  onPress={() => setAbrechnungszeitraum('Jahr')}>
                  <Text style={[styles.toggleText, abrechnungszeitraum === 'Jahr' && styles.toggleTextActive]}>
                    Jahr
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.inputCard}>
            <View style={styles.inputHeader}>
              <Info size={20} color="#1565C0" />
              <Text style={styles.inputTitle}>Geldwerter Vorteil (monatl. Wert)</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.salaryInput}
                value={geldwerterVorteil}
                onChangeText={setGeldwerterVorteil}
                placeholder="0"
                keyboardType="numeric"
                placeholderTextColor="#9E9E9E"
              />
              <Text style={styles.currencyLabel}>€</Text>
            </View>
            <Text style={styles.infoText}>zum Firmenwagenrechner</Text>
          </View>

          <View style={styles.inputCard}>
            <View style={styles.inputHeader}>
              <Calendar size={20} color="#1565C0" />
              <Text style={styles.inputTitle}>Abrechnungsjahr</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.salaryInput}
                value={abrechnungsjahr}
                onChangeText={setAbrechnungsjahr}
                placeholder="2025"
                keyboardType="numeric"
                placeholderTextColor="#9E9E9E"
              />
            </View>
          </View>

          <View style={styles.inputCard}>
            <View style={styles.inputHeader}>
              <Info size={20} color="#1565C0" />
              <Text style={styles.inputTitle}>Jährl. Steuerfreibetrag</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.salaryInput}
                value={steuerfreibetrag}
                onChangeText={setSteuerfreibetrag}
                placeholder="0"
                keyboardType="numeric"
                placeholderTextColor="#9E9E9E"
              />
              <Text style={styles.currencyLabel}>€</Text>
            </View>
            <Text style={styles.infoText}>Grundfreibetrag 2025: 12.084 €</Text>
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>📋 Steuerdaten</Text>
          
          <View style={styles.inputRow}>
            {/* Steuerklasse Input */}
            <View style={[styles.inputCard, styles.pickerCard, styles.steuerklasseCard]}>
              <TouchableOpacity onPress={() => setSteuerklasseModalVisible(true)}>
                <View style={styles.inputHeader}>
                  <Text style={styles.inputTitle}>Steuerklasse</Text>
                </View>
                <View style={styles.pickerValueContainer}>
                  <Text style={styles.pickerValue}>Klasse {steuerklasse}</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            {/* In der Kirche Toggle */}
            <View style={[styles.inputCard, styles.kirscheCard]}>
              <View style={styles.inputHeader}>
                <Text style={styles.inputTitle}>In der Kirche</Text>
              </View>
              <View style={styles.radioContainer}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setInKirche(true)}>
                  <View style={[styles.radioOuterCircle, inKirche && styles.radioOuterCircleActive]}>
                    {inKirche && <View style={styles.radioInnerCircle} />}
                  </View>
                  <Text style={styles.radioLabel}>Ja</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setInKirche(false)}>
                  <View style={[styles.radioOuterCircle, !inKirche && styles.radioOuterCircleActive]}>
                    {!inKirche && <View style={styles.radioInnerCircle} />}
                  </View>
                  <Text style={styles.radioLabel}>Nein</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Bundesland Modal Trigger */}
          <View style={[styles.inputCard, styles.pickerCard]}>
            <TouchableOpacity onPress={() => setBundeslandModalVisible(true)}>
              <View style={styles.inputHeader}>
                <Text style={styles.inputTitle}>Bundesland</Text>
              </View>
              <View style={styles.pickerValueContainer}>
                <Text style={styles.pickerValue}>{bundesland}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Alter Input */}
          <View style={[styles.inputCard, styles.alterInputCard]}>
            <View style={styles.inputHeader}>
              <Calendar size={20} color="#1565C0" />
              <Text style={styles.inputTitle}>Alter</Text>
            </View>
            <View style={styles.stepperContainer}>
              <TouchableOpacity onPress={() => handleDecrement(setAlter, alter)} style={styles.stepperButton}>
                <Minus size={20} color="#757575" />
              </TouchableOpacity>
              <TextInput
                style={styles.stepperInput}
                value={alter}
                onChangeText={setAlter}
                placeholder="25"
                keyboardType="numeric"
                placeholderTextColor="#9E9E9E"
              />
              <TouchableOpacity onPress={() => handleIncrement(setAlter, alter)} style={styles.stepperButton}>
                <Plus size={20} color="#757575" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>👨‍👩‍👧‍👦 Kinder</Text>
          <View style={styles.inputCard}>
            <View style={styles.inputHeader}>
              <Text style={styles.inputTitle}>Haben Sie Kinder?</Text>
            </View>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => setHabenKinder(true)}>
                <View style={[styles.radioOuterCircle, habenKinder && styles.radioOuterCircleActive]}>
                  {habenKinder && <View style={styles.radioInnerCircle} />}
                </View>
                <Text style={styles.radioLabel}>Ja</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => setHabenKinder(false)}>
                <View style={[styles.radioOuterCircle, !habenKinder && styles.radioOuterCircleActive]}>
                  {!habenKinder && <View style={styles.radioInnerCircle} />}
                </View>
                <Text style={styles.radioLabel}>Nein</Text>
              </TouchableOpacity>
            </View>
          </View>

          {habenKinder && (
            <>
              {/* Kinderfreibetrag Input - Changed to a tappable field for modal selection */}
              <View style={[styles.inputCard, styles.pickerCard]}>
                <TouchableOpacity onPress={() => setKinderfreibetragModalVisible(true)}>
                  <View style={styles.inputHeader}>
                    <Info size={20} color="#1565C0" />
                    <Text style={styles.inputTitle}>Kinderfreibetrag</Text>
                  </View>
                  <View style={styles.pickerValueContainer}>
                    <Text style={styles.pickerValue}>{kinderfreibetrag}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.infoText}>Kinderfreibetrag 2025: 6.672 € (pro Elternteil)</Text>

              <View style={styles.inputCard}>
                <View style={styles.inputHeader}>
                  <Info size={20} color="#1565C0" />
                  <Text style={styles.inputTitle}>Kinder unter 25 Jahre</Text>
                </View>
                <View style={styles.stepperContainer}>
                  <TouchableOpacity onPress={() => handleDecrement(setKinderUnter25, kinderUnter25)} style={styles.stepperButton}>
                    <Minus size={20} color="#757575" />
                  </TouchableOpacity>
                  <TextInput
                    style={styles.stepperInput}
                    value={kinderUnter25}
                    onChangeText={setKinderUnter25}
                    placeholder="0"
                    keyboardType="numeric"
                    placeholderTextColor="#9E9E9E"
                  />
                  <TouchableOpacity onPress={() => handleIncrement(setKinderUnter25, kinderUnter25)} style={styles.stepperButton}>
                    <Plus size={20} color="#757575" />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>🏥 Versicherungsdaten</Text>

          <View style={[styles.inputCard, styles.pickerCard]}>
            <TouchableOpacity onPress={() => setKrankenversicherungModalVisible(true)}>
              <View style={styles.inputHeader}>
                <Text style={styles.inputTitle}>Krankenversicherung</Text>
              </View>
              <View style={styles.pickerValueContainer}>
                <Text style={styles.pickerValue}>
                  {INSURANCE_OPTIONS.find(opt => opt.value === krankenversicherung)?.label || 'Wählen'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {krankenversicherung === 'gesetzlich' && (
            <View style={styles.inputCard}>
              <View style={styles.inputHeader}>
                <Info size={20} color="#1565C0" />
                <Text style={styles.inputTitle}>KV-Zusatzbeitrag</Text>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.salaryInput}
                  value={kvZusatzbeitrag}
                  onChangeText={setKvZusatzbeitrag}
                  placeholder="2.5" // Updated placeholder to reflect glossary
                  keyboardType="numeric"
                  placeholderTextColor="#9E9E9E"
                />
                <Text style={styles.currencyLabel}>%</Text>
              </View>
              <Text style={styles.infoText}>Durchschnittlicher Zusatzbeitrag 2025: 2,5%</Text>
            </View>
          )}

          <View style={[styles.inputCard, styles.pickerCard]}>
            <TouchableOpacity onPress={() => setRentenversicherungModalVisible(true)}>
              <View style={styles.inputHeader}>
                <Text style={styles.inputTitle}>Rentenversicherung</Text>
              </View>
              <View style={styles.pickerValueContainer}>
                <Text style={styles.pickerValue}>
                  {INSURANCE_OPTIONS.find(opt => opt.value === rentenversicherung)?.label || 'Wählen'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.inputCard, styles.pickerCard]}>
            <TouchableOpacity onPress={() => setArbeitslosenversicherungModalVisible(true)}>
              <View style={styles.inputHeader}>
                <Text style={styles.inputTitle}>Arbeitslosenversicherung</Text>
              </View>
              <View style={styles.pickerValueContainer}>
                <Text style={styles.pickerValue}>
                  {INSURANCE_OPTIONS.find(opt => opt.value === arbeitslosenversicherung)?.label || 'Wählen'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.resultSection}>
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Dein Netto</Text>
            <View style={styles.resultDivider} />
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Monatlich:</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(calculationResult.monthlyNet)}
              </Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Jährlich:</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(calculationResult.yearlyNet)}
              </Text>
            </View>
          </View>
          
          <View style={styles.breakdownCard}>
            <Text style={styles.breakdownTitle}>Abzüge im Detail</Text>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Lohnsteuer:</Text>
              <Text style={styles.breakdownValue}>
                {formatCurrency(calculationResult.breakdown.lohnsteuer)}
              </Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Solidaritätszuschlag:</Text>
              <Text style={styles.breakdownValue}>
                {formatCurrency(calculationResult.breakdown.solidaritaetszuschlag)}
              </Text>
            </View>
            {calculationResult.breakdown.kirchensteuer > 0 && (
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>Kirchensteuer:</Text>
                <Text style={styles.breakdownValue}>
                  {formatCurrency(calculationResult.breakdown.kirchensteuer)}
                </Text>
              </View>
            )}
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Rentenversicherung:</Text>
              <Text style={styles.breakdownValue}>
                {formatCurrency(calculationResult.breakdown.rentenversicherung)}
              </Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Arbeitslosenversicherung:</Text>
              <Text style={styles.breakdownValue}>
                {formatCurrency(calculationResult.breakdown.arbeitslosenversicherung)}
              </Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Krankenversicherung:</Text>
              <Text style={styles.breakdownValue}>
                {formatCurrency(calculationResult.breakdown.krankenversicherung)}
              </Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Pflegeversicherung:</Text>
              <Text style={styles.breakdownValue}>
                {formatCurrency(calculationResult.breakdown.pflegeversicherung)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modals */}
      <Modal animationType="slide" transparent={true} visible={isBundeslandModalVisible} onRequestClose={() => setBundeslandModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Wähle dein Bundesland</Text>
              <TouchableOpacity onPress={() => setBundeslandModalVisible(false)}><X size={24} color="#757575" /></TouchableOpacity>
            </View>
            <FlatList data={BUNDESLAENDER} renderItem={({ item }) => renderModalItem(item, () => { setBundesland(item); setBundeslandModalVisible(false); })} keyExtractor={(item) => item} style={styles.modalList} />
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={isSteuerklasseModalVisible} onRequestClose={() => setSteuerklasseModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Wähle deine Steuerklasse</Text>
              <TouchableOpacity onPress={() => setSteuerklasseModalVisible(false)}><X size={24} color="#757575" /></TouchableOpacity>
            </View>
            <FlatList data={['1', '2', '3', '4', '5', '6']} renderItem={({ item }) => renderModalItem(`Klasse ${item}`, () => { setSteuerklasse(item); setSteuerklasseModalVisible(false); })} keyExtractor={(item) => item} style={styles.modalList} />
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={isKrankenversicherungModalVisible} onRequestClose={() => setKrankenversicherungModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Krankenversicherung</Text>
              <TouchableOpacity onPress={() => setKrankenversicherungModalVisible(false)}><X size={24} color="#757575" /></TouchableOpacity>
            </View>
            <FlatList data={INSURANCE_OPTIONS} renderItem={({ item }) => renderInsuranceItem(item, () => { setKrankenversicherung(item.value); setKrankenversicherungModalVisible(false); })} keyExtractor={(item) => item.value} style={styles.modalList} />
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={isRentenversicherungModalVisible} onRequestClose={() => setRentenversicherungModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Rentenversicherung</Text>
              <TouchableOpacity onPress={() => setRentenversicherungModalVisible(false)}><X size={24} color="#757575" /></TouchableOpacity>
            </View>
            <FlatList data={INSURANCE_OPTIONS} renderItem={({ item }) => renderInsuranceItem(item, () => { setRentenversicherung(item.value); setRentenversicherungModalVisible(false); })} keyExtractor={(item) => item.value} style={styles.modalList} />
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={isArbeitslosenversicherungModalVisible} onRequestClose={() => setArbeitslosenversicherungModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Arbeitslosenversicherung</Text>
              <TouchableOpacity onPress={() => setArbeitslosenversicherungModalVisible(false)}><X size={24} color="#757575" /></TouchableOpacity>
            </View>
            <FlatList data={INSURANCE_OPTIONS} renderItem={({ item }) => renderInsuranceItem(item, () => { setArbeitslosenversicherung(item.value); setArbeitslosenversicherungModalVisible(false); })} keyExtractor={(item) => item.value} style={styles.modalList} />
          </View>
        </View>
      </Modal>

      {/* New Modal for Kinderfreibetrag */}
      <Modal animationType="slide" transparent={true} visible={isKinderfreibetragModalVisible} onRequestClose={() => setKinderfreibetragModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Kinderfreibetrag</Text>
              <TouchableOpacity onPress={() => setKinderfreibetragModalVisible(false)}><X size={24} color="#757575" /></TouchableOpacity>
            </View>
            <FlatList data={KINDERFREIBETRAG_OPTIONS} renderItem={({ item }) => renderModalItem(item, () => { setKinderfreibetrag(item); setKinderfreibetragModalVisible(false); })} keyExtractor={(item) => item} style={styles.modalList} />
          </View>
        </View>
      </Modal>
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
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start', // Align items to the top
  },
  steuerklasseCard: {
    flex: 1,
    minWidth: '45%',
  },
  kirscheCard: {
    flex: 1,
    minWidth: '45%',
    justifyContent: 'center', // Center content vertically
  },
  alterInputCard: {
    // Specific styling for the age input if needed
  },
  pickerCard: {
    zIndex: 10,
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
  salaryInputContainer: {
    gap: 16,
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
  },
  salaryInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  currencyLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1565C0',
    marginLeft: 12,
  },
  periodToggle: {
    flexDirection: 'row',
    backgroundColor: '#F0F4F8',
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#1565C0',
    shadowColor: '#1565C0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#757575',
  },
  toggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  infoText: {
    fontSize: 12,
    color: '#757575',
    marginTop: 8,
    marginLeft: 4,
  },
  pickerTrigger: {
    flex: 1,
  },
  pickerValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E8EAED',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  pickerValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioOuterCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1565C0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioOuterCircleActive: {
    borderColor: '#1565C0',
  },
  radioInnerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1565C0',
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E8EAED',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  stepperButton: {
    padding: 8,
  },
  stepperInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginHorizontal: 8,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  modalList: {
    flexGrow: 1,
  },
  modalItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333333',
  },
  calculateButton: {
    backgroundColor: '#1565C0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
    shadowColor: '#1565C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultSection: {
    marginTop: 8,
  },
  resultCard: {
    backgroundColor: '#1565C0',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#1565C0',
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
    marginBottom: 8,
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
    color: '#E3F2FD',
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
});
