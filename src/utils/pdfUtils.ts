import { PDFDocument, TextAlignment } from 'pdf-lib';
import feeEstimate from '../assets/1stAM Fee Estimate Template.pdf';
import { FormFields } from './types';
import {calculateAPR, calculatePresentValueWithoutAPR} from './rateFunctions';

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

const modifyPdfFields = (pdfForm: any, data: FormFields, currentDate: string, apr: number, prepaidInterest: number, PIResult: number) => {
    setTextAndAlignment(pdfForm.getTextField('Applicants Text Field'), data.borrowerName);
    setTextAndAlignment(pdfForm.getTextField('Loan Originator Text Field'), data.loanOriginator.name);
    setTextAndAlignment(pdfForm.getTextField('NMLS ID Text Field'), data.loanOriginator.NMLS);
    setTextAndAlignment(pdfForm.getTextField('Phone Text Field'), data.loanOriginator.phone);
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
    setTextAndAlignment(pdfForm.getTextField('Admin Fee Text Field'), toCurrencyString(data.voeFee));
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
    setTextAndAlignment(pdfForm.getTextField('Real Estate Taxes 3MO Text Field'), toCurrencyString((data.annualTaxes / 12)*3));
    setTextAndAlignment(pdfForm.getTextField('Homeowners Insurance 3MO Text Field'), toCurrencyString((data.annualHOI / 12)*3));

    setTextAndAlignment(pdfForm.getTextField('Down Payment Text Field'), toCurrencyString(data.downPaymentCash));
    setTextAndAlignment(pdfForm.getTextField('Seller Paid Closing Costs Text Field'), toCurrencyString(data.sellerCredit * -1));
    setTextAndAlignment(pdfForm.getTextField('Earnest Money Deposit Text Field'), toCurrencyString(data.earnestMoney * -1));
    setTextAndAlignment(pdfForm.getTextField('Principal Interest Text Field'), toCurrencyString(PIResult));
    setTextAndAlignment(pdfForm.getTextField('Homeowners Insurance Text Field'), toCurrencyString(data.annualHOI / 12));
    setTextAndAlignment(pdfForm.getTextField('Real Estate Taxes Text Field'), toCurrencyString(data.annualTaxes / 12));
};

export const modifyPdf = async (data: FormFields, currentDate: string) => {
    try {
        const pdfDoc = await loadPdfForm(feeEstimate);
        const pdfForm = pdfDoc.getForm();

        const { apr, prepaidInterest, PIResult } = calcPVandAPR(data);
        modifyPdfFields(pdfForm, data, currentDate, apr, prepaidInterest, PIResult);

        pdfForm.flatten();

        const pdfBytes = await pdfDoc.save();
        const docUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
        window.open(docUrl, '_blank');
    } catch (error) {
        console.error('Error modifying PDF:', error);
    }
};
