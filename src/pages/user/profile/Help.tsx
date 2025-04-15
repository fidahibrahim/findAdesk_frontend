import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

import Layout from './Sidebar';

const Help = () => {
    const navigate = useNavigate();

    return (
        <>
        <Layout>
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto px-4 py-4 bg-white rounded-lg shadow-sm">
                    {/* Header Section */}
                    <div className="p-6 border-b border-gray-200">
                        <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions</h1>
                        <p className="mt-2 text-gray-600">Last updated: January 30, 2025</p>
                    </div>

                    {/* Main Content */}
                    <div className="p-6 space-y-8">
                        {/* Introduction */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3"> Introduction</h2>
                            <p className="text-gray-700">
                                Welcome to Workspace Booking. By accessing our website and using our services,
                                you agree to these terms and conditions. Please read them carefully before
                                proceeding with any booking.
                            </p>
                        </section>

                        {/* Service Usage */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3"> Service Usage</h2>
                            <div className="space-y-3 text-gray-700">
                                <p>
                                    Our workspace booking service allows you to reserve office spaces, meeting
                                    rooms, and other professional facilities. Users must be at least 18 years
                                    old to use our services.
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Bookings are subject to availability</li>
                                    <li>All payments must be made in advance</li>
                                    <li>Cancellations must be made 24 hours before the booking time</li>
                                    <li>Users must follow workspace rules and guidelines</li>
                                </ul>
                            </div>
                        </section>

                        {/* Booking & Cancellation */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3"> Booking & Cancellation</h2>
                            <p className="text-gray-700">
                                All bookings are confirmed upon payment. Cancellations made within the
                                specified period will receive a full refund. Late cancellations or no-shows
                                may result in partial or no refund.
                            </p>
                        </section>

                        {/* User Responsibilities */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3"> User Responsibilities</h2>
                            <p className="text-gray-700">
                                Users are responsible for maintaining the cleanliness and condition of the
                                workspace. Any damage to property will be charged to the user's account.
                                Users must comply with all safety regulations and building policies.
                            </p>
                        </section>

                        {/* Privacy & Data */}
                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3"> Privacy & Data</h2>
                            <p className="text-gray-700">
                                We collect and process user data in accordance with our Privacy Policy.
                                By using our services, you consent to our data collection practices.
                            </p>
                        </section>

                        {/* Contact Section */}
                        <section className="bg-blue-50 p-6 rounded-lg mt-8">
                            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Have Questions?</h2>
                                    <p className="text-gray-700">
                                        Contact our support team for clarification on any terms.
                                    </p>
                                </div>
                                <div className="flex space-x-4">
                                    <Button
                                        onClick={() => navigate('/contactUs')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        Contact Us
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-200 text-center text-gray-600">
                        <p>
                            By using our services, you acknowledge that you have read and agree to these
                            terms and conditions.
                        </p>
                    </div>
                </div>
            </div>
            </Layout>
        </>
    );
};

export default Help;