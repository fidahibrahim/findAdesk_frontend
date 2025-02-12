import { workspaceData } from '@/interface/user/workspaceInterface';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { MapPin, Star } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import handleError from '@/utils/errorHandler';
import { fetchFilterWorkspaces } from '@/services/api/user';

interface FilteredResultsProps {
  workspaces: workspaceData[];
}


const FilteredResults = ({ workspaces }: FilteredResultsProps) => {
  
  const [sortedWorkspaces, setSortedWorkspaces] = useState<workspaceData[]>([]);
  const [sortBy, setSortBy] = useState('recommended');
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setSortedWorkspaces(workspaces);
  }, [workspaces]);

  const handleSortChange = async (value: string) => {
    setSortBy(value);
    try {
      const currentFilters = location.state?.filters || {};
      const initialFilters = {
        ...currentFilters,
        sortBy: value
      };
      
      const response = await fetchFilterWorkspaces(initialFilters);
      if (response?.data?.data) {
        setSortedWorkspaces(response.data.data);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleVievClick = (workspaceId: string | undefined) => {
    navigate("/workspaceDetails", { state: { workspaceId: workspaceId } })
  }
  
  return (
    <div className="container mx-auto px-3 py-16">
      {/* Results Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          {sortedWorkspaces.length} Workspaces Found
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Sort by:</span>
          <select
            className="border rounded-md p-2 bg-white"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Scrollable Results Container */}
      <div className="relative">

        <div
          id="filtered-results-scroll"
          className="overflow-x-auto pb-6 scroll-smooth scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-6 min-w-full">
            {sortedWorkspaces.map((workspace) => (
              <Card
                key={workspace._id}
                className="hover:shadow-lg transition-shadow flex-none w-96">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={workspace.images[0]}
                      alt={workspace.workspaceName}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 right-4 bg-gray-200 px-3 py-1 rounded-full text-sm font-semibold">
                      ₹ {workspace.pricePerHour}/hr
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {workspace.workspaceType}
                      </span>
                      <div className="flex items-center text-yellow-500">
                        <Star className="fill-current h-5 w-5" />
                        <span className="ml-1 text-gray-800">4</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{workspace.workspaceName}</h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm truncate">
                        {workspace.place} {workspace.street} {workspace.state}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {workspace.amenities.slice(0, 3).map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-600"
                        >
                          {amenity}
                        </span>
                      ))}
                      {workspace.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-600">
                          +{workspace.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                    <button
                      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                      onClick={() => handleVievClick(workspace._id)}
                    >
                      View Details
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredResults;