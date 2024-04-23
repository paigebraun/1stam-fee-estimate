import React, { useState, useEffect } from 'react';
import { PercentageInputProps } from '../utils/types';

const PercentageInput: React.FC<PercentageInputProps> = ({ value, onChange, label }) => {
    const [displayValue, setDisplayValue] = useState(value.toFixed(3));

    useEffect(() => {
        setDisplayValue(value.toFixed(3));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;

        inputValue = inputValue.replace(/\D/g, '');

        const numericValue = parseFloat(inputValue || '0') / 1000;

        setDisplayValue(numericValue.toFixed(3));
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
                    <p>%</p>
                </div>
                <input
                    className='border border-2 focus:outline-none focus:ring-0 focus:border-light-blue rounded py-1.5 px-2 pl-8 w-80'
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

export default PercentageInput;