import { Control, FieldErrors, UseFormSetValue, UseFormRegister, UseFormWatch } from 'react-hook-form';

export type MyFormProps = {
    control: Control<FormFields>;
    errors: FieldErrors<FormFields>;
    setValue: UseFormSetValue<FormFields>;
    register: UseFormRegister<FormFields>;
    watch: UseFormWatch<FormFields>;
};

export type FormFields = {
    loanOriginator: { name: string; NMLS: string; phone: string };
    borrowerName: string;
    creditScore: string;
    
    loanProgram: string;
    loanPurpose: string;
    term: number;
    interestRate: number;
    occupancy: string;
    escrow: string;
    
    processingFee: number;
    underwritingFee: number;
    voeFee: number;
    appraisal: number;
    floodCertificate: number;
    creditReport: number;
    attorneyDocPrep: number;

    settlementFee: number;
    ownersTitle: number;
    endorsements: number;
    
    homeInspection: number;

    recordingFee: number;

    vaFunding: string;

    salesPrice: number;
    loanAmount: number;
    downPaymentCash: number;
    downPaymentPercent: number;

    annualHOI: number;
    taxRate: number;
    annualTaxes: number;
    annualFloodIns: number;
    annualHOADues: number;

    discountPointsPercent: number;
    discountPointsCash: number;

    sellerCredit: number;
    earnestMoney: number;
    customMIRate: number;
    customPrepaidInterest: number;
};

export type FieldName = keyof FormFields;

export type Originators = {
    label: string;
    value: {
      name: string;
      NMLS: string;
      phone: string;
    };
};

export type Selection = {
    label: string;
    value: string;
};

export type CurrencyInputProps = {
    label: string;
    id: string;
    value: number;
    readOnly?: boolean;
    onChange?: (value: number) => void;
};

type FormFieldNames = 'loanOriginator' | 'borrowerName' | 'creditScore' | 'loanProgram' | 'loanPurpose' | 
'term' | 'occupancy' | 'processingFee' | 'underwritingFee' | 'voeFee' | 'appraisal' | 'floodCertificate' | 
'creditReport' | 'attorneyDocPrep' | 'settlementFee' | 'ownersTitle' | 'endorsements' | 'homeInspection' |
'recordingFee' | 'vaFunding' | 'escrow' | 'salesPrice' | 'loanAmount' | 'downPaymentCash' | 'downPaymentPercent' |
'interestRate'| 'annualHOI' | 'taxRate' | 'annualTaxes' | 'annualFloodIns' | 'annualHOADues' | 'sellerCredit' |
'earnestMoney' | 'customMIRate' | 'customPrepaidInterest';

export type SelectInputProps = {
  label: string;
  id: string;
  options: (Selection | Originators)[];
  control: MyFormProps['control'];
  name: FormFieldNames;
  errors: MyFormProps['errors'];
  setValue: MyFormProps['setValue'];
  defaultValue?: string;
};

export type CheckboxRadioProps = {
    id: string;
    label: string;
    control: MyFormProps['control'];
    name: FormFieldNames;
    options: Selection[];
};