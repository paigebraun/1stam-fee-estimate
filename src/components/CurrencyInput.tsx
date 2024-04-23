import React, { useState, useEffect } from 'react';
import { CurrencyInputProps } from '../utils/types';

const CurrencyInput: React.FC<CurrencyInputProps> = ({ value, onChange, label }) => {
    const [displayValue, setDisplayValue] = useState(value.toFixed(2));

    useEffect(() => {
        setDisplayValue(value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
    
        inputValue = inputValue.replace(/\D/g, '');
    
        const numericValue = parseFloat(inputValue || '0') / 100;

        const displayValue = numericValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    
        setDisplayValue(displayValue);
        onChange(numericValue);
    };    

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const key = e.key;
        if (!/[\d.]/.test(key) && key !== 'Backspace' && key !== 'Tab') {
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
                    tabIndex={0}
                />
            </div>
        </div>
    );
};

export default CurrencyInput;