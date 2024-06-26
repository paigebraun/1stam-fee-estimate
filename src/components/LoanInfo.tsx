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
                id={'loanProgram'}
                options={loanProgramOptions}
                control={control}
                name='loanProgram'
                errors={errors}
                defaultValue={'Conventional - Fixed'}
                setValue={setValue}
            />

            <SelectInput
                label='Loan Purpose'
                id={'loanPurpose'}
                options={loanPurposeOptions}
                control={control}
                name='loanPurpose'
                errors={errors}
                defaultValue={'Purchase'}
                setValue={setValue}
            />

            <div className='flex flex-col w-80'>
                <label htmlFor='term'>
                Term (Years)
                {errors.term && (
                    <span className="text-red-500">
                    * <span className="text-red-500 italic font-normal">(required)</span>
                    </span>
                )}
                </label>
                <Controller
                control={control}
                defaultValue={30}
                render={() => (
                    <input
                    className={`border border-2 focus:outline-none focus:ring-0 focus:border-light-blue rounded py-1.5 px-2`}
                    {...register('term')}
                    type='text'
                    id='term'
                    placeholder='Term'
                    inputMode='decimal'
                    />
                )}
                name='term'
                rules={{ required: true }}
                />
            </div>
            
            <Controller
                name='interestRate'
                control={control}
                defaultValue={0}
                render={({ field: { value, onChange } }) => (
                    <PercentageInput
                        label="Interest Rate"
                        id={'interestRate'}
                        value={value}
                        onChange={(onChange)}
                    />
                )}
            />

            <SelectInput
                label='Occupancy'
                id={'occupancy'}
                options={occupancyOptions}
                control={control}
                name='occupancy'
                errors={errors}
                defaultValue={'Primary Residence'}
                setValue={setValue}
            />

            <CheckboxRadio
                id={'Escrows?'}
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