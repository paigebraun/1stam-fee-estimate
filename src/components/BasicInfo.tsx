import { Controller } from 'react-hook-form';
import Select from 'react-select';

type Originators = {
  label: string;
  value: {
    name: string;
    NMLS: string;
    phone: string;
  };
};

type Scores = {
  label: string;
  value: string;
};

interface BasicInfoProps {
    control: any;
    errors: any;
    setValue: any;
    register: any;
};

function BasicInfo({ control, errors, setValue, register }: BasicInfoProps) {

  const originatorOptions: Originators[] = [
    { label: 'Jennifer Wolf', value: { name: 'Jennifer Wolf', NMLS: '118652', phone: '(979) 694-1001' } },
    { label: 'Gayle Lyons', value: { name: 'Gayle Lyons', NMLS: '227509', phone: '(979) 694-1002' } },
    { label: 'Courtney Resendiz', value: { name: 'Courtney Resendiz', NMLS: '1417828', phone: '(956) 535-2947' } }
  ];

  const creditOptions: Scores[] = [
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
        <div className='flex flex-col w-80'>
            <p>Loan Originator</p>
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
                <Select
                styles={{
                    control: (base, state) => ({
                    ...base,
                    border: state.isFocused ? "2px solid #0073BB" : "2px solid lightgrey",
                    boxShadow: 'none',
                    "&:hover": "none",
                    }),
                }}
                options={originatorOptions}
                onChange={(selectedOption: Originators | null) => {
                    if (selectedOption?.value) {
                    onChange(selectedOption.value);
                    setValue('loanOriginator', selectedOption.value);
                    }
                }}
                />
            )}
            name="loanOriginator"
            rules={{ required: true }}
            />
            {errors?.loanOriginator?.type && <p>Error: {errors.loanOriginator.type}</p>}
        </div>

        <div className='flex flex-col w-80'>
            <label htmlFor='borrowerName'>Borrower Name(s)</label>
            <input
            className='border border-2 focus:outline-none focus:ring-0 focus:border-light-blue rounded py-1.5 px-2'
            {...register("borrowerName")}
            type="text"
            id='borrowerName'
            placeholder="Borrower Name(s)"
            />
        </div>

        <div className='flex flex-col w-80'>
            <p>Credit Score</p>
            <Controller
            control={control}
            render={({ field: { onChange } }) => (
                <Select
                styles={{
                    control: (base, state) => ({
                    ...base,
                    border: state.isFocused ? "2px solid #0073BB" : "2px solid lightgrey",
                    boxShadow: 'none',
                    "&:hover": "none",
                    }),
                }}
                options={creditOptions}
                onChange={(selectedOption: Scores | null) => {
                    onChange(selectedOption?.value);
                }}
                />
            )}
            name="creditScore"
            rules={{ required: true }}
            />
            {errors?.creditScore?.type && <p>Error: {errors.creditScore.type}</p>}
        </div>
    </>
  )
}

export default BasicInfo;