import { CurrencyInputProps } from '../utils/types';

import React, { useState } from 'react';

const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onChange, label }) => {
    const [displayValue, setDisplayValue] = useState(value.toFixed(2));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;

        // Remove non-digit characters
        inputValue = inputValue.replace(/\D/g, '');

        // Convert to number and divide by 100 to represent cents
        const numericValue = parseInt(inputValue || '0', 10) / 100;

        setDisplayValue(numericValue.toFixed(2));

        onChange(numericValue);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const key = e.key;
        // Allow digits, decimal point, and backspace
        if (!/[\d.]/.test(key) && key !== 'Backspace') {
            e.preventDefault();
        }
    };

    return (
        <div className='flex flex-col'>
            <p>{label}</p>
            <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400 pointer-events-none text-xl'>
                    <p>$</p>
                </div>
                <input
                    className='border border-2 focus:outline-none focus:ring-0 focus:border-light-blue rounded py-1.5 px-2 pl-6 w-80'
                    type='text'
                    value={displayValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                />
            </div>
        </div>
    );
};

export default CurrencyInput;