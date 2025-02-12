import Footer from '@/components/user/Footer';
import Header from '@/components/user/Header';
import RecentlyAdded from './RecentlyAdded';
import SearchBar from './SearchBar';
import { useState } from 'react';
import { workspaceData } from '@/interface/user/workspaceInterface';
import { fetchFilterWorkspaces } from '@/services/api/user';
import handleError from '@/utils/errorHandler';


const Explore = () => {
    const [filteredWorkspaces, setFilteredWorkspaces] = useState<workspaceData[]>([]);
    console.log(filteredWorkspaces)
    const fetchFilteredWorkspaces = async (filters: any) => {
        try {
            const response = await fetchFilterWorkspaces(filters)
            console.log(response)
            setFilteredWorkspaces(response.data.data)
        } catch (error) {
            handleError(error)
        }
    }

    const handleSearch = (filters: any) => {
        fetchFilteredWorkspaces(filters);
    }

    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <div className="relative h-96 bg-white">
                    <div className="absolute inset-0">
                        <img
                            src="user/banner-3.jpg"
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
                    <SearchBar onSearch={handleSearch} />
                </div>
                {/* Main Content - Added padding top to account for search bar overlap */}
                <div className="container bg-gray-100 mx-auto px-4 pt-32 pb-12">
                    <RecentlyAdded />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Explore;