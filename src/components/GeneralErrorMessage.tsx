import { FieldErrors } from 'react-hook-form';
import { FormFields } from '../utils/types';

const GeneralErrorMessage: React.FC<{ errors: FieldErrors<FormFields> }> = ({ errors }) => {
    const hasErrors = Object.keys(errors).length > 0;
  
    return (
      <>
        {hasErrors && (
          <div className="text-red-500 italic mb-2">
            Make sure all (*) required fields above are filled in.
          </div>
        )}
      </>
    );
};

export default GeneralErrorMessage;
