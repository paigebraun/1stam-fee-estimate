import { Controller } from 'react-hook-form';

import { MyFormProps } from '../utils/types';
import CurrencyInput from './CurrencyInput';

function Settlement({ control }: MyFormProps) {
    return (
        <>
        <Controller
            name='settlementFee'
            control={control}
            defaultValue={400}
            render={({ field: { value, onChange } }) => (
                <CurrencyInput label='Settlement Fee' id={'settlementFee'} value={value} onChange={onChange} />
            )}
        /> 

        <Controller
            name='ownersTitle'
            control={control}
            defaultValue={100}
            render={({ field: { value, onChange } }) => (
                <CurrencyInput label="Owners' Title Policy" id={'ownersTitle'} value={value} onChange={onChange} />
            )}
        /> 

        <Controller
            name='endorsements'
            control={control}
            defaultValue={225}
            render={({ field: { value, onChange } }) => (
                <CurrencyInput label="Endorsements" id={'endorsements'} value={value} onChange={onChange} />
            )}
        /> 
        </>
    )
}

export default Settlement;

