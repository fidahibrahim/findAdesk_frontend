import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react";

const SearchBar = ({ onSearch }: any) => {
    const navigate = useNavigate()
    const [filters, setFilters] = useState({
        type: '',
        location: '',
        date: '',
        amenities: ''
    });

    const handleSearch = () => {
        if (filters.type || filters.location || filters.date || filters.amenities) {
            onSearch(filters);
            navigate('/searchWorkspace', { state: { filters } });
        }
    };

    return (
        <div>
            <div className="absolute left-0 right-0 bottom-0 transform translate-y-1/2">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-xl p-6 flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px]">
                            <select
                                className="w-full p-3 border rounded-lg bg-white"
                                value={filters.type}
                                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                            >
                                <option value="">Type</option>
                                <option value="coWorking">Co-working Space</option>
                                <option value="meetingRoom">Meeting Room</option>
                                <option value="conferenceHall">Conference Hall</option>
                            </select>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Location"
                                    className="w-full p-3 border rounded-lg pl-10"
                                    value={filters.location}
                                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                />
                                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                            </div>
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <input
                                type="date"
                                className="w-full p-3 border rounded-lg"
                                value={filters.date}
                                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                            />
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <select
                                className="w-full p-3 border rounded-lg"
                                value={filters.amenities}
                                onChange={(e) => setFilters({ ...filters, amenities: e.target.value })}
                            >
                                <option value="">Amenities</option>
                                <option value="wifi">Wi-Fi</option>
                                <option value="projector">Projector</option>
                                <option value="whiteboard">Whiteboard</option>
                            </select>
                        </div>
                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar
