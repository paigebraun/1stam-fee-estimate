import { PDFDocument, TextAlignment } from 'pdf-lib';
import feeEstimate from '../assets/1stAM Fee Estimate Template.pdf';
import { FormFields, OriginatorDetails } from './types';
import {calculateAPR, calculatePresentValueWithoutAPR} from './rateFunctions';
import MICalculator from './MICalculator';
import calculateVAFundingFee from './VAFundingCalculator';

// Calculte APR using Excel RATE function
const calcPVandAPR = (data: FormFields): { apr: number; prepaidInterest: number; PIResult: number } => {
    const numPayments = data.term * 12;

    const prepaidInterestDefault = data.interestRate /100 / 365 * data.loanAmount * 5;
    const prepaidInterestCustom = data.interestRate /100 / 365 * data.loanAmount * data.customPrepaidInterest;
    let prepaidInterest = 0;
    if (prepaidInterestCustom > 0) {
        prepaidInterest = prepaidInterestCustom;
    } else {
        prepaidInterest = prepaidInterestDefault;
    }

    const fees = data.discountPointsCash + data.processingFee + data.underwritingFee + data.voeFee + data.floodCertificate + data.attorneyDocPrep + prepaidInterest + data.settlementFee + data.ownersTitle + data.endorsements;
    
    const loanMinusFees = data.loanAmount - fees;
    const r = data.interestRate / 100/ 12
    const ptimesr = data.loanAmount * r;
    const oneplusrpowern = (1 + r) ** (data.term * 12);
    const bottomForm = oneplusrpowern - 1;
    const topForm = ptimesr * oneplusrpowern;

    const PIResult = topForm / bottomForm;
    const pmt = PIResult * -1;

    const pv = calculatePresentValueWithoutAPR(pmt, fees, numPayments, loanMinusFees);
    const apr = calculateAPR(numPayments, pmt, pv);
    
    return { apr: apr !== null ? apr : 0, prepaidInterest: prepaidInterest, PIResult: PIResult};
};

const toCurrencyString = (amount: number): string => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const toPercentString = (percentage: number): string => {
    return percentage.toFixed(3) + '%';
};

const loadPdfForm = async (url: string): Promise<PDFDocument> => {
    const formPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    return PDFDocument.load(formPdfBytes);
};

const setTextAndAlignment = (field: any, text: string, alignment: TextAlignment = TextAlignment.Right) => {
    field.setText(text);
    field.setAlignment(alignment);
};

