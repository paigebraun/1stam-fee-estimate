import { PDFDocument, TextAlignment } from 'pdf-lib';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';

import feeEstimate from './assets/1stAM Fee Estimate Template.pdf';
import Logo from './assets/1stAmLogo.png';

type FormFields = {
  loanOriginator: {name: string, NMLS: string, phone: string};
  borrowerName: string;
  creditScore: string;
}

type Originators = {
  label: string;
    value: {
        name: string;
        NMLS: string;
        phone: string;
    };
}

type Scores = {
  label: string;
  value: string;
}

function App() {
  const { register, handleSubmit, control, formState: {errors} } = useForm<FormFields>();

  const originatorOptions: Originators[] = [
    {label: 'Jennifer Wolf', value: {name: 'Jennifer Wolf', NMLS: '118652', phone: '(979) 694-1001'}},
    {label: 'Gayle Lyons', value: {name: 'Gayle Lyons', NMLS: '227509', phone: '(979) 694-1002'}},
    {label: 'Courtney Resendiz', value: {name: 'Courtney Resendiz', NMLS: '1417828', phone: '(956) 535-2947'}}
  ]

  const creditOptions: Scores[] = [
    {label: '760+', value: '760+'},
    {label: '740-759', value: '740-759'},
    {label: '720-739', value: '720-739'},
    {label: '700-719', value: '700-719'},
    {label: '680-699', value: '680-699'},
    {label: '660-679', value: '660-679'},
    {label: '640-659', value: '640-659'},
    {label: '620-639', value: '620-639'}
  ]

  const today = new Date();
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const date = today. getDate();
  const currentDate = month + "/" + date + "/" + year;

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
            <p>Loan Originator</p>
            <Controller
              control={control}
              render={({ field: { onChange, value, name } }) => {
                const currentSelection = originatorOptions.find(
                  (c) => c.value === value
                );

                const handleSelectChange = (selectedOption: Originators | null) => {
                  onChange(selectedOption?.value);
                };

                return (
                  <Select
                  styles={{
                    control: (base, state) => ({
                        ...base,
                        border: state.isFocused ? "2px solid #0073BB" : "2px solid lightgrey",
                        boxShadow: 'none',
                        "&:hover": "none",
                    }),
                    }}
                    value={currentSelection}
                    name={name}
                    options={originatorOptions}
                    onChange={handleSelectChange}
                  />
                );
              }}
              name="loanOriginator"
              rules={{
                required: true
              }}
            />
            {errors?.loanOriginator?.type && <p>Error: {errors.loanOriginator.type}</p>}
          </div>
          
          
          <div className='flex flex-col'>
            <label htmlFor='borrowerName'>Borrower Name(s)</label>
            <input className='border border-2 focus:outline-none focus:ring-0 focus:border-light-blue rounded py-1.5 px-2' {...register ("borrowerName")} type="text" id='borrowerName' placeholder="Borrower Name(s)" />
          </div>

          <div className='flex flex-col'>
            <p>Credit Score</p>
            <Controller
              control={control}
              render={({ field: { onChange, value, name } }) => {
                const currentSelection = creditOptions.find(
                  (c) => c.value === value
                );

                const handleSelectChange = (selectedOption: Scores | null) => {
                  onChange(selectedOption?.value);
                };

                return (
                  <Select
                  styles={{
                    control: (base, state) => ({
                        ...base,
                        border: state.isFocused ? "2px solid #0073BB" : "2px solid lightgrey",
                        boxShadow: 'none',
                        "&:hover": "none",
                    }),
                    }}
                    value={currentSelection}
                    name={name}
                    options={creditOptions}
                    onChange={handleSelectChange}
                  />
                );
              }}
              name="creditScore"
              rules={{
                required: true
              }}
            />
            {errors?.creditScore?.type && <p>Error: {errors.creditScore.type}</p>}
          </div>

        </div>
        <button type="submit" className='text-white bg-light-blue px-5 py-2.5 rounded w-full'>Create PDF</button>
      </form>
      </div>
    </>
  )
}

export default App;