import Header from '@/components/admin/Header'
import Navbar from '@/components/admin/Navbar'
import AdminSearch from '@/components/admin/AdminSearch';
import { Search } from 'lucide-react';
import { useState } from 'react';
import WorkspaceTable from './workspaceTable';
import { Link } from 'react-router-dom';
const Workspace = () => {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const debouncedSearch = AdminSearch(search, 500)
    return (
        <>
            <div>
                <Navbar />
                <Header />
                <div className="p-14">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl px-64 mb-5 font-medium text-gray-400">
                                Manage Your Workspace
                            </h2>
                            <Link to='/owner/workspaceRegister'>
                            <button
                                className="mt-2 mb-2 ml-64 text-gray-600 px-4 py-2 border-2 rounded-md hover:bg-blue-300"
                            >
                                Add Workspace
                            </button>
                            </Link>
                        </div>
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
                    <WorkspaceTable />
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



export default Workspace