const modifyPdfFields = (pdfForm: any, data: FormFields, currentDate: string, apr: number, prepaidInterest: number, PIResult: number, ltv: number, MIFactor: number, vaFundingFeePercentage: number) => {
    // Get LO details
    const originatorDetails: Record<string, OriginatorDetails> = {
        'Jill Gallagher ': { NMLS: '4462', phone: '(713) 408-2663' },
        'Jennifer Wolf': { NMLS: '118652', phone: '(979) 694-1001' },
        'Gayle Lyons': { NMLS: '227509', phone: '(979) 694-1002' },
        'Courtney Resendiz': { NMLS: '1417828', phone: '(956) 535-2947' },
        'Traci Camp': { NMLS: '1958292', phone: '(979) 574-5158' },
        'Bill Cooney': { NMLS: '304433', phone: '(713) 446-9118' },
        'Elaine Holman': { NMLS: '250913', phone: '(281) 620-6138' },
        'Matt Ferrell' : { NMLS: '228399', phone: '(310) 237-3314' },
        'Rashid Naqvi' : { NMLS: '313707', phone: '(832) 545-0667' },
        'Tom Laurenzo' : { NMLS: '259743', phone: '(832) 566-6735' },
        'Daron Mendoza' : { NMLS: '225619', phone: '(832) 202-4057' },
        'Delia Warny' : { NMLS: '259948', phone: '(979) 709-8300' },
        'Steve Jeffries' : { NMLS: '346771', phone: '(806) 441-7545' },
        'Elizabeth Rubio' : { NMLS: '285976', phone: '(713) 301-0871' }
    };
    
    const getNMLS = (originatorName: string): string => {
        return originatorDetails[originatorName]?.NMLS || '';
    };

    const getPhone = (originatorName: string): string => {
        return originatorDetails[originatorName]?.phone || '';
    };

    // If loan is VA and not exempt from funding fees, update loan amount to include VA funding fees
    if (data.loanProgram === 'VA' && data.vaFunding !== 'Exempt') {
        const vaFundingFees = data.loanAmount * (vaFundingFeePercentage/100)
        data.loanAmount = data.loanAmount + vaFundingFees;
    }

    // If loan is FHA, update loan amount to include FHA funding fees
    if (data.loanProgram === 'FHA') {
        const fhaFundingFees = data.loanAmount * (.0175)
        data.loanAmount = data.loanAmount + fhaFundingFees;
    }
    
    // Calculate 3 months for Escrows
    let homeownersInsurance3MO: number;
    let realEstateTaxes3MO: number;
    let floodInsurance3MO:  number;
    let homeownersInsurance3MOtoFee: string;
    let realEstateTaxes3MOtoFee: string;
    let floodInsurance3MOtoFee:  string;
    console.log(data.escrow);
    if (data.escrow === 'yes') {
        homeownersInsurance3MO = (data.annualHOI / 12) * 3;
        homeownersInsurance3MOtoFee = toCurrencyString(homeownersInsurance3MO);
        realEstateTaxes3MO = (data.annualTaxes / 12) * 3;
        realEstateTaxes3MOtoFee = toCurrencyString(realEstateTaxes3MO);
        floodInsurance3MO = (data.annualFloodIns /12) * 3;
        floodInsurance3MOtoFee = toCurrencyString(floodInsurance3MO);
    } else {
        homeownersInsurance3MOtoFee = 'N/A';
        homeownersInsurance3MO = 0;
        realEstateTaxes3MOtoFee = 'N/A';
        realEstateTaxes3MO = 0;
        floodInsurance3MOtoFee = 'N/A';
        floodInsurance3MO = 0;
    }
    
    const totalClosingCosts = data.discountPointsCash + data.processingFee + data.underwritingFee + data.voeFee + data.appraisal + data.floodCertificate + 
        data.creditReport + data.attorneyDocPrep + data.settlementFee + data.ownersTitle + data.endorsements + data.recordingFee + data.homeInspection;

    const totalPrepaidReserves = data.annualHOI + prepaidInterest + data.annualFloodIns + homeownersInsurance3MO + realEstateTaxes3MO + floodInsurance3MO;
    const totalFundsNeeded = totalClosingCosts + totalPrepaidReserves + data.downPaymentCash;

    const estFundsToClose = totalFundsNeeded + (data.sellerCredit * -1) + (data.earnestMoney * -1);

    // Calculate monthly MI
    const calculatedMonthlyMI = (data.loanAmount * (MIFactor/100)) / 12;
    const customMontlyMI = (data.loanAmount * (data.customMIRate/100)) / 12;
    let MItoFee : string;
    let MItoCalc : number;
    if (ltv > 80 && customMontlyMI > 0) {
        MItoFee = toCurrencyString(customMontlyMI);
        MItoCalc = customMontlyMI;
    } else if (ltv > 80 && customMontlyMI === 0) {
        MItoFee = toCurrencyString(calculatedMonthlyMI);
        MItoCalc = calculatedMonthlyMI;
    } else {
        MItoFee = 'N/A';
        MItoCalc = 0;
    }

    const totalEstMonthlyPmt = PIResult + (data.annualHOI / 12) + (data.annualTaxes / 12) + MItoCalc + (data.annualHOADues / 12) + (data.annualFloodIns / 12);

    // Set all data in corresponding PDF text fields
    setTextAndAlignment(pdfForm.getTextField('Applicants Text Field'), data.borrowerName);
    setTextAndAlignment(pdfForm.getTextField('Loan Originator Text Field'), data.loanOriginator);
    setTextAndAlignment(pdfForm.getTextField('NMLS ID Text Field'), getNMLS(data.loanOriginator));
    setTextAndAlignment(pdfForm.getTextField('Phone Text Field'), getPhone(data.loanOriginator));
    setTextAndAlignment(pdfForm.getTextField('Credit Score Text Field'), data.creditScore);
    setTextAndAlignment(pdfForm.getTextField('Preparation Date Text Field'), currentDate);

    setTextAndAlignment(pdfForm.getTextField('Loan Program Text Field'), data.loanProgram);
    setTextAndAlignment(pdfForm.getTextField('Purpose of Loan Text Field'), data.loanPurpose);
    setTextAndAlignment(pdfForm.getTextField('Term Text Field'), data.term.toString());
    setTextAndAlignment(pdfForm.getTextField('Interest Rate Text Field'), toPercentString(data.interestRate));
    setTextAndAlignment(pdfForm.getTextField('APR Text Field'), toPercentString(apr * 100));
    setTextAndAlignment(pdfForm.getTextField('Occupancy Text Field'), data.occupancy);
    setTextAndAlignment(pdfForm.getTextField('Sales Price Text Field'), toCurrencyString(data.salesPrice));
    setTextAndAlignment(pdfForm.getTextField('Down Payment Percent Text Field'), toPercentString(data.downPaymentPercent));
    setTextAndAlignment(pdfForm.getTextField('Down Payment Cash Text Field'), toCurrencyString(data.downPaymentCash));
    setTextAndAlignment(pdfForm.getTextField('Loan Amount Text Field'), toCurrencyString(data.loanAmount));

    setTextAndAlignment(pdfForm.getTextField('Discount Points Text Field'), toCurrencyString(data.discountPointsCash));
    setTextAndAlignment(pdfForm.getTextField('Processing Fee Text Field'), toCurrencyString(data.processingFee));
    setTextAndAlignment(pdfForm.getTextField('Underwriting Fee Text Field'), toCurrencyString(data.underwritingFee));
    setTextAndAlignment(pdfForm.getTextField('VOE Fee Text Field'), toCurrencyString(data.voeFee));
    setTextAndAlignment(pdfForm.getTextField('Appraisal Text Field'), toCurrencyString(data.appraisal));
    setTextAndAlignment(pdfForm.getTextField('Flood Certificate Text Field'), toCurrencyString(data.floodCertificate));
    setTextAndAlignment(pdfForm.getTextField('Credit Report Text Field'), toCurrencyString(data.creditReport));
    setTextAndAlignment(pdfForm.getTextField('Attorney Document Prep Text Field'), toCurrencyString(data.attorneyDocPrep));
    setTextAndAlignment(pdfForm.getTextField('Settlement Fee Text Field'), toCurrencyString(data.settlementFee));
    setTextAndAlignment(pdfForm.getTextField('Owners Title Policy Text Field'), toCurrencyString(data.ownersTitle));
    setTextAndAlignment(pdfForm.getTextField('Endorsements Text Field'), toCurrencyString(data.endorsements));

    setTextAndAlignment(pdfForm.getTextField('Recording Fee Text Field'), toCurrencyString(data.recordingFee));
    setTextAndAlignment(pdfForm.getTextField('Home Inspection Text Field'), toCurrencyString(data.homeInspection));
    setTextAndAlignment(pdfForm.getTextField('Homeowners Insurance 1YR Text Field'), toCurrencyString(data.annualHOI));
    setTextAndAlignment(pdfForm.getTextField('Prepaid Interest Text Field'), toCurrencyString(prepaidInterest));
    setTextAndAlignment(pdfForm.getTextField('Flood Insurance 1YR Text Field'), toCurrencyString(data.annualFloodIns));
    setTextAndAlignment(pdfForm.getTextField('Real Estate Taxes 3MO Text Field'), realEstateTaxes3MOtoFee);
    setTextAndAlignment(pdfForm.getTextField('Homeowners Insurance 3MO Text Field'), homeownersInsurance3MOtoFee);
    setTextAndAlignment(pdfForm.getTextField('Flood Insurance 3MO Text Field'), floodInsurance3MOtoFee);

    setTextAndAlignment(pdfForm.getTextField('Down Payment Text Field'), toCurrencyString(data.downPaymentCash));
    setTextAndAlignment(pdfForm.getTextField('Seller Paid Closing Costs Text Field'), toCurrencyString(data.sellerCredit * -1));
    setTextAndAlignment(pdfForm.getTextField('Earnest Money Deposit Text Field'), toCurrencyString(data.earnestMoney * -1));
    setTextAndAlignment(pdfForm.getTextField('Principal Interest Text Field'), toCurrencyString(PIResult));
    setTextAndAlignment(pdfForm.getTextField('Homeowners Insurance Text Field'), toCurrencyString(data.annualHOI / 12));
    setTextAndAlignment(pdfForm.getTextField('Real Estate Taxes Text Field'), toCurrencyString(data.annualTaxes / 12));
    setTextAndAlignment(pdfForm.getTextField('HOA Condo Association Text Field'), toCurrencyString(data.annualHOADues / 12));
    setTextAndAlignment(pdfForm.getTextField('Flood Insurance Text Field'), toCurrencyString(data.annualFloodIns / 12));

    setTextAndAlignment(pdfForm.getTextField('Total Closing Costs Text Field'), toCurrencyString(totalClosingCosts));
    setTextAndAlignment(pdfForm.getTextField('Total Prepaids Text Field'), toCurrencyString(totalPrepaidReserves));
    setTextAndAlignment(pdfForm.getTextField('Total Funds Needed Text Field'), toCurrencyString(totalFundsNeeded));
    setTextAndAlignment(pdfForm.getTextField('Estimated Funded to Close Text Field'), toCurrencyString(estFundsToClose));

    setTextAndAlignment(pdfForm.getTextField('Mortgage Insurance Text Field'), MItoFee);
    setTextAndAlignment(pdfForm.getTextField('Total Est Monthly Text Field'), toCurrencyString(totalEstMonthlyPmt));
};

export const modifyPdf = async (data: FormFields, currentDate: string) => {
    try {
        const pdfDoc = await loadPdfForm(feeEstimate);
        const pdfForm = pdfDoc.getForm();

        // Calculate APR, MI, LTV, and VAFF
        const { apr, prepaidInterest, PIResult } = calcPVandAPR(data);
        const ltv = (data.loanAmount / data.salesPrice) * 100;
        const MIFactor = MICalculator(ltv, data.creditScore);
        const vaFundingFeePercentage = calculateVAFundingFee(data.vaFunding, data.downPaymentPercent);
        
        modifyPdfFields(pdfForm, data, currentDate, apr, prepaidInterest, PIResult, ltv, MIFactor, vaFundingFeePercentage);

        pdfForm.flatten();

        // Generate a Blob object from the modified PDF
        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Create a temporary anchor element
        const a = document.createElement('a');
        a.href = pdfUrl;
        a.download = 'fee_estimate.pdf';
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(pdfUrl);
    } catch (error) {
        console.error('Error modifying PDF:', error);
    }
};