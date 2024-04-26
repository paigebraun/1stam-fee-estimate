import { Controller } from 'react-hook-form';

import { MyFormProps } from '../utils/types';
import PercentageInput from './PercentageInput';

function Custom({ control }: MyFormProps) {
    return(
        <>
            <p className='mt-4 mb-3 w-full'>If applicable, MI defaults to MGIC's Borrower-Paid Mortgage Insurance Monthly Premiums for 
                amortiziation term {'>'} 20 years and fixed rate. If you want to use a custom MI rate, enter the rate as a percent here:</p>
            <Controller
                name='customMIRate'
                control={control}
                defaultValue={0}
                render={({ field: { value, onChange } }) => (
                    <PercentageInput label='' id={'customMIRate'} value={value} onChange={onChange} />
                )}
            />
            <p className='mt-4 mb-3 w-full'>Prepaid interest defaults to 5 days. If you want to use a custom number, enter the number of days here:</p>
            <Controller
                name='customPrepaidInterest'
                control={control}
                defaultValue={0}
                render={({ field: { value, onChange } }) => (
                    <PercentageInput label='' id={'customPrepaidInterest'} value={value} onChange={onChange} />
                )}
            />
        </>
    )
}

export default Custom;