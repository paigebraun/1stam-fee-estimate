import { Controller } from 'react-hook-form';

import { MyFormProps } from '../utils/types';
import CurrencyInput from './CurrencyInput';

function Additional({ control }: MyFormProps) {
    return (
        <Controller
            name='homeInspection'
            control={control}
            defaultValue={175}
            render={({ field: { value, onChange } }) => (
                <CurrencyInput label="Home Inspection" value={value} onChange={onChange} />
            )}
        /> 
    )}

export default Additional;