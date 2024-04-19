import { SubmitHandler, useForm } from 'react-hook-form';

import Logo from './assets/1stAmLogo.png';

import { modifyPdf } from './utils/pdfUtils';
import BasicInfo from './components/BasicInfo';
import LoanInfo from './components/LoanInfo';
import ClosingCosts from './components/ClosingCosts';
import Settlement from './components/Settlement';
import Additional from './components/Additional';

import { FormFields } from './utils/types';
import Government from './components/Government';

function App() {
  const { control, handleSubmit, formState: { errors }, setValue, register } = useForm<FormFields>();

  //Get current date for prep date field
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = `${month}/${date}/${year}`;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await modifyPdf(data, currentDate);
  };

  return (
    <div className='flex flex-col items-center'>
      <a href='/'>
        <img src={Logo} className='w-60 px-4' alt='Logo'></img>
      </a>
      <form className='flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-3 mb-6 md:grid-cols-2'>
          <BasicInfo
            control={control}
            errors={errors}
            setValue={setValue}
            register={register}
          />
          <LoanInfo
            control={control}
            errors={errors}
            setValue={setValue}
            register={register}
          />
        </div>
        <div className='grid gap-3 mb-6 md:grid-cols-2'>
          <h3 className='font-bold'>Mortgage Closing Costs</h3>
          <div></div>
          <ClosingCosts
            control={control}
            errors={errors}
            setValue={setValue}
            register={register}
          />
        </div>
        <div className='grid gap-3 mb-6 md:grid-cols-2'>
          <h3 className='font-bold'>Settlement / Title Co. Charges</h3>
          <div></div>
          <Settlement
            control={control}
            errors={errors}
            setValue={setValue}
            register={register}
          />
        </div>
        <div className='grid gap-3 mb-6 md:grid-cols-2'>
          <h3 className='font-bold'>Additional Settlement Charges</h3>
          <div></div>
          <Additional
            control={control}
            errors={errors}
            setValue={setValue}
            register={register}
          />
        </div>
        <div className='self-start mb-6'>
          <h3 className='font-bold mb-3'>Government Recording & Transfer</h3>
          <div></div>
          <Government
            control={control}
            errors={errors}
            setValue={setValue}
            register={register}
          />
        </div>
        <button type='submit' className='text-white bg-light-blue px-5 py-2.5 rounded w-full'>
          Create PDF
        </button>
      </form>
    </div>
  );
}

export default App;