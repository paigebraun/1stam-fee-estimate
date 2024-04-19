import { Control, FieldErrors, UseFormSetValue, UseFormRegister } from 'react-hook-form';

export type MyFormProps = {
    control: Control<FormFields>;
    errors: FieldErrors<FormFields>;
    setValue: UseFormSetValue<FormFields>;
    register: UseFormRegister<FormFields>;
};

export type FormFields = {
    loanOriginator: { name: string; NMLS: string; phone: string };
    borrowerName: string;
    creditScore: string;
    
    loanProgram: string;
    loanPurpose: string;
    term: number;
    occupancy: string;
    escrow: string;
    
    processingFee: number;
    underwritingFee: number;
    adminFee: number;
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
};

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
    value: number;
    onChange: (value: number) => void;
};

type FormFieldNames = 'loanOriginator' | 'borrowerName' | 'creditScore' | 'loanProgram' | 'loanPurpose' | 
'term' | 'occupancy' | 'processingFee' | 'underwritingFee' | 'adminFee' | 'appraisal' | 'floodCertificate' | 
'creditReport' | 'attorneyDocPrep' | 'settlementFee' | 'ownersTitle' | 'endorsements' | 'homeInspection' |
'recordingFee' | 'vaFunding' | 'escrow';

export type SelectInputProps = {
  label: string;
  options: (Selection | Originators)[];
  control: MyFormProps['control'];
  name: FormFieldNames;
  errors: MyFormProps['errors'];
  setValue: MyFormProps['setValue'];
  defaultValue?: string;
};

export type CheckboxRadioProps = {
    label: string;
    control: MyFormProps['control'];
    name: FormFieldNames;
    options: Selection[];
  }