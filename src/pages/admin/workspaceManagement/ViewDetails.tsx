import Header from "@/components/admin/Header";
import Navbar from "@/components/admin/Navbar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { workspaceRes } from "@/interface/owner/WorkspaceRegisterValues";
import { getWorkspaceDetails } from "@/services/api/admin";
import handleError from "@/utils/errorHandler";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Clock, MapPin, Users, DollarSign, Calendar, Info, Shield, Image } from "lucide-react";

const ViewDetails = () => {
    const location = useLocation()
    const workspaceId = location.state.workspaceId

    const [workspace, setWorkspace] = useState<workspaceRes | null>(null)

    useEffect(() => {
        const fetchData = async (workspaceId: string) => {
            try {
                const response = await getWorkspaceDetails(workspaceId)
                console.log(response)
                if (response?.status === 200) {
                    setWorkspace(response.data.data)
                }
            } catch (error) {
                handleError(error)
            }
        }
        fetchData(workspaceId)
    }, [workspaceId])

    const formatTime = (dateString: any) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        } catch (error) {
            return 'Invalid time';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-amber-100 text-amber-800 border border-amber-300';
            case 'approved':
                return 'bg-emerald-100 text-emerald-800 border border-emerald-300';
            default:
                return 'bg-red-100 text-red-800 border border-red-300';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <Navbar />

            {!workspace ? (
                <div className="flex-1 container mx-auto p-6 flex items-center justify-center">
                    <Card className="w-full max-w-4xl shadow-lg">
                        <CardContent className="p-12">
                            <div className="flex flex-col items-center justify-center gap-4">
                                <div className="w-12 h-12 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin"></div>
                                <p className="text-gray-600 font-medium">Loading workspace details...</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="flex-1 pl-40 py-8 mt-4">
                    <div className="max-w-5xl mx-auto" >
                        <Card className="w-full max-w-5xl mx-auto shadow-lg overflow-hidden">
                            {/* Header with hero image and workspace name */}
                            <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-700">
                                {workspace.images && workspace.images.length > 0 && (
                                    <img
                                        src={workspace.images[0]}
                                        alt="Workspace Hero"
                                        className="w-full h-full object-cover opacity-50"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6">
                                    <span className={`px-3 py-1 rounded-full text-sm inline-block mb-2 w-fit ${getStatusColor(workspace.status)}`}>
                                        {workspace.status}
                                    </span>
                                    <CardTitle className="text-3xl font-bold text-white">{workspace.workspaceName}</CardTitle>
                                </div>
                            </div>

                            <CardContent className="p-6 md:p-8">
                                {/* Image Gallery - Larger preview grid */}
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                            <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                                            <path d="M9 9h1" />
                                            <path d="M9 13h6" />
                                            <path d="M9 17h6" />
                                        </svg>
                                        <span>Description</span>
                                    </h3>
                                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{workspace.spaceDescription}</p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Column 1: Basic Info & Location */}
                                    <div className="lg:col-span-2 space-y-8">
                                        {/* Basic Information */}
                                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                                                <Info size={20} className="text-blue-600" />
                                                <span>Basic Information</span>
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-start gap-2">
                                                    <div className="rounded-full p-2 bg-blue-100 text-blue-700 mt-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M22 17.5l-9 6-9-6" />
                                                            <path d="M4 12l9-6 9 6" />
                                                            <path d="M4 7l9-6 9 6" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Email</p>
                                                        <p className="font-medium">{workspace.workspaceMail}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <div className="rounded-full p-2 bg-indigo-100 text-indigo-700 mt-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M16 22h2c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4V7.5L14.5 2H6c-.5 0-1 .2-1.4.6C4.2 3 4 3.5 4 4v3" />
                                                            <polyline points="14 2 14 8 20 8" />
                                                            <circle cx="8" cy="16" r="6" />
                                                            <path d="M9.5 17.5 8 16.25V14" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Type</p>
                                                        <p className="font-medium">{workspace.workspaceType}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <div className="rounded-full p-2 bg-green-100 text-green-700 mt-1">
                                                        <Users size={16} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Capacity</p>
                                                        <p className="font-medium">{workspace.capacity} people</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <div className="rounded-full p-2 bg-yellow-100 text-yellow-700 mt-1">
                                                        <DollarSign size={16} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Price</p>
                                                        <p className="font-medium">₹{workspace.pricePerHour}/hour</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Location Information */}
                                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                                                <MapPin size={20} className="text-blue-600" />
                                                <span>Location</span>
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="rounded-full p-2 bg-blue-100 text-blue-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                                            <circle cx="12" cy="10" r="3" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Place</p>
                                                        <p className="font-medium">{workspace.place}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="rounded-full p-2 bg-blue-100 text-blue-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M18 4v16" />
                                                            <path d="M6 4v16" />
                                                            <path d="M12 4v16" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Street</p>
                                                        <p className="font-medium">{workspace.street}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="rounded-full p-2 bg-blue-100 text-blue-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M2 20h.01" />
                                                            <path d="M7 20v-4" />
                                                            <path d="M12 20v-8" />
                                                            <path d="M17 20V8" />
                                                            <path d="M22 4v16" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">State</p>
                                                        <p className="font-medium">{workspace.state}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-10">
                                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                <Image size={20} className="text-blue-600" />
                                                <span>Workspace Images</span>
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                {workspace.images?.map((imageUrl: string, index: number) => (
                                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                                                        <img
                                                            src={imageUrl}
                                                            alt={`Workspace ${index + 1}`}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Description */}

                                    </div>

                                    {/* Column 2: Sidebar with Schedule, Amenities, Rules */}
                                    <div className="space-y-8">
                                        {/* Schedule Information */}
                                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                                                <Clock size={20} className="text-blue-600" />
                                                <span>Schedule</span>
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="rounded-full p-2 bg-purple-100 text-purple-700">
                                                        <Calendar size={16} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Working Days</p>
                                                        <p className="font-medium">{workspace.workingDays}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="rounded-full p-2 bg-purple-100 text-purple-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <circle cx="12" cy="12" r="10" />
                                                            <polyline points="12 6 12 12 16 14" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Hours</p>
                                                        <p className="font-medium">{formatTime(workspace.startTime)} - {formatTime(workspace.endTime)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Amenities */}
                                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                                                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                                <span>Amenities</span>
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {workspace.amenities?.map((amenity, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-2 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-100 flex items-center gap-1"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M20 6 9 17l-5-5" />
                                                        </svg>
                                                        {amenity}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Rules */}
                                        {workspace.workspaceRules && (
                                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                                                    <Shield size={20} className="text-blue-600" />
                                                    <span>Workspace Rules</span>
                                                </h3>
                                                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{workspace.workspaceRules}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewDetails;