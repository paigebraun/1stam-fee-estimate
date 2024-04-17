import { Controller } from 'react-hook-form';
import Select from 'react-select';

import { Selection, Originators, SelectInputProps } from '../utils/types';

const SelectInput = ({ label, options, control, name, errors, setValue }: SelectInputProps) => {
  return (
    <div className='flex flex-col w-80'>
      <p>{label}</p>
      <Controller
        control={control}
        render={({ field: { onChange } }) => (
          <Select
            styles={{
              control: (base, state) => ({
                ...base,
                border: state.isFocused ? '2px solid #0073BB' : '2.5px solid #e5e7eb',
                boxShadow: 'none',
                '&:hover': 'none',
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
      {errors[name]?.type && <p>Error: {errors[name]?.type}</p>}
    </div>
  );
};

export default SelectInput;