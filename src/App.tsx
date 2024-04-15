import { PDFDocument, TextAlignment } from 'pdf-lib';
import { SubmitHandler, useForm } from 'react-hook-form';

import feeEstimate from './assets/1stAM Fee Estimate Template.pdf';
import Logo from './assets/1stAmLogo.png';

type FormFields = {
  loanOriginator: string;
  borrowerName: string;
}

function App() {
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await modifyPdf(data);
  }

  const modifyPdf = async (data: FormFields) => {
    const pdfFormUrl = feeEstimate;
    const formPdfBytes = await fetch(pdfFormUrl).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const pdfForm = pdfDoc.getForm();

    const applicantField = pdfForm.getTextField('Applicants Text Field');
    applicantField.setText(data.borrowerName);
    applicantField.setAlignment(TextAlignment.Right);
    applicantField.enableReadOnly;

    pdfForm.flatten();

    const pdfBytes = await pdfDoc.save();

    const docUrl = URL.createObjectURL(new Blob([pdfBytes], {type: 'application/pdf'}));

    window.open(docUrl, '_blank');
  }
  

  return (
    <>
    <div className='flex flex-col items-center'>
      <a href="/">
         <img src={Logo} className="w-60 px-4"></img>
      </a>
      <form className='flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-3 mb-6 md:grid-cols-2'>
          <div className='flex flex-col'>
            <label htmlFor='loanOriginator'>Loan Originator</label>
            <input className='border border-2 focus:outline-none focus:ring-0 focus:border-light-blue rounded py-1 px-2' {...register ("loanOriginator")} type="text" id='loanOriginator' placeholder="Loan Originator" />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='borrowerName'>Borrower Name(s)</label>
            <input className='border border-2 focus:outline-none focus:ring-0 focus:border-light-blue rounded py-1 px-2' {...register ("borrowerName")} type="text" id='borrowerName' placeholder="Borrower Name(s)" />
          </div>
        </div>
        <button type="submit" className='text-white bg-light-blue px-5 py-2.5 rounded w-full'>Create PDF</button>
      </form>
      </div>
    </>
  )
}

export default App;