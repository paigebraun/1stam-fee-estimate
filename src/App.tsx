import { PDFDocument, TextAlignment } from 'pdf-lib';
import { SubmitHandler, useForm } from 'react-hook-form';

import feeEstimate from './assets/1stAM Fee Estimate Template.pdf';
import Logo from './assets/1stAmLogo.png';

import BasicInfo from './components/BasicInfo';

type FormFields = {
  loanOriginator: { name: string; NMLS: string; phone: string };
  borrowerName: string;
  creditScore: string;
};

function App() {
  const { control, handleSubmit, formState: { errors }, setValue, register } = useForm<FormFields>();

  //Get current date for prep date field
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = `${month}/${date}/${year}`;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await modifyPdf(data);
  };

  //Modify text fields on PDF template using input from form
  const modifyPdf = async (data: FormFields) => {
    const pdfFormUrl = feeEstimate;
    const formPdfBytes = await fetch(pdfFormUrl).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const pdfForm = pdfDoc.getForm();

    const applicantField = pdfForm.getTextField('Applicants Text Field');
    applicantField.setText(data.borrowerName);
    applicantField.setAlignment(TextAlignment.Right);

    const loanOriginatorField = pdfForm.getTextField('Loan Originator Text Field');
    loanOriginatorField.setText(data.loanOriginator.name);
    loanOriginatorField.setAlignment(TextAlignment.Right);

    const nmlsField = pdfForm.getTextField('NMLS ID Text Field');
    nmlsField.setText(data.loanOriginator.NMLS);
    nmlsField.setAlignment(TextAlignment.Right);

    const phoneField = pdfForm.getTextField('Phone Text Field');
    phoneField.setText(data.loanOriginator.phone);
    phoneField.setAlignment(TextAlignment.Right);

    const creditScoreField = pdfForm.getTextField('Credit Score Text Field');
    creditScoreField.setText(data.creditScore);
    creditScoreField.setAlignment(TextAlignment.Right);

    const prepDate = pdfForm.getTextField('Preparation Date Text Field');
    prepDate.setText(currentDate);
    prepDate.setAlignment(TextAlignment.Right);

    pdfForm.flatten();

    const pdfBytes = await pdfDoc.save();

    const docUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));

    window.open(docUrl, '_blank');
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
        </div>
        <button type='submit' className='text-white bg-light-blue px-5 py-2.5 rounded w-full'>
          Create PDF
        </button>
      </form>
    </div>
  );
}

export default App;