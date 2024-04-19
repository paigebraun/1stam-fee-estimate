import { Controller } from 'react-hook-form';

import SelectInput from './SelectInput';

import { MyFormProps, Selection } from '../utils/types';
import CurrencyInput from './CurrencyInput';

function Government({ control, errors, setValue }: MyFormProps) {
    
    const vaFundingOptions: Selection[] = [
        { label: 'First Use', value: 'First Use'},
        { label: 'Subsequent Use', value: 'Subsequent Use'},
        { label: 'Exempt', value: 'Exempt' }
    ]

    const defaultVaFundingValue = vaFundingOptions[2].value;

    return (
        <>
        <Controller
            name='recordingFee'
            control={control}
            defaultValue={150}
            render={({ field: { value, onChange } }) => (
                <CurrencyInput label='Recording Fee' value={value} onChange={onChange} />
            )}
        />
        <p className='mt-4 mb-3'>If applicable, select one of the following from the dropdown for the VA Funding Fee:</p>
        <SelectInput
            label=''
            options={vaFundingOptions}
            control={control}
            name='vaFunding'
            errors={errors}
            setValue={setValue}
            defaultValue={defaultVaFundingValue}
        />
        </>
    )}

export default Government;