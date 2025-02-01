import Header from '@/components/admin/Header'
import Navbar from '@/components/admin/Navbar'
import AdminSearch from '@/components/admin/AdminSearch';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import Pagination from '@/components/generic/Pagination';
import ListingTable from '@/components/admin/ListingTable';
import { blockOwner, getOwners } from '@/services/api/admin';
import { toast } from 'sonner';

interface Owner {
    _id: string
    status: string
    name: string
    email: string
    isBlocked: boolean
}

const Owners = () => {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [owners, setOwners] = useState<Owner[]>([])
    const [loading, setLoading] = useState(false);

    const debouncedSearch = AdminSearch(search, 500)

    const fetchOwner = async () => {
        try {
            setLoading(true);
            const response = await getOwners(search, page)
            if (response?.status == 200) {
                setOwners(response.data.data.owners)
                setTotalPages(response.data.data.totalPages)
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Please try again later.")
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOwner();
    }, [debouncedSearch, page]);

    const handleBlock = async (ownerId: string) => {
        try {
            const response = await blockOwner(ownerId)
            if (response?.status == 200) {
                setOwners(prevOwners =>
                    prevOwners.map(owner =>
                        owner._id === ownerId ? { ...owner, isBlocked: !owner.isBlocked } : owner
                    )
                );
                toast.success(`Owner status has been updated successfully.`);
            }
        } catch (error) {
            toast.error("Failed to update the user's status.")
        }
    }


    return (
        <>
            <div>
                <Navbar />
                <Header />
                <div className="p-14">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl px-72 font-medium text-gray-400">Listed Owners</h2>
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

                    {/* <OwnersTable search={debouncedSearch} page={page} setTotalPages={setTotalPages} /> */}
                    <ListingTable data={owners}
                        loading={loading}
                        search={debouncedSearch}
                        page={page}
                        totalPages={totalPages}
                        handleBlock={handleBlock}
                        isUser={true}
                    />

                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        setPage={setPage}
                    />
                </div>
            </div>
        </>
    )
}

export default Owners
