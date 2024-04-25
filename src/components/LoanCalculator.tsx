import { useState } from 'react';
import { Controller } from 'react-hook-form';
import CurrencyInput from './CurrencyInput';
import PercentageInput from './PercentageInput';
import { MyFormProps } from '../utils/types';

function LoanCalculator({ control, setValue, watch }: MyFormProps) {

    const [initialInput, setInitialInput] = useState<'salesPrice' | 'loanAmount' | null>(null);

    const handleSalesPriceChange = (newValue: number) => {
        const downPaymentPercent = watch('downPaymentPercent') || 20;
        const downPaymentCash = (newValue * downPaymentPercent) / 100;
        const loanAmount = newValue - downPaymentCash;
        setValue('downPaymentCash', downPaymentCash);
        setValue('loanAmount', loanAmount);
        setInitialInput('salesPrice');
    };

    const handleLoanAmountChange = (newValue: number) => {
        const downPaymentPercent = watch('downPaymentPercent') || 10;
        const downPaymentCash = (newValue * downPaymentPercent) / 100;
        const salesPrice = newValue + downPaymentCash;
        setValue('downPaymentCash', downPaymentCash);
        setValue('salesPrice', salesPrice);
        setInitialInput('loanAmount');
    };

    const handleDownPaymentCashChange = (newValue: number) => {
        const salesPrice = watch('salesPrice') || 0;
        const downPaymentPercent = (newValue / salesPrice) * 100;
        setValue('downPaymentPercent', downPaymentPercent);
        setValue('downPaymentCash', newValue);
        if (initialInput === 'salesPrice') {
            handleSalesPriceChange(salesPrice);
        } else if (initialInput === 'loanAmount') {
            const loanAmount = watch('loanAmount') || 0;
            handleLoanAmountChange(loanAmount);
        }
    };

    return (
        <>
            <Controller
                name='salesPrice'
                control={control}
                defaultValue={0}
                render={({ field: { value, onChange } }) => (
                    <CurrencyInput
                        label="Sales Price"
                        value={value}
                        onChange={(newValue) => {
                            onChange(newValue);
                            handleSalesPriceChange(newValue);
                        }}
                    />
                )}
            />
            <Controller
                name='downPaymentPercent'
                control={control}
                defaultValue={20}
                render={({ field: { value, onChange } }) => (
                    <PercentageInput
                        label="Down Payment (%)"
                        value={value}
                        onChange={(newValue) => {
                            onChange(newValue);
                            if (initialInput === 'salesPrice') {
                                const salesPrice = watch('salesPrice') || 0;
                                handleSalesPriceChange(salesPrice);
                            } else if (initialInput === 'loanAmount') {
                                const loanAmount = watch('loanAmount') || 0;
                                handleLoanAmountChange(loanAmount);
                            }
                        }}
                    />
                )}
            />
            <Controller
                name='downPaymentCash'
                control={control}
                defaultValue={0}
                render={({ field: { value, onChange } }) => (
                    <CurrencyInput
                        label="Down Payment ($)"
                        value={value}
                        onChange={(newValue) => {
                            onChange(newValue);
                            handleDownPaymentCashChange(newValue);
                        }}
                    />
                )}
            />
            <Controller
                name='loanAmount'
                control={control}
                defaultValue={0}
                render={({ field: { value, onChange } }) => (
                    <CurrencyInput
                        label="Loan Amount"
                        value={value}
                        onChange={(newValue) => {
                            onChange(newValue);
                            handleLoanAmountChange(newValue);
                        }}
                    />
                )}
            />
        </>
    );
}

export default LoanCalculator;