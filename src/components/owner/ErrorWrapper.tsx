import { ErrorMessage } from "formik";

export const ErrorMessageWrapper = ({ name }: { name: string }) => (
    <ErrorMessage name={name}>
        {(msg: any) => (
            <div className="text-red-500 text-sm">
                {typeof msg === 'string' ? msg : 'Invalid image format'}
            </div>
        )}
    </ErrorMessage>
);
export const SUPPORTED_IMAGE_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'] as const;