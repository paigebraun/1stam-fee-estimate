import { Controller } from 'react-hook-form';

import { MyFormProps } from '../utils/types';
import CurrencyInput from './CurrencyInput';
import PercentageInput from './PercentageInput';

function Annuals({ control, setValue, salesPrice }: MyFormProps & { salesPrice: number }) {
    // Calculate annual taxes or tax rate, depending on which is entered first
    const handleAnnualTaxesChange = (newValue: number) => {
        const newTaxRate = newValue / salesPrice * 100
        setValue('taxRate', newTaxRate);
    };

    const handleTaxRateChange = (newValue: number) => {
        const newAnnualTaxes = newValue * salesPrice / 100
        setValue('annualTaxes', newAnnualTaxes);
    }
    
    return (
        <>
        <Controller
            name='annualHOI'
            control={control}
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
                <CurrencyInput label="Annual HOI" id={'annualHOI'} value={value} onChange={onChange} />
            )}
        /> 
        <Controller
            name='taxRate'
            control={control}
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
                <PercentageInput 
                    label="Tax Rate (%)" 
                    id={'taxRate'} 
                    value={value} 
                    onChange={(newValue) => {
                        onChange(newValue);
                        handleTaxRateChange(newValue);
                    }}
                />
            )}
        /> 
        <Controller
            name='annualTaxes'
            control={control}
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
                <CurrencyInput 
                    label="Annual Taxes" 
                    id={'annualTaxes'} 
                    value={value} 
                    onChange={(newValue) => {
                        onChange(newValue);
                        handleAnnualTaxesChange(newValue);
                    }}
                />
            )}
        /> 
        <Controller
            name='annualFloodIns'
            control={control}
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
                <CurrencyInput label="Annual Flood Ins" id={'annualFloodIns'} value={value} onChange={onChange} />
            )}
        /> 
        <Controller
            name='annualHOADues'
            control={control}
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
                <CurrencyInput label="Annual HOA Dues" id={'annualHOADues'} value={value} onChange={onChange} />
            )}
        /> 
        </>
    )}

export default Annuals;