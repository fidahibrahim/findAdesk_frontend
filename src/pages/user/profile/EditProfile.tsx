import { useEffect, useState } from 'react';
import handleError from '@/utils/errorHandler';
import Layout from './Sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Upload } from 'lucide-react';
import { profileSchema } from '@/validation/formValidation';
import { profileInterface } from '@/interface/user/profileInterface';
import { editProfile, getProfile } from '@/services/api/user';

const EditProfile = () => {
    const [data, setData] = useState<profileInterface | null>(null);

    const fetchUserData = async () => {
        try {
            const response = await getProfile();
            setData(response.data.data)
        } catch (error) {
            handleError(error)
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSubmit = async (values: profileInterface, { setSubmitting }: any) => {
        try {
            console.log(values);
            const formData = new FormData()
            const response = await editProfile(formData)
        } catch (error) {
            handleError(error);
        } finally {
            setSubmitting(false);
        }
    };

    const initialValues: profileInterface = {
        name: data?.name || '',
        email: data?.email || '',
        image: data?.image || ''
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto p-4">
                <Card className="max-w-4xl mx-auto shadow-md">
                    <CardContent className="p-8">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={profileSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize={true}
                        >
                            {({ setFieldValue, dirty, isSubmitting }) => (
                                <Form className="space-y-8">
                                    <div className="space-y-8">
                                        <div className="flex flex-col items-center space-y-4">
                                            <div className="relative">
                                                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                                    <img
                                                        src={data?.image}
                                                        alt="Profile"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <label
                                                    htmlFor="profile-upload"
                                                    className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50"
                                                >
                                                    <Upload className="w-4 h-4" />
                                                </label>
                                                <input
                                                    id="profile-upload"
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file && data) {
                                                            setData({
                                                                ...data,
                                                                image: URL.createObjectURL(file)
                                                            });
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Full Name
                                            </label>
                                            <Field
                                                id="name"
                                                name="name"
                                                type="text"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                                                placeholder="Enter your full name"
                                            />
                                            <ErrorMessage
                                                name="name"
                                                component="div"
                                                className="text-red-500 text-sm mt-1"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Email
                                            </label>
                                            <Field
                                                id="email"
                                                name="email"
                                                type="email"
                                                className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-4 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="px-6"
                                            onClick={() => window.history.back()}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={ isSubmitting}
                                            className="px-6"
                                        >
                                            Save Changes
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};

export default EditProfile;