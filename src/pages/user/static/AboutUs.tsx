import { Building2, Users, Clock, Medal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/user/Header';
import Footer from '@/components/user/Footer';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate("/contactUs")
    }
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="bg-white">
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Transforming How People Work
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                We're on a mission to create flexible, inspiring workspaces that empower professionals and businesses to thrive in the modern work environment.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <Building2 className="h-10 w-10 text-blue-600 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Premium Locations</h3>
                            <p className="text-gray-600">
                                Strategically located workspaces in prime business districts across the city.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <Users className="h-10 w-10 text-blue-600 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Vibrant Community</h3>
                            <p className="text-gray-600">
                                Join a network of professionals, entrepreneurs, and innovative companies.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <Clock className="h-10 w-10 text-blue-600 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Flexible Booking</h3>
                            <p className="text-gray-600">
                                Book spaces by the hour, day, or month - whatever suits your needs.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <Medal className="h-10 w-10 text-blue-600 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Premium Amenities</h3>
                            <p className="text-gray-600">
                                High-speed internet, meeting rooms, and premium coffee included.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Story Section */}
                <div className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                            <p className="text-gray-600 mb-6">
                                Founded in 2024, we recognized the need for flexible, professional workspaces that adapt to the changing nature of work. What started as a single location has grown into a network of premium workspaces, serving thousands of professionals and businesses.
                            </p>
                            <p className="text-gray-600 mb-8">
                                Today, we're proud to be the leading workspace provider in the region, with a commitment to excellence and innovation that drives everything we do.
                            </p>
                            <Button
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={handleClick}
                            >
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">12+</div>
                            <div className="text-gray-600">Locations</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                            <div className="text-gray-600">Happy Members</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">93%</div>
                            <div className="text-gray-600">Satisfaction Rate</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;