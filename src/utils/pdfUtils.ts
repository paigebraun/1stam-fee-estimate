import { PDFDocument, TextAlignment } from 'pdf-lib';
import feeEstimate from '../assets/1stAM Fee Estimate Template.pdf';
import { FormFields } from './types';

const toCurrencyString = (amount: number): string => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const loadPdfForm = async (url: string): Promise<PDFDocument> => {
    const formPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    return PDFDocument.load(formPdfBytes);
};

const setTextAndAlignment = (field: any, text: string, alignment: TextAlignment = TextAlignment.Right) => {
    field.setText(text);
    field.setAlignment(alignment);
};

const modifyPdfFields = (pdfForm: any, data: FormFields, currentDate: string) => {
    setTextAndAlignment(pdfForm.getTextField('Applicants Text Field'), data.borrowerName);
    setTextAndAlignment(pdfForm.getTextField('Loan Originator Text Field'), data.loanOriginator.name);
    setTextAndAlignment(pdfForm.getTextField('NMLS ID Text Field'), data.loanOriginator.NMLS);
    setTextAndAlignment(pdfForm.getTextField('Phone Text Field'), data.loanOriginator.phone);
    setTextAndAlignment(pdfForm.getTextField('Credit Score Text Field'), data.creditScore);
    setTextAndAlignment(pdfForm.getTextField('Preparation Date Text Field'), currentDate);
    setTextAndAlignment(pdfForm.getTextField('Loan Program Text Field'), data.loanProgram);
    setTextAndAlignment(pdfForm.getTextField('Purpose of Loan Text Field'), data.loanPurpose);
    setTextAndAlignment(pdfForm.getTextField('Term Text Field'), data.term.toString());
    setTextAndAlignment(pdfForm.getTextField('Occupancy Text Field'), data.occupancy);
    setTextAndAlignment(pdfForm.getTextField('Processing Fee Text Field'), toCurrencyString(data.processingFee));
    setTextAndAlignment(pdfForm.getTextField('Underwriting Fee Text Field'), toCurrencyString(data.underwritingFee));
    setTextAndAlignment(pdfForm.getTextField('Admin Fee Text Field'), toCurrencyString(data.adminFee));
    setTextAndAlignment(pdfForm.getTextField('Appraisal Text Field'), toCurrencyString(data.appraisal));
    setTextAndAlignment(pdfForm.getTextField('Flood Certificate Text Field'), toCurrencyString(data.floodCertificate));
    setTextAndAlignment(pdfForm.getTextField('Credit Report Text Field'), toCurrencyString(data.creditReport));
    setTextAndAlignment(pdfForm.getTextField('Attorney Document Prep Text Field'), toCurrencyString(data.attorneyDocPrep));
};

export const modifyPdf = async (data: FormFields, currentDate: string) => {
    try {
        const pdfDoc = await loadPdfForm(feeEstimate);
        const pdfForm = pdfDoc.getForm();

        modifyPdfFields(pdfForm, data, currentDate);

        pdfForm.flatten();

        const pdfBytes = await pdfDoc.save();
        const docUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
        window.open(docUrl, '_blank');
    } catch (error) {
        console.error('Error modifying PDF:', error);
    }
};
