import { MyFormProps, Selection } from '../utils/types';
import SelectInput from './SelectInput';
import { Controller } from 'react-hook-form';

function BasicInfo({ control, errors, setValue, register }: MyFormProps) {

  const originatorOptions: Selection[] = [
    { label: 'Jennifer Wolf', value: 'Jennifer Wolf' },
    { label: 'Gayle Lyons', value: 'Gayle Lyons' },
    { label: 'Courtney Resendiz', value: 'Courtney Resendiz' }
  ];

  const creditOptions: Selection[] = [
    { label: '760+', value: '760+' },
    { label: '740-759', value: '740-759' },
    { label: '720-739', value: '720-739' },
    { label: '700-719', value: '700-719' },
    { label: '680-699', value: '680-699' },
    { label: '660-679', value: '660-679' },
    { label: '640-659', value: '640-659' },
    { label: '620-639', value: '620-639' }
  ];

  return (
    <>
      <SelectInput
        label='Loan Originator'
        id={'loanOriginator'}
        options={originatorOptions}
        control={control}
        name='loanOriginator'
        errors={errors}
        setValue={setValue}
      />
      
      <div className='flex flex-col w-80'>
        <label htmlFor='borrowerName'>
          Borrower Name(s)
          {errors.borrowerName && (
            <span className="text-red-500">
              * <span className="text-red-500 italic font-normal">(required)</span>
            </span>
          )}
        </label>
        <Controller
          control={control}
          render={() => (
            <input
              className={`border border-2 focus:outline-none focus:ring-0 focus:border-light-blue rounded py-1.5 px-2`}
              {...register('borrowerName')}
              type='text'
              id='borrowerName'
              placeholder='Borrower Name(s)'
            />
          )}
          name='borrowerName'
          rules={{ required: true }}
        />
      </div>

      <SelectInput
        label='Credit Score'
        id={'creditScore'}
        options={creditOptions}
        control={control}
        name='creditScore'
        errors={errors}
        defaultValue={'760+'}
        setValue={setValue}
      />
    </>
  );
}

export default BasicInfo;