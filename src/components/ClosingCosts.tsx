import { Controller } from 'react-hook-form';

import { MyFormProps } from '../utils/types';
import CurrencyInput from './CurrencyInput';

function ClosingCosts({ control }: MyFormProps) {
    return (
        <>
            <Controller
                name='processingFee'
                control={control}
                defaultValue={795}
                render={({ field: { value, onChange } }) => (
                    <CurrencyInput label='Processing Fee' id={'processingFee'} value={value} onChange={onChange} />
                )}
            />

            <Controller
                name='underwritingFee'
                control={control}
                defaultValue={995}
                render={({ field: { value, onChange } }) => (
                    <CurrencyInput label='Underwriting Fee' id={'underwritingFee'} value={value} onChange={onChange} />
                )}
            />

            <Controller
                name='voeFee'
                control={control}
                defaultValue={150}
                render={({ field: { value, onChange } }) => (
                    <CurrencyInput label='Verification of Employment Fee' id={'voeFee'} value={value} onChange={onChange} />
                )}
            />

            <Controller
                name='appraisal'
                control={control}
                defaultValue={650}
                render={({ field: { value, onChange } }) => (
                    <CurrencyInput label='Appraisal' value={value} id={'appraisal'} onChange={onChange} />
                )}
            />

            <Controller
                name='floodCertificate'
                control={control}
                defaultValue={17.50}
                render={({ field: { value, onChange } }) => (
                    <CurrencyInput label='Flood Certificate' id={'floodCertificate'} value={value} onChange={onChange} />
                )}
            />    

            <Controller
                name='creditReport'
                control={control}
                defaultValue={175}
                render={({ field: { value, onChange } }) => (
                    <CurrencyInput label='Credit Report' id={'creditReport'} value={value} onChange={onChange} />
                )}
            />

            <Controller
                name='attorneyDocPrep'
                control={control}
                defaultValue={300}
                render={({ field: { value, onChange } }) => (
                    <CurrencyInput label='Attorney Document Preparation' id={'attorneyDocPrep'} value={value} onChange={onChange} />
                )}
            />       
        </>
    )
}

export default ClosingCosts;