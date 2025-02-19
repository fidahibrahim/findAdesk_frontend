import { changePassword } from '@/services/api/user';
import handleError from '@/utils/errorHandler';
import { changePassSchema } from '@/validation/formValidation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export interface changePass {
    password: string
}

const ChangePassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()

    const handleSubmit = async (values: changePass) => {
        try {
            const response = await changePassword(token, values.password)
            if(response.status === 200){
                toast.success("Password Updated Successfully!")
                setTimeout(() => navigate("/login"), 2000);
            }

        } catch (error) {
            handleError(error)
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center px-4">
                    <div className="mb-6 justify-center">
                        <img
                            src="/user/logo.png"
                            alt="Logo"
                            className="h-10"
                        />
                    </div>
                    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                        <Formik
                            initialValues={{
                                password: '',
                                confirmPassword: '',
                            }}
                            validationSchema={changePassSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            New Password
                                        </label>
                                        <Field
                                            name="password"
                                            type="password"
                                            placeholder='Enter New Password'
                                            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400"
                                            required
                                        />
                                        <div className='h2'>
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Confirm Password
                                        </label>
                                        <Field
                                            name="confirmPassword"
                                            type="password"
                                            placeholder='Confirm the Password'
                                            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400"
                                            required
                                        />
                                        <div className='h-2'>
                                            <ErrorMessage
                                                name="confirmPassword"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3 bg-[#2A2359] text-white rounded-sm hover:bg-[#1F1A45] transition-colors"
                                    >
                                        Submit
                                    </button>
                                </Form>
                            )}

                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword
