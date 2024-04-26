import { Controller } from 'react-hook-form';
import CurrencyInput from './CurrencyInput';
import PercentageInput from './PercentageInput';
import { MyFormProps } from '../utils/types';

function DiscountCredits({ control, setValue, salesPrice, downPaymentCash }: MyFormProps & { salesPrice: number, downPaymentCash: number }) {
    // Recalculate discount points cash when discount points percent changes
    const handleDiscountPercentChange = (newValue: number) => {
        const newDiscountPointsCash = (salesPrice - downPaymentCash) * (newValue / 100);
        setValue('discountPointsCash', newDiscountPointsCash);
    };

    return (
        <>
            <Controller
                name='discountPointsPercent'
                control={control}
                defaultValue={0}
                render={({ field: { value, onChange } }) => (
                    <PercentageInput
                        label="Discount Points (%)"
                        id={'discountPointsPercent'}
                        value={value}
                        onChange={(newValue) => {
                            onChange(newValue);
                            handleDiscountPercentChange(newValue);
                        }}
                    />
                )}
            />
            <Controller
                name='discountPointsCash'
                control={control}
                defaultValue={0}
                render={({ field: { value } }) => (
                    <CurrencyInput label="Discount Points ($)" id={'discountPointsCash'} value={value} readOnly={true} />
                )}
            />
             <Controller
                name='sellerCredit'
                control={control}
                defaultValue={0}
                render={({ field: { value, onChange } }) => (
                    <CurrencyInput label="Seller Credit" id={'sellerCredit'} value={value} onChange={onChange} />
                )}
            /> 
             <Controller
                name='earnestMoney'
                control={control}
                defaultValue={0}
                render={({ field: { value, onChange } }) => (
                    <CurrencyInput label="Earnest Money" id={'earnestMoney'} value={value} onChange={onChange} />
                )}
            /> 
        </>

    );
}

export default DiscountCredits;