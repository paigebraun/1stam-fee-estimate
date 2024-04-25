import { Controller } from 'react-hook-form';
import Select from 'react-select';

import { Selection, Originators, SelectInputProps } from '../utils/types';

const SelectInput = ({ label, options, control, name, errors, setValue, defaultValue }: SelectInputProps) => {
  return (
    <div className='flex flex-col w-80'>
      <label htmlFor={name}>
        {label}
        {errors[name] && (
          <span className="text-red-500">
            * <span className="text-red-500 italic font-normal">(required)</span>
          </span>
        )}
      </label>
      <Controller
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Select
            id={name}
            value={options.find(option => option.value === value)} // Find the option matching the value
            styles={{
              control: (base, state) => ({
                ...base,
                border: state.isFocused ? '2px solid #0073BB' : '2px solid #e5e7eb',
                boxShadow: 'none',
                '&:hover': 'none',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? '#0073BB' : provided.backgroundColor,
              }),
            }}
            placeholder={<div className='text-gray-40'>Select...</div>}
            options={options}
            onChange={(selectedOption: Selection | Originators | null) => {
              if (selectedOption) {
                onChange(selectedOption.value);
                setValue(name, selectedOption.value);
              }
            }}
          />
        )}
        name={name}
        rules={{ required: true }}
      />
    </div>
  );
};

export default SelectInput;