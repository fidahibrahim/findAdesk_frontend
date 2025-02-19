import Header from "@/components/admin/Header";
import Navbar from "@/components/admin/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { workspaceRes } from "@/interface/owner/WorkspaceRegisterValues";
import { getWorkspaceDetails } from "@/services/api/admin";
import handleError from "@/utils/errorHandler";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ViewDetails = () => {
    const location = useLocation()
    const workspaceId = location.state.workspaceId

    const [workspace, setWorkspace] = useState<workspaceRes | null>(null)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async (workspaceId: string) => {
            try {
                setLoading(true);
                const response = await getWorkspaceDetails(workspaceId)
                console.log(response)
                if (response?.status === 200) {
                    setWorkspace(response.data.data)
                }
                setLoading(false);
            } catch (error) {
                handleError(error)
                setLoading(false);
            }
        }
        fetchData(workspaceId)
    }, [workspaceId])

    if (!workspace) {
        return (
            <div className="container mx-auto p-6">
                <Card className="w-full max-w-4xl mx-auto">
                    <CardContent className="p-8">
                        <div className="flex items-center justify-center">
                            <p className="text-gray-500">Loading workspace details...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

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

    return (
        <div>
            <Header />
            <Navbar />
            <div className="container mx-auto p-6">
                <Card className="w-full max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">{workspace.workspaceName}</CardTitle>
                        <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-sm ${workspace.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                workspace.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                {workspace.status}
                            </span>
                        </div>
                    </CardHeader>

                    <CardContent>
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                                <div className="space-y-2">
                                    <p><span className="font-medium">Email:</span> {workspace.workspaceMail}</p>
                                    <p><span className="font-medium">Type:</span> {workspace.workspaceType}</p>
                                    <p><span className="font-medium">Capacity:</span> {workspace.capacity} people</p>
                                    <p><span className="font-medium">Price:</span> ₹{workspace.pricePerHour}/hour</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Location</h3>
                                <div className="space-y-2">
                                    <p><span className="font-medium">Place:</span> {workspace.place}</p>
                                    <p><span className="font-medium">Street:</span> {workspace.street}</p>
                                    <p><span className="font-medium">State:</span> {workspace.state}</p>
                                </div>
                            </div>
                        </div>

                        {/* Schedule Information */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Schedule</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p><span className="font-medium">Working Days:</span> {workspace.workingDays}</p>
                                    <p><span className="font-medium">Start Time:</span> {formatTime(workspace.startTime)}</p>
                                    <p><span className="font-medium">End Time:</span> {formatTime(workspace.endTime)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Description</h3>
                            <p className="text-gray-700 whitespace-pre-wrap">{workspace.spaceDescription}</p>
                        </div>

                        {/* Amenities */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                            <div className="flex flex-wrap gap-2">
                                {workspace.amenities?.map((amenity, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                    >
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Rules */}
                        {workspace.workspaceRules && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4">Workspace Rules</h3>
                                <p className="text-gray-700 whitespace-pre-wrap">{workspace.workspaceRules}</p>
                            </div>
                        )}

                        {/* Images */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Workspace Images</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-4">
                                {workspace.images?.map((imageUrl: string, index: number) => (
                                    <div key={index} className="relative aspect-square">
                                        <img
                                            src={imageUrl}
                                            alt={`Workspace ${index + 1}`}
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ViewDetails;