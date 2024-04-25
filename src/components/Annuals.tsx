import { Controller } from 'react-hook-form';

import { MyFormProps } from '../utils/types';
import CurrencyInput from './CurrencyInput';
import PercentageInput from './PercentageInput';

function Annuals({ control }: MyFormProps) {
    return (
        <>
        <Controller
            name='annualHOI'
            control={control}
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
                <CurrencyInput label="Annual HOI" value={value} onChange={onChange} />
            )}
        /> 
        <Controller
            name='taxRate'
            control={control}
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
                <PercentageInput label="Tax Rate (%)" value={value} onChange={onChange} />
            )}
        /> 
        <Controller
            name='annualTaxes'
            control={control}
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
                <CurrencyInput label="Annual Taxes" value={value} onChange={onChange} />
            )}
        /> 
        <Controller
            name='annualFloodIns'
            control={control}
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
                <CurrencyInput label="Annual Flood Ins" value={value} onChange={onChange} />
            )}
        /> 
        <Controller
            name='annualHOADues'
            control={control}
            defaultValue={0}
            render={({ field: { value, onChange } }) => (
                <CurrencyInput label="Annual HOA Dues" value={value} onChange={onChange} />
            )}
        /> 
        </>
    )}

export default Annuals;