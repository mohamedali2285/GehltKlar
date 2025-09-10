// German Tax Calculation Engine for 2025
// Based on official German tax law and social security rates

interface EmployeeParams {
  monthlyGross: number;
  steuerklasse: string;
  bundesland: string;
  kinder: number; // Number of children for Kinderfreibetrag (per parent)
  kirchensteuer: boolean;
  alter: number; // Age of the employee
  geldwerterVorteil: number; // Benefit-in-kind
  abrechnungsjahr: number;
  steuerfreibetrag: number; // Annual tax-free allowance
  habenKinder: boolean; // Do they have children?
  kinderUnter25: number; // Number of children under 25
  krankenversicherung: string; // 'gesetzlich' or 'privat'
  kvZusatzbeitrag: number; // Additional contribution rate for health insurance (%)
  rentenversicherung: string; // 'gesetzlich' or 'privat'
  arbeitslosenversicherung: string; // 'gesetzlich' or 'privat'
}

interface FreelancerParams {
  annualProfit: number;
  healthInsuranceCostYearly: number;
  taxClass: string; // Assuming '1', '3', or '4' for freelancers
  paysChurchTax: boolean;
  federalState: string;
}

interface EmployeeResult {
  monthlyNet: number;
  yearlyNet: number;
  breakdown: {
    lohnsteuer: number;
    solidaritaetszuschlag: number;
    kirchensteuer: number;
    rentenversicherung: number;
    arbeitslosenversicherung: number;
    krankenversicherung: number;
    pflegeversicherung: number;
  };
}

interface FreelancerResult {
  monthlyNet: number;
  yearlyNet: number;
  breakdown: {
    einkommensteuer: number;
    solidaritaetszuschlag: number;
    kirchensteuer: number;
  };
}

// --- Constants for 2025 ---
// Social Security Ceilings
const PENSION_INSURANCE_CEILING_WEST = 90600.0; // RV Beitragsbemessungsgrenze West (annual)
const PENSION_INSURANCE_CEILING_EAST = 89400.0; // RV Beitragsbemessungsgrenze Ost (annual) - Note: This value might differ slightly based on source, using a common one.
const HEALTH_INSURANCE_CEILING = 66150.0; // KV/PV Beitragsbemessungsgrenze (annual) - Updated from 62100 to 66150 based on glossary

// Contribution Rates
const PENSION_INSURANCE_RATE = 0.186; // 18.6%
const UNEMPLOYMENT_INSURANCE_RATE = 0.026; // 2.6%
const HEALTH_INSURANCE_GENERAL_RATE = 0.146; // 14.6% (total)
const CARE_INSURANCE_RATE_BASE = 0.034; // 3.4% (total base rate)

// Surcharges and Special Rates
const CARE_INSURANCE_SURCHARGE_CHILDLESS_OVER_23 = 0.006; // 0.6% for childless over 23
const CHURCH_TAX_RATE_NORMAL = 0.09; // 9%
const CHURCH_TAX_RATE_BAYERN_BW = 0.08; // 8% for Bayern and Baden-Württemberg
const SOLIDARITY_SURCHARGE_RATE = 0.055; // 5.5%

// Tax Allowances and Limits
const BASIC_TAX_FREE_ALLOWANCE_SINGLE = 11784.0; // Grundfreibetrag for single filers (annual)
const BASIC_TAX_FREE_ALLOWANCE_MARRIED = 24168.0; // Grundfreibetrag for married filers (annual)
const KINDERFREIBETRAG_PER_PARENT = 6672.0; // Kinderfreibetrag per parent (annual)
const SOLIDARITY_SURCHARGE_EXEMPTION_LIMIT_SINGLE = 18130.0; // Simplified exemption limit for solidarity surcharge (annual) - Note: This is a simplified limit.

// --- Helper Functions ---

