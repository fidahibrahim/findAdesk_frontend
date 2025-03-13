import { ErrorMessage, Field, Form, Formik } from 'formik'
import Layout from './Sidebar'
import { Card, CardContent } from '@mui/material'
import { resetPassSchema } from '@/validation/formValidation'
import handleError from '@/utils/errorHandler'
import { resetPassword } from '@/services/api/user'
import { resetPass } from '@/interface/user/resetPassword'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const navigate = useNavigate()
    const handleSubmit = async (values: resetPass, { setSubmitting }: any) => {
        try {
            const response = await resetPassword(values)
            if(response?.status === 200){
                toast.success("Password Updated Successfully!")
                navigate('/profile')
            }
        } catch (error) {
            handleError(error)
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <div>
            <Layout>
                <Card className="max-w-4xl mx-auto shadow-md">
                    <CardContent className="p-8">
                        <div className="p-14 space-y-8">
                            <Formik
                                initialValues={{
                                    currentPassword: '',
                                    newPassword: '',
                                    confirmPassword: '',
                                }}
                                validationSchema={resetPassSchema}
                                onSubmit={handleSubmit}
                                validateOnChange={true}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Current Password
                                            </label>
                                            <Field
                                                name="currentPassword"
                                                type="password"
                                                placeholder='Enter Your Password'
                                                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400"
                                                required
                                            />
                                            <div className='h-2'>
                                                <ErrorMessage
                                                    name="currentPassword"
                                                    component="div"
                                                    className="text-red-500 mt-1 text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                New Password
                                            </label>
                                            <Field
                                                name="newPassword"
                                                type="password"
                                                placeholder='Enter New Password'
                                                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400"
                                                required
                                            />
                                            <div className='h-2'>
                                                <ErrorMessage
                                                    name="newPassword"
                                                    component="div"
                                                    className="text-red-500 mt-1 text-sm"
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
                                                    className="text-red-500 mt-1 text-sm"
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
                    </CardContent>
                </Card>
            </Layout>
        </div>
    )
}

export default ResetPassword
