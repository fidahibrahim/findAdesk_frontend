import Header from "@/components/owner/Header"
import Navbar from "@/components/owner/Navbar"
import { getAllReviews } from "@/services/api/owner";
import handleError from "@/utils/errorHandler";
import { ChevronDown, ChevronUp, Star } from "lucide-react"
import { useEffect, useState } from "react";

const Review = () => {
    const [workspaces, setWorkspaces] = useState([]);
    const [expandedWorkspace, setExpandedWorkspace] = useState(null);
    const [filterRating, setFilterRating] = useState(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchWorkspaceReviews = async () => {
            try {
                setLoading(true)
                const response = await getAllReviews()
                console.log(response)
                const workspacesWithReviews = response.data.data.workspaces || [];
                setWorkspaces(workspacesWithReviews);
            } catch (error) {
                handleError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchWorkspaceReviews()
    }, [])

    const toggleWorkspace = (id) => {
        setExpandedWorkspace(expandedWorkspace === id ? null : id);
    };

    const calculateAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) return 0;
        return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',

        });
    };

    const sortReviews = (reviews) => {
        // Default sort by newest first
        return [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    };

    const filterReviewsByRating = (reviews) => {
        if (filterRating === 0) return reviews;
        return reviews.filter(review => review.rating >= filterRating);
    };

    return (
        <div>
            <Navbar />
            <Header />
            <div className="bg-white ml-72 mt-12 min-h-screen p-6">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Workspace Reviews</h1>
                    {/* Workspaces List */}
                    <div className="space-y-4">
                        {loading ? (
                            <div className="bg-white rounded-lg shadow p-4 text-center">
                                <p className="text-gray-500">Loading workspace reviews...</p>
                            </div>
                        ) : workspaces.length === 0 ? (
                            <div className="bg-white rounded-lg shadow p-4 text-center">
                                <p className="text-gray-500">No workspaces with reviews found.</p>
                            </div>
                        ) : (
                            workspaces.map((workspace) => (
                                <div
                                    key={workspace._id}
                                    className="bg-white rounded-lg shadow overflow-hidden"
                                >
                                    <div
                                        className="p-4 flex items-center justify-between cursor-pointer"
                                        onClick={() => toggleWorkspace(workspace._id)}
                                    >
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800">{workspace.workspaceName}</h2>
                                            <div className="flex items-center mt-1">
                                                <div className="text-sm text-gray-600 mr-4">{workspace.workspaceType}</div>
                                                <div className="text-sm text-gray-600">{workspace.place}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex items-center mr-4">
                                                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                                <span className="ml-1 font-medium">
                                                    {calculateAverageRating(workspace.reviews).toFixed(1)}
                                                </span>
                                                <span className="ml-1 text-gray-500 text-sm">
                                                    ({workspace.reviews.length})
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
                                        <div className="border-t border-gray-200">
                                            {filterReviewsByRating(sortReviews(workspace.reviews)).length === 0 ? (
                                                <div className="p-4 text-center text-gray-500">
                                                    No reviews match your current filter.
                                                </div>
                                            ) : (
                                                <div className="divide-y divide-gray-200">
                                                    {filterReviewsByRating(sortReviews(workspace.reviews)).map((review, index) => (
                                                        <div key={index} className="p-4">
                                                            <div className="flex items-center justify-between">
                                                                <div className="font-medium">{review.userId.name}</div>
                                                                <div className="text-sm text-gray-500">{formatDate(review.createdAt)}</div>
                                                            </div>
                                                            <div className="flex items-center mt-1">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                                    />
                                                                ))}
                                                                <span className="ml-2 text-sm font-medium">{review.rating.toFixed(1)}</span>
                                                            </div>
                                                            <p className="mt-2 text-gray-600">{review.review}</p>
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
    )
}

export default Review