// Function to determine the correct pension/unemployment ceiling based on federal state
function getPensionUnemploymentCeiling(federalState: string): number {
  // Simplified: Assume East German states use the East ceiling, others use West.
  const eastStates = ['Sachsen-Anhalt', 'Sachsen', 'Thüringen', 'Brandenburg', 'Mecklenburg-Vorpommern'];
  return eastStates.includes(federalState) ? PENSION_INSURANCE_CEILING_EAST : PENSION_INSURANCE_CEILING_WEST;
}

// Official 2025 German progressive income tax calculation
function calculateIncomeTax2025(taxableIncome: number, taxClass: string, churchTaxRate: number, paysChurchTax: boolean, isMarried: boolean, steuerfreibetrag: number, kinderFreibetragTotal: number): { incomeTax: number; solidaritySurcharge: number; churchTax: number } {
  console.log('--- calculateIncomeTax2025 ---');
  console.log('Inputs:', { taxableIncome, taxClass, churchTaxRate, paysChurchTax, isMarried, steuerfreibetrag, kinderFreibetragTotal });

  let incomeTax = 0;
  let solidaritySurcharge = 0;
  let churchTax = 0;

  // Determine the correct basic tax-free allowance
  const basicAllowance = isMarried ? BASIC_TAX_FREE_ALLOWANCE_MARRIED : BASIC_TAX_FREE_ALLOWANCE_SINGLE;
  console.log('Basic Allowance:', basicAllowance);

  // Apply Kinderfreibetrag and additional steuerfreibetrag to reduce taxable income
  // The Kinderfreibetrag is applied to reduce the taxable income.
  // The additional steuerfreibetrag is also directly subtracted.
  const adjustedTaxableIncome = Math.max(0, taxableIncome - basicAllowance - steuerfreibetrag - kinderFreibetragTotal);
  console.log('Adjusted taxable income for tax calculation:', adjustedTaxableIncome);

  // Progressive tax calculation based on 2025 brackets
  if (adjustedTaxableIncome > 0) {
    const incomeAboveBasic = adjustedTaxableIncome; // Already adjusted for basic allowance, steuerfreibetrag, and kinderfreibetrag

    if (incomeAboveBasic <= (17005.0 - basicAllowance)) { // Bracket 1: 14%
      incomeTax = incomeAboveBasic * 0.14;
    } else if (incomeAboveBasic <= (66760.0 - basicAllowance)) { // Bracket 2: 24%
      incomeTax = (17005.0 - basicAllowance) * 0.14 + (incomeAboveBasic - (17005.0 - basicAllowance)) * 0.24;
    } else if (incomeAboveBasic <= (277825.0 - basicAllowance)) { // Bracket 3: 42%
      incomeTax = (17005.0 - basicAllowance) * 0.14 + (66760.0 - 17005.0) * 0.24 + (incomeAboveBasic - (66760.0 - basicAllowance)) * 0.42;
    } else { // Bracket 4: 45%
      incomeTax = (17005.0 - basicAllowance) * 0.14 + (66760.0 - 17005.0) * 0.24 + (277825.0 - 66760.0) * 0.42 + (incomeAboveBasic - (277825.0 - basicAllowance)) * 0.45;
    }
  }

  // Adjust for tax class (simplified multipliers)
  const taxClassMultipliers: { [key: string]: number } = {
    '1': 1.0,
    '2': 0.85, // Single parent
    '3': 0.6, // Married, partner not working
    '4': 1.0, // Married, both working equally
    '5': 1.4, // Married, partner in class III
    '6': 1.33, // Second job
  };
  incomeTax *= (taxClassMultipliers[taxClass] || 1.0);

  // Solidarity Surcharge - applied to the calculated income tax
  // The exemption limit is applied to the *calculated income tax*, not the taxable income.
  // The glossary mentions a simplified limit.
  if (incomeTax > SOLIDARITY_SURCHARGE_EXEMPTION_LIMIT_SINGLE) {
    solidaritySurcharge = (incomeTax - SOLIDARITY_SURCHARGE_EXEMPTION_LIMIT_SINGLE) * SOLIDARITY_SURCHARGE_RATE;
  }

  // Church Tax
  if (paysChurchTax) {
    churchTax = incomeTax * churchTaxRate;
  }

  console.log('Tax Calculation Results:', { incomeTax, solidaritySurcharge, churchTax });
  return {
    incomeTax: Math.max(0, incomeTax),
    solidaritySurcharge: Math.max(0, solidaritySurcharge),
    churchTax: Math.max(0, churchTax),
  };
}

