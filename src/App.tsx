import { SubmitHandler, useForm } from 'react-hook-form';
import { motion } from "framer-motion"

import Logo from './assets/1stAmLogo.png';

import { modifyPdf } from './utils/pdfUtils';
import BasicInfo from './components/BasicInfo';
import LoanInfo from './components/LoanInfo';
import ClosingCosts from './components/ClosingCosts';
import Settlement from './components/Settlement';
import Additional from './components/Additional';

import { FormFields } from './utils/types';
import Government from './components/Government';
import LoanCalculator from './components/LoanCalculator';
import Annuals from './components/Annuals';
import DiscountCredits from './components/DiscountCredits';
import Custom from './components/Custom';
import GeneralErrorMessage from './components/GeneralErrorMessage';
import ScrollToTopButton from './components/ScrollToTop';

function App() {
  const { control, handleSubmit, formState: { errors }, setValue, register, watch } = useForm<FormFields>();

  //Get current date for prep date field
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = `${month}/${date}/${year}`;

  // Calculate sales price and down payment cash
  const salesPrice = watch('salesPrice') || 0;
  const downPaymentCash = watch('downPaymentCash') || 0;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await modifyPdf(data, currentDate);
  };

  return (
    <div className='flex flex-col items-center'>
      <ScrollToTopButton />
      <a href='/' onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>
        <img src={Logo} className='w-60 px-4' alt='Logo'></img>
      </a>
      <form className='flex flex-col max-w-80 md:max-w-2xl mb-20' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-3 mb-6 md:grid-cols-2'>
          <BasicInfo
            control={control}
            errors={errors}
            setValue={setValue}
            register={register}
            watch={watch}
          />
          <LoanInfo
            control={control}
            errors={errors}
            setValue={setValue}
            register={register}
            watch={watch}
          />
        </div>
        <div className='grid gap-3 mb-6 md:grid-cols-2'>
          <LoanCalculator
              control={control}
              errors={errors}
              setValue={setValue}
              register={register}
              watch={watch}
            />
        </div>
        <div className='grid gap-3 mb-6 md:grid-cols-2'>
          <Annuals
              control={control}
              salesPrice={salesPrice}
              errors={errors}
              setValue={setValue}
              register={register}
              watch={watch}
            />
        </div>
        <div className='grid gap-3 mb-6 md:grid-cols-2'>
          <DiscountCredits
            control={control}
            salesPrice={salesPrice}
            downPaymentCash={downPaymentCash}
            errors={errors}
            setValue={setValue}
            register={register}
            watch={watch}
          />
        </div>
        <div className='mb-6'>
          <Custom
            control={control}
            errors={errors}
            setValue={setValue}
            register={register}
            watch={watch}
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
            watch={watch}
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
            watch={watch}
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
            watch={watch}
          />
        </div>
        <h3 className='font-bold mb-3'>Government Recording & Transfer</h3>
        <div className='mb-6'>
          <Government
            control={control}
            errors={errors}
            setValue={setValue}
            register={register}
            watch={watch}
          />
        </div>
        <GeneralErrorMessage errors={errors} />
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.9 }} type='submit' className='text-white bg-light-blue px-5 py-2.5 rounded w-full'>
          Create PDF
        </motion.button>
      </form>
    </div>
  );
}

export default App;