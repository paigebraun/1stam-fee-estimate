import SelectInput from './SelectInput';
import { Selection, MyFormProps } from '../utils/types';
import CheckboxRadio from './CheckboxRadio';
import PercentageInput from './PercentageInput';
import { Controller } from 'react-hook-form';

function LoanInfo({ control, errors, setValue, register }: MyFormProps) {
    
    const loanProgramOptions: Selection[] = [
        { label: 'Conventional - Fixed', value: 'Conventional - Fixed' },
        { label: 'Conventional - ARM', value: 'Conventional - ARM' },
        { label: 'FHA', value: 'FHA' },
        { label: 'VA', value: 'VA' },
        { label: 'USDA', value: 'USDA' }
    ];

    const loanPurposeOptions: Selection[] = [
        { label: 'Purchase', value: 'Purchase' },
        { label: 'Refinance', value: 'Refinance'}
    ]

    const occupancyOptions: Selection[] = [
        { label: 'Primary Residence', value: 'Primary Residence'},
        { label: 'Second Home', value: 'Second Home' },
        { label: 'Investment', value: 'Investment'}
    ]

    return (
        <>
            <SelectInput
                label='Loan Program'
                options={loanProgramOptions}
                control={control}
                name='loanProgram'
                errors={errors}
                setValue={setValue}
            />

            <SelectInput
                label='Loan Purpose'
                options={loanPurposeOptions}
                control={control}
                name='loanPurpose'
                errors={errors}
                setValue={setValue}
            />

            <div className='flex flex-col w-80'>
                <label htmlFor='borrowerName'>Term (Years)</label>
                <input
                className='border border-2 focus:outline-none focus:ring-0 focus:border-light-blue rounded py-1.5 px-2'
                {...register('term')}
                type='text'
                id='term'
                placeholder='Term'
                />
            </div>
            
            <Controller
                name='interestRate'
                control={control}
                defaultValue={0}
                render={({ field: { value, onChange } }) => (
                    <PercentageInput
                        label="Interest Rate"
                        value={value}
                        onChange={(onChange)}
                    />
                )}
            />

            <SelectInput
                label='Occupancy'
                options={occupancyOptions}
                control={control}
                name='occupancy'
                errors={errors}
                setValue={setValue}
            />

            <CheckboxRadio
                label='Escrows?'
                control={control}
                name="escrow"
                options={[
                    { label: 'Yes', value: 'yes' },
                    { label: 'No', value: 'no' },
                ]}
            />  
        </>
    )

}

export default LoanInfo;