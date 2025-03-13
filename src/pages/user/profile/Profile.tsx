import { useEffect, useState } from 'react';
import { User, Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { profileInterface } from '@/interface/user/profileInterface';
import { getProfile } from '@/services/api/user';
import handleError from '@/utils/errorHandler';
import Layout from './Sidebar';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState<profileInterface | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                setProfileData(response.data.data);
            } catch (error) {
                handleError(error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div>
            <Layout>
                <Card className="max-w-4xl mx-auto shadow-md">
                    <CardContent className="p-8">
                        <div className="space-y-8">
                            <div className="flex items-center space-x-6 pb-6 border-b">
                                <div className="w-28 h-28 rounded-full overflow-hidden shadow-md">
                                    {profileData?.image ? (
                                        <img src={profileData.image} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                                            <User className="w-14 h-14 text-blue-500" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{profileData?.name}</h1>
                                    <p className="text-gray-500">{profileData?.email}</p>
                                    <Button variant="outline" size="sm"
                                        className="mt-2"
                                        onClick={() => navigate("/editProfile")}
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Full Name</label>
                                            <p className="mt-1 font-medium text-gray-900">{profileData?.name}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Email</label>
                                            <p className="mt-1 font-medium text-gray-900">{profileData?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Layout>
        </div>
    );
};

export default ProfilePage;