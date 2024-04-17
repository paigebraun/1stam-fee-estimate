import SelectInput from './SelectInput';
import { Selection, MyFormProps } from '../utils/types';

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

            <SelectInput
                label='Occupancy'
                options={occupancyOptions}
                control={control}
                name='occupancy'
                errors={errors}
                setValue={setValue}
            />
        </>
    )

}

export default LoanInfo;