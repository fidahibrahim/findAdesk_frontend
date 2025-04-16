import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Star, Building, MapPin, Calendar } from "lucide-react";
import Header from "@/components/owner/Header";
import Navbar from "@/components/owner/Navbar";
import { getAllReviews } from "@/services/api/owner";
import handleError from "@/utils/errorHandler";

// Define interfaces for type safety
interface Review {
    userId: {
        name?: string;
    };
    rating: number;
    review: string;
    createdAt: string;
}

interface Workspace {
    _id: string;
    workspaceName: string;
    workspaceType: string;
    place?: string;
    createdAt: string;
    reviews?: Review[];
}

const Review = () => {
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [expandedWorkspace, setExpandedWorkspace] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkspaceReviews = async () => {
            try {
                setLoading(true);
                const response = await getAllReviews();
                const workspacesWithReviews = response.data.data || [];
                setWorkspaces(workspacesWithReviews);
            } catch (error) {
                handleError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkspaceReviews();
    }, []);

    const toggleWorkspace = (id: string) => {
        setExpandedWorkspace(expandedWorkspace === id ? null : id);
    };

    const calculateAverageRating = (reviews?: Review[]) => {
        if (!reviews || reviews.length === 0) return 0;
        return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getWorkspaceTypeIcon = (type: string) => {
        switch (type) {
            case "meetingRoom":
                return <Building className="h-5 w-5 text-blue-500" />;
            case "conferenceHall":
                return <Building className="h-5 w-5 text-purple-500" />;
            default:
                return <Building className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Header />
            <div className="ml-72 mt-12 p-6">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Workspace Reviews</h1>
                        <p className="text-gray-600 mt-2">
                            Manage and monitor customer feedback for all your workspaces
                        </p>
                    </div>

                    {/* Workspaces List */}
                    <div className="space-y-4">
                        {loading ? (
                            <div className="bg-white rounded-lg shadow p-8 text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                                <p className="text-gray-500 mt-4">Loading workspace reviews...</p>
                            </div>
                        ) : workspaces.length === 0 ? (
                            <div className="bg-white rounded-lg shadow p-8 text-center">
                                <p className="text-gray-500">No workspaces found.</p>
                            </div>
                        ) : (
                            workspaces.map((workspace) => (
                                <div
                                    key={workspace._id}
                                    className="bg-gray-100 rounded-lg shadow overflow-hidden transition-all duration-200 hover:shadow-md"
                                >
                                    <div
                                        className="p-5 flex items-center justify-between cursor-pointer"
                                        onClick={() => toggleWorkspace(workspace._id)}
                                    >
                                        <div className="flex items-start">
                                            <div className="bg-gray-100 p-3 rounded-lg mr-4">
                                                {getWorkspaceTypeIcon(workspace.workspaceType)}
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-semibold text-gray-800">
                                                    {workspace.workspaceName}
                                                </h2>
                                                <div className="flex flex-wrap items-center mt-1 text-sm text-gray-600">
                                                    <div className="flex items-center mr-4">
                                                        <Building className="h-4 w-4 mr-1 text-gray-400" />
                                                        {workspace.workspaceType === "meetingRoom" ? "Meeting Room" :
                                                            workspace.workspaceType === "conferenceHall" ? "Conference Hall" :
                                                                workspace.workspaceType}
                                                    </div>
                                                    {workspace.place && (
                                                        <div className="flex items-center mr-4">
                                                            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                                            {workspace.place}
                                                        </div>
                                                    )}
                                                    <div className="flex items-center">
                                                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                                        Added on {formatDate(workspace.createdAt)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="bg-gray-50 rounded-lg py-2 px-3 flex items-center mr-4">
                                                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                                <span className="ml-1 font-bold text-gray-700">
                                                    {calculateAverageRating(workspace.reviews).toFixed(1)}
                                                </span>
                                                <span className="ml-1 text-gray-500 text-sm">
                                                    ({workspace.reviews?.length || 0})
                                                </span>
                                            </div>
                                            {expandedWorkspace === workspace._id ? (
                                                <ChevronUp className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-gray-400" />
                                            )}
                                        </div>
                                    </div>

                                    {expandedWorkspace === workspace._id && (
                                        <div className="border-t border-gray-100 bg-gray-50">
                                            {!workspace.reviews || workspace.reviews.length === 0 ? (
                                                <div className="p-6 text-center text-gray-500">
                                                    No reviews available for this workspace.
                                                </div>
                                            ) : (
                                                <div className="divide-y divide-gray-100">
                                                    {workspace.reviews.map((review, index) => (
                                                        <div key={index} className="p-5 bg-white">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center">
                                                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                                        {review.userId && review.userId.name ? review.userId.name.charAt(0).toUpperCase() : "U"}
                                                                    </div>
                                                                    <div className="ml-3">
                                                                        <div className="font-medium text-gray-800">
                                                                            {review.userId && review.userId.name ? review.userId.name : "Anonymous User"}
                                                                        </div>
                                                                        <div className="text-gray-500 text-sm">
                                                                            {formatDate(review.createdAt)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center bg-gray-50 rounded-lg px-2 py-1">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star
                                                                            key={i}
                                                                            className={`h-4 w-4 ${i < Math.floor(review.rating)
                                                                                ? "text-yellow-400 fill-current"
                                                                                : "text-gray-300"
                                                                                }`}
                                                                        />
                                                                    ))}
                                                                    <span className="ml-1 text-sm font-medium text-gray-700">
                                                                        {review.rating.toFixed(1)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <p className="mt-3 text-gray-600 bg-gray-100 p-4 rounded-lg">
                                                                {review.review}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;