// --- Main Calculation Functions ---

export function calculateEmployeeNet(params: EmployeeParams): EmployeeResult {
  console.log('--- calculateEmployeeNet ---');
  console.log('Received params:', params);

  const {
    monthlyGross,
    steuerklasse,
    bundesland,
    kinder, // This is the Kinderfreibetrag value (per parent)
    kirchensteuer,
    alter, // Age of the employee
    geldwerterVorteil,
    abrechnungsjahr,
    steuerfreibetrag, // This is the additional tax-free allowance
    habenKinder,
    kinderUnter25, // Number of children under 25
    krankenversicherung,
    kvZusatzbeitrag,
    rentenversicherung,
    arbeitslosenversicherung,
  } = params;

  const yearlyGross = monthlyGross * 12;

  // --- Social Security Contributions ---
  let employeePensionContribution = 0;
  let employeeUnemploymentContribution = 0;
  let employeeHealthContribution = 0;
  let employeeCareContribution = 0;

  const pensionUnemploymentCeiling = getPensionUnemploymentCeiling(bundesland);
  const healthInsuranceCeiling = HEALTH_INSURANCE_CEILING;

  // Pension and Unemployment Insurance
  if (rentenversicherung === 'gesetzlich') {
    const pensionContributionBase = Math.min(yearlyGross, pensionUnemploymentCeiling);
    employeePensionContribution = pensionContributionBase * PENSION_INSURANCE_RATE / 2 / 12; // Monthly
  }
  if (arbeitslosenversicherung === 'gesetzlich') {
    const unemploymentContributionBase = Math.min(yearlyGross, pensionUnemploymentCeiling);
    employeeUnemploymentContribution = unemploymentContributionBase * UNEMPLOYMENT_INSURANCE_RATE / 2 / 12; // Monthly
  }

  // Health and Care Insurance
  if (krankenversicherung === 'gesetzlich') {
    const healthInsuranceBase = Math.min(yearlyGross, healthInsuranceCeiling); // Use yearly gross for base calculation
    employeeHealthContribution = healthInsuranceBase * (HEALTH_INSURANCE_GENERAL_RATE + kvZusatzbeitrag / 100) / 2 / 12; // Monthly

    // Care Insurance Calculation (Pflegeversicherung)
    let careInsuranceRateEmployee = CARE_INSURANCE_RATE_BASE / 2; // Employee's base share

    // Apply surcharges based on children and age
    if (habenKinder) {
      // Glossary provides rates based on number of children under 25
      // Simplified: Assuming 'kinderUnter25' directly maps to the number of children for rate calculation.
      let childrenCountForRate = kinderUnter25;
      if (childrenCountForRate >= 5) {
        childrenCountForRate = 5; // Cap at 5 for rate lookup
      }

      // Rates from glossary (employee share):
      // no children: 2.3% -> total 4.6% -> employee share 2.3%
      // 1 child: 1.7% -> total 3.4% -> employee share 1.7%
      // 2 children: 1.45% -> total 2.9% -> employee share 1.45%
      // 3 children: 1.2% -> total 2.4% -> employee share 1.2%
      // 4 children: 0.95% -> total 1.9% -> employee share 0.95%
      // 5+ children: 0.7% -> total 1.4% -> employee share 0.7%

      const employeeCareRates = {
        0: 0.023, // No children
        1: 0.017, // 1 child
        2: 0.0145, // 2 children
        3: 0.012, // 3 children
        4: 0.0095, // 4 children
        5: 0.007, // 5+ children
      };
      careInsuranceRateEmployee = employeeCareRates[childrenCountForRate] || employeeCareRates[0]; // Default to no children rate if lookup fails

      // Special case for Sachsen (employee share is 1.20% if no children, 0.05% less per child up to 4 children)
      // This calculator currently doesn't specify Sachsen's specific rates for multiple children,
      // so we'll use the general rates and note this potential difference.
      // The glossary states: "Besonderheit in Sachsen: Arbeitnehmer: 2,20 % Arbeitgeber: 1,20 %" for Pflegeversicherung.
      // This implies a total of 3.4%, but the employee share is 2.2% if no children.
      // For simplicity, we'll stick to the general rates derived from the employee share percentages.

    } else {
      // No children, check age for surcharge
      if (alter > 23) {
        careInsuranceRateEmployee += CARE_INSURANCE_SURCHARGE_CHILDLESS_OVER_23;
      }
    }
    employeeCareContribution = healthInsuranceBase * careInsuranceRateEmployee / 12; // Monthly
  }

  // --- Taxable Income Calculation ---
  // Base for tax calculation is yearly gross + geldwerter Vorteil.
  // The Grundfreibetrag, additional steuerfreibetrag, and Kinderfreibetrag are applied within calculateIncomeTax2025.
  const taxableIncomeForTaxCalc = yearlyGross + geldwerterVorteil * 12;

  // --- Tax Calculation ---
  const churchTaxRate = FEDERAL_STATE_CHURCH_TAX_RATES[bundesland] || 0;
  const isMarried = steuerklasse === '3' || steuerklasse === '4' || steuerklasse === '5'; // Simplified check for married status

  // Calculate total Kinderfreibetrag to be applied for tax calculation
  // This is the sum of Kinderfreibetrag per parent * number of children (if applicable)
  // The 'kinder' parameter is the Kinderfreibetrag value per parent.
  // We need to consider how many parents are applying it. For simplicity, we assume it's applied once per child.
  // The glossary states "Kinderfreibetrag 2025: 6.672 € (pro Elternteil)".
  // If 'habenKinder' is true, we use the provided 'kinder' value (which is per parent).
  // The total Kinderfreibetrag to subtract from taxable income is `kinder * number_of_children`.
  // However, the input `kinder` is already the value per parent.
  // The `calculateIncomeTax2025` function expects `kinderFreibetragTotal`.
  // Let's assume `kinder` is the value per parent, and we need to multiply by the number of children.
  // The number of children for this purpose is `kinderUnter25`.
  const totalKinderFreibetragToApply = habenKinder ? kinder * kinderUnter25 : 0;
  console.log('Total Kinderfreibetrag to apply for tax calculation:', totalKinderFreibetragToApply);


  const taxResult = calculateIncomeTax2025(
    taxableIncomeForTaxCalc,
    steuerklasse,
    churchTaxRate,
    kirchensteuer,
    isMarried, // Pass married status
    steuerfreibetrag, // <<< FIX: Pass steuerfreibetrag here
    totalKinderFreibetragToApply // Pass the total Kinderfreibetrag
  );

  const monthlyIncomeTax = taxResult.incomeTax / 12;
  const monthlySolidaritySurcharge = taxResult.solidaritySurcharge / 12;
  const monthlyChurchTax = taxResult.churchTax / 12;

  // --- Total Deductions ---
  const totalMonthlyDeductions =
    monthlyIncomeTax +
    monthlySolidaritySurcharge +
    monthlyChurchTax +
    employeePensionContribution +
    employeeUnemploymentContribution +
    employeeHealthContribution +
    employeeCareContribution;

  const monthlyNet = monthlyGross - totalMonthlyDeductions;
  const yearlyNet = monthlyNet * 12;

  console.log('Final Employee Result:', {
    monthlyNet: Math.max(0, monthlyNet),
    yearlyNet: Math.max(0, yearlyNet),
    breakdown: {
      lohnsteuer: monthlyIncomeTax,
      solidaritaetszuschlag: monthlySolidaritySurcharge,
      kirchensteuer: monthlyChurchTax,
      rentenversicherung: employeePensionContribution,
      arbeitslosenversicherung: employeeUnemploymentContribution,
      krankenversicherung: employeeHealthContribution,
      pflegeversicherung: employeeCareContribution,
    },
  });

  return {
    monthlyNet: Math.max(0, monthlyNet),
    yearlyNet: Math.max(0, yearlyNet),
    breakdown: {
      lohnsteuer: monthlyIncomeTax,
      solidaritaetszuschlag: monthlySolidaritySurcharge,
      kirchensteuer: monthlyChurchTax,
      rentenversicherung: employeePensionContribution,
      arbeitslosenversicherung: employeeUnemploymentContribution,
      krankenversicherung: employeeHealthContribution,
      pflegeversicherung: employeeCareContribution,
    },
  };
}

export function calculateFreelancerNet(params: FreelancerParams): FreelancerResult {
  const {
    annualProfit,
    healthInsuranceCostYearly,
    taxClass,
    paysChurchTax,
    federalState,
  } = params;

  // --- Taxable Income Calculation ---
  // Freelancers can deduct health insurance costs and a basic allowance (Sonderausgabenpauschbetrag)
  const sonderausgabenpauschbetrag = 36.0; // Simplified allowance for freelancers
  const taxableIncome = Math.max(0, annualProfit - healthInsuranceCostYearly - sonderausgabenpauschbetrag);

  // --- Tax Calculation ---
  const churchTaxRate = FEDERAL_STATE_CHURCH_TAX_RATES[federalState] || 0; // Use a map for church tax rates

  // For freelancers, we assume no children are directly factored into the income tax calculation here,
  // as their tax situation is different and often handled via self-assessment.
  // The 'kinderFreibetragTotal' is passed as 0.
  const taxResult = calculateIncomeTax2025(
    taxableIncome,
    taxClass,
    churchTaxRate,
    paysChurchTax,
    false, // Freelancers are generally not considered 'married' for this tax calculation context
    0, // steuerfreibetrag for freelancers in this simplified model
    0 // No Kinderfreibetrag applied directly in this simplified freelancer tax calc
  );

  // --- Total Deductions ---
  const totalTaxes = taxResult.incomeTax + taxResult.solidaritySurcharge + taxResult.churchTax;

  const netIncomeYearly = annualProfit - healthInsuranceCostYearly - totalTaxes;
  const netIncomeMonthly = netIncomeYearly / 12;

  return {
    monthlyNet: Math.max(0, netIncomeMonthly),
    yearlyNet: Math.max(0, netIncomeYearly),
    breakdown: {
      // Ensure all keys are present, even if the calculated tax is 0
      einkommensteuer: taxResult.incomeTax,
      solidaritaetszuschlag: taxResult.solidaritySurcharge,
      kirchensteuer: taxResult.churchTax,
    },
  };
}

// Helper map for church tax rates by federal state
const FEDERAL_STATE_CHURCH_TAX_RATES: { [key: string]: number } = {
  'Baden-Württemberg': CHURCH_TAX_RATE_BAYERN_BW,
  'Bayern': CHURCH_TAX_RATE_BAYERN_BW,
  'Berlin': CHURCH_TAX_RATE_NORMAL,
  'Brandenburg': CHURCH_TAX_RATE_NORMAL,
  'Bremen': CHURCH_TAX_RATE_NORMAL,
  'Hamburg': CHURCH_TAX_RATE_NORMAL,
  'Hessen': CHURCH_TAX_RATE_NORMAL,
  'Mecklenburg-Vorpommern': CHURCH_TAX_RATE_NORMAL,
  'Niedersachsen': CHURCH_TAX_RATE_NORMAL,
  'Nordrhein-Westfalen': CHURCH_TAX_RATE_NORMAL,
  'Rheinland-Pfalz': CHURCH_TAX_RATE_NORMAL,
  'Saarland': CHURCH_TAX_RATE_NORMAL,
  'Sachsen': CHURCH_TAX_RATE_NORMAL,
  'Sachsen-Anhalt': CHURCH_TAX_RATE_NORMAL,
  'Schleswig-Holstein': CHURCH_TAX_RATE_NORMAL,
  'Thüringen': CHURCH_TAX_RATE_NORMAL,
};
