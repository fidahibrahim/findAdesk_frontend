import { workspaceData } from '@/interface/user/workspaceInterface';
import { SearchFilters } from '@/pages/user/explore/SearchBar';
import { filterWorkspaces } from '@/services/api/user';
import handleError from '@/utils/errorHandler';
import React, { useEffect, useState } from 'react'
import { searchContext } from '@/pages/user/explore/SearchBar';

const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [filters, setFilters] = useState<SearchFilters>({
        type: '',
        location: '',
        date: '',
        amenities: ''
    });
    const [filteredWorkspaces, setFilteredWorkspaces] = useState<workspaceData[]>([]);

    const fetchAndFilterWorkspace = async () => {
        try {
            const response = await filterWorkspaces(filters)
            const workspaces: workspaceData[] = response.data.data
            
            const filtered = workspaces.filter(workspace => {
                const matchesType = !filters.type || workspace.workspaceType.toLowerCase().includes(filters.type.toLowerCase());
                const matchesLocation = !filters.location ||
                    `${workspace.place} ${workspace.street} ${workspace.state}`
                        .toLowerCase()
                        .includes(filters.location.toLowerCase());
                const matchesAmenities = !filters.amenities ||
                    workspace.amenities.some(amenity =>
                        amenity.toLowerCase().includes(filters.amenities.toLowerCase())
                    );
                return matchesType && matchesLocation && matchesAmenities;
            });
            setFilteredWorkspaces(filtered);
        } catch (error) {
            handleError(error)
        }
    }

    useEffect(() => {
        fetchAndFilterWorkspace();
    }, [filters]);

    return (
        <searchContext.Provider value={{ filters, setFilters, filteredWorkspaces }}>
            {children}
        </searchContext.Provider>
    )
}

export default SearchProvider
