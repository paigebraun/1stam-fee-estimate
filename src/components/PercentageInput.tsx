import React, { useState, useEffect } from 'react';
import { CurrencyInputProps } from '../utils/types';

const PercentageInput: React.FC<CurrencyInputProps> = ({ label, id, value, onChange, readOnly }) => {
    const [displayValue, setDisplayValue] = useState(formatValue(value));
    const [internalValue, setInternalValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!isEditing) {
            setInternalValue(value);
            setDisplayValue(formatValue(value));
        }
    }, [value, isEditing]);

    function formatValue(val: number | string): string {
        return parseFloat(val.toString()).toLocaleString('en-US', {
            minimumFractionDigits: 3
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (readOnly) return;
        const inputValue = e.target.value;
        setDisplayValue(inputValue);
        const newValue = inputValue ? parseFloat(inputValue.replace(/[^0-9.-]/g, '')) : 0;
        setInternalValue(newValue);
        if (onChange) onChange(newValue);
    };

    const handleBlur = () => {
        setIsEditing(false);
        setDisplayValue(formatValue(internalValue));
    };

    const handleClick = () => {
        setIsEditing(true);
        setDisplayValue(internalValue.toString());
    };

    return (
        <div className='flex flex-col'>
            <label htmlFor={id}>{label}</label>
            <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400 pointer-events-none text-xl'>
                    <p>%</p>
                </div>
                <input
                    id={id}
                    className={`border border-2 focus:outline-none focus:ring-0 focus:border-light-blue rounded py-1.5 px-2 pl-8 w-80 ${readOnly ? 'bg-gray-200 border-gray-400 pointer-events-none focus:border-gray-400' : ''}`}
                    type='text'
                    value={displayValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onClick={handleClick}
                    readOnly={readOnly}
                />
            </div>
        </div>
    );
};

export default PercentageInput;
