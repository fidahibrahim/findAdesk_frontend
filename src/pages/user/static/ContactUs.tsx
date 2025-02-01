import { Mail, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { contactSchema } from '@/validation/formValidation';
import handleError from '@/utils/errorHandler';
import TextArea from 'antd/es/input/TextArea';
import Header from '@/components/user/Header';
import Footer from '@/components/user/Footer';
import { ContactData } from '@/interface/user/contactInterface';
import { contactService } from '@/services/api/user';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {

    const navigate = useNavigate()

    const initialValues = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };

    const handleSubmit = async (values: ContactData, { resetForm }: { resetForm: () => void }) => {
        try {
            const response = await contactService(values)
            console.log(response)
            toast.success("Your Mail has been sent successfully!")
            resetForm();
        } catch (error) {
            handleError(error)
            toast.error("Failed to send Mail. Please try again later.")
        }
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                        Have questions about our workspaces booking platform? We'd love to hear from you.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Contact Information */}
                        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 order-2 md:order-1">
                            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <Mail className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-medium">Email Us</h3>
                                        <p className="text-gray-600">findadesk96@gmail.com</p>
                                        <p className="text-gray-600">fAdsupport@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <Phone className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-medium">Call Us</h3>
                                        <p className="text-gray-600">+1 (555) 123-4567</p>
                                        <p className="text-gray-600">Mon - Sun, 9am - 6pm</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div>
                                        <img
                                            src="/user/logo.png"
                                            alt="Logo"
                                            className="ml-24 py-10 w-80"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 order-1 md:order-2">
                            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={contactSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="space-y-4">
                                        <div>
                                            <Field
                                                name="name"
                                                placeholder="Your Name"
                                                as={Input}
                                                className="w-full"
                                            />
                                            <div className="h-3">
                                                <ErrorMessage
                                                    name="name"
                                                    component="div"
                                                    className="text-red-500 text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Field
                                                name="email"
                                                type="email"
                                                placeholder="Your Email"
                                                as={Input}
                                                className="w-full"
                                            />
                                            <div className="h-3">
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="text-red-500 text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Field
                                                name="subject"
                                                placeholder="Subject"
                                                as={Input}
                                                className="w-full"
                                            />
                                            <div className="h-3">
                                                <ErrorMessage
                                                    name="subject"
                                                    component="div"
                                                    className="text-red-500 text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Field
                                                name="message"
                                                placeholder="Your Message"
                                                as={TextArea}
                                                className="w-full min-h-[150px]"
                                            />
                                            <div className="h-3">
                                                <ErrorMessage
                                                    name="message"
                                                    component="div"
                                                    className="text-red-500 text-sm"
                                                />
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                            disabled={isSubmitting}
                                        >
                                            <Send className="h-4 w-4 mr-2" />
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;