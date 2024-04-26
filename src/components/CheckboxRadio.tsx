import { CheckboxRadioProps } from "../utils/types";
import { useController } from 'react-hook-form';

const CheckboxRadio: React.FC<CheckboxRadioProps> = ({ control, name, options, label }) => {
    const {
      field: { onChange, value },
    } = useController({
      name,
      control,
      defaultValue: options[0].value,
    });
  
    const handleRadioChange = (optionValue: string) => {
        onChange(optionValue);
    };

    return (
        <div className='flex flex-col'>
          <p>{label}</p>
          <div className='flex gap-3 mt-2'>
          {options.map((option) => (
            <label key={option.value} htmlFor={option.label} className="flex items-center">
              <input
                id={option.label}
                type="radio"
                name={name as string}
                value={option.value}
                onChange={() => handleRadioChange(option.value)}
                checked={value === option.value}
                className="hidden" // Hide the default radio button
              />
              <span
                className={`inline-block w-6 h-6 border-2 border-light-blue rounded ${value === option.value ? 'bg-light-blue text-white' : ''}`}
                style={{ marginRight: '0.5rem', cursor: 'pointer', position: 'relative' }}
              >
                {value === option.value && (
                  <svg className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeWidth="3" d="M5 12l5 5 9-9" />
                  </svg>
                )}
              </span>
              <span className="text-lg">{option.label}</span>
            </label>
          ))}
          </div>
        </div>
      );
};

export default CheckboxRadio;