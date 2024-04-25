import React, { useState, useEffect } from 'react';
import { CurrencyInputProps } from '../utils/types';

const PercentageInput: React.FC<CurrencyInputProps> = ({ label, value, onChange }) => {
    const [displayValue, setDisplayValue] = useState(formatValue(value));
    const [prevValue, setPrevValue] = useState(displayValue);

    useEffect(() => {
        setDisplayValue(formatValue(value));
    }, [value]);

    function formatValue(val: number): string {
        if (val === 0) return '0'; // Initialize as empty if value is zero
        return val.toLocaleString('en-US', { minimumFractionDigits: 3 });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;

        // Remove non-numeric characters except for the last period
        inputValue = inputValue.replace(/[^\d.]/g, '');

        // Remove leading zeros
        inputValue = inputValue.replace(/^0+/,'');

        setDisplayValue(inputValue);
    };

    const handleBlur = () => {
        // Remove trailing zeros
        let formattedValue = parseFloat(displayValue.replace(/,/g, '')).toFixed(2);
        setDisplayValue(formatValue(parseFloat(formattedValue)));
        setPrevValue(displayValue);
        if (onChange && formattedValue !== prevValue.replace(/,/g, '')) {
            onChange(parseFloat(formattedValue));
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
                    className={`border border-2 focus:outline-none focus:ring-0 focus:border-light-blue rounded py-1.5 px-2 pl-8 w-80`}
                    type='text'
                    value={displayValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>
        </div>
    );
};

export default PercentageInput;
