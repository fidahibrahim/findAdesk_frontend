import Header from "@/components/admin/Header"
import Navbar from "@/components/admin/Navbar"
import AdminSearch from '@/components/admin/AdminSearch';
import { useState } from "react";
import { Search } from "lucide-react";
import WorkspaceTable from "./WorkspaceTable";
import { string } from "yup";


const Workspaces = () => {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filter, setFilter] = useState('all');


    const debouncedSearch = AdminSearch(search, 500)
    return (
        <>
            <div>
                <Navbar />
                <Header />
                <div className="p-14">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl px-72 font-medium text-gray-400">Workspace Management</h2>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-3 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2">
                                <Search className="h-4 w-4 text-gray-500" />
                            </button>
                        </div>
                    </div>
                    <div className="flex px-72 space-x-4 mb-6">
                    <button 
                        onClick={() => setFilter('approved')}
                        className={`px-6 py-2 border rounded-md focus:outline-none transition-colors
                            ${filter === 'approved' 
                                ? 'bg-blue-50 border-blue-200 text-blue-600' 
                                : 'hover:bg-gray-50'}`}
                    >
                        ✓ Approved
                    </button>
                    <button 
                        onClick={() => setFilter('rejected')}
                        className={`px-6 py-2 border rounded-md focus:outline-none transition-colors
                            ${filter === 'rejected' 
                                ? 'bg-blue-50 border-blue-200 text-blue-600' 
                                : 'hover:bg-gray-50'}`}
                    >
                        ✕ Rejected
                    </button>
                </div>

                    <WorkspaceTable search={debouncedSearch} page={page} setTotalPages={setTotalPages} />
                    <div className="flex pl-64 justify-center gap-0 py-28 ">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1 border rounded-md hover:bg-gray-50">Prev</button>
                        <button className="px-3 py-1 border rounded-md bg-blue-50 text-blue-600">{page}</button>
                        <button className="px-3 py-1 border rounded-md hover:bg-gray-50">{page + 1}</button>
                        <button
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                            className="px-3 py-1 border rounded-md hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Workspaces
