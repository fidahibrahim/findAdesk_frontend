import Footer from "@/components/user/Footer"
import Header from "@/components/user/Header"
import FilteredResults from "./FilteredResults"
import { useEffect, useState } from "react";
import { workspaceData } from "@/interface/user/workspaceInterface";
import { useLocation } from "react-router-dom";
import { fetchFilterWorkspaces } from "@/services/api/user";
import handleError from "@/utils/errorHandler";


const Filtered = () => {
    const location = useLocation();
    const [workspaces, setWorkspaces] = useState<workspaceData[]>([]);

    useEffect(() => {
        const filters = location.state?.filters;
        if (filters) {
            const fetchWorkspaces = async () => {
                try {
                    const response = await fetchFilterWorkspaces(filters)
                    setWorkspaces(response.data.data)
                } catch (error) {
                    handleError(error)
                }
            }
            fetchWorkspaces()
        }
    }, [location.state?.filters])

    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative h-96 bg-white">
                    <div className="absolute inset-0">
                        <img
                            src="/user/banner-3.jpg"
                            alt="Hero background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-45"></div>
                    </div>
                    <div className="relative container mx-auto px-8 pt-36">
                        <h1 className="text-5xl font-mono text-white mb-2">
                            Discover, Find, and <span className="text-red-500 ">Book Your Space</span>
                        </h1>
                        <p className="text-3xl text-white">
                            - Perfect space for <span className="text-red-500">your work</span>
                        </p>
                    </div>
                    {/* Search Section - Moved inside hero and adjusted positioning */}
                </div>
                <div >
                    <FilteredResults workspaces={workspaces} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Filtered
