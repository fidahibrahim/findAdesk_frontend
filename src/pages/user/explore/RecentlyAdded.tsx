import { workspaceData } from "@/interface/user/workspaceInterface";
import { fetchRecentWorkspaces } from "@/services/api/user";
import handleError from "@/utils/errorHandler";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const RecentlyAdded = () => {
    const [workspaces, setWorkspaces] = useState<workspaceData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                setIsLoading(true)
                const response = await fetchRecentWorkspaces()
                setWorkspaces(response.data.data)
            } catch (error) {
                handleError(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchWorkspaces()
    }, [])

    const scroll = (direction: 'left' | 'right') => {
        const container = document.getElementById('workspace-scroll');
        if (container) {
            const scrollAmount = 400;
            const scrollTo = direction === 'left'
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;
            container.scrollTo({
                left: scrollTo,
                behavior: 'smooth'
            });
        }
    };

    const handleVievClick = (workspaceId: string | undefined) => {
        navigate("/workspaceDetails", { state: { workspaceId: workspaceId } })
      }

    if (workspaces.length === 0) {
        return (
            <div className="mb-12">
                <h2 className="text-xl font-medium mb-6">Recently Added</h2>
                <div className="text-gray-500">No workspaces found</div>
            </div>
        );
    }

    return (
        <div className="mb-2 relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Recently Added</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div
                id="workspace-scroll"
                className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {workspaces.map((workspace) => (
                    <div
                        key={workspace._id}
                        className="relative group min-w-[300px] cursor-pointer"
                        onClick={() => handleVievClick(workspace._id)}
                    >
                        <div className="relative h-64 rounded-lg overflow-hidden">
                            <img
                                src={workspace.images?.[0] || "/user/banner-3.jpg"}
                                alt={workspace.workspaceName}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-xl font-medium mb-1">{workspace.workspaceName}</h3>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span>{workspace.place}</span>
                                        <span>•</span>
                                        <span className="text-blue-400">₹{workspace.pricePerHour}/hr</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentlyAdded
