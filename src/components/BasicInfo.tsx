import { MyFormProps, Originators, Selection } from '../utils/types';
import SelectInput from './SelectInput';

function BasicInfo({ control, errors, setValue, register }: MyFormProps) {

  const originatorOptions: Originators[] = [
    { label: 'Jennifer Wolf', value: { name: 'Jennifer Wolf', NMLS: '118652', phone: '(979) 694-1001' } },
    { label: 'Gayle Lyons', value: { name: 'Gayle Lyons', NMLS: '227509', phone: '(979) 694-1002' } },
    { label: 'Courtney Resendiz', value: { name: 'Courtney Resendiz', NMLS: '1417828', phone: '(956) 535-2947' } }
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
        options={originatorOptions}
        control={control}
        name='loanOriginator'
        errors={errors}
        setValue={setValue}
      />
      
      <div className='flex flex-col w-80'>
        <label htmlFor='borrowerName'>Borrower Name(s)</label>
        <input
          className='border border-2 focus:outline-none focus:ring-0 focus:border-light-blue rounded py-1.5 px-2'
          {...register('borrowerName')}
          type='text'
          id='borrowerName'
          placeholder='Borrower Name(s)'
        />
      </div>

      <SelectInput
        label='Credit Score'
        options={creditOptions}
        control={control}
        name='creditScore'
        errors={errors}
        setValue={setValue}
      />
    </>
  );
}

export default BasicInfo;