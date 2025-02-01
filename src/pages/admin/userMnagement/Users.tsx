import Header from '@/components/admin/Header'
import Navbar from '@/components/admin/Navbar'
import AdminSearch from '@/components/admin/AdminSearch';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import ListingTable from '@/components/admin/ListingTable';
import { blockUser, getUsers } from '@/services/api/admin';
import { toast } from 'sonner';
import Pagination from '@/components/generic/Pagination';

interface User {
  _id: string;
  status: string;
  name: string;
  email: string;
  isBlocked: boolean
}


const Users = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = AdminSearch(search, 500)

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await getUsers(search, page);
      console.log(response)
      if (response.status === 200) {
        setUsers(response.data.data.users)
        setTotalPages(response.data.data.totalPages)
      }
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again later.")
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [debouncedSearch, page]);


  const handleBlock = async (userId: string) => {
    try {
      const response = await blockUser(userId)
      if (response?.status === 200) {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user._id === userId ? { ...user, isBlocked: !user.isBlocked } : user
          )
        );
        toast.success(`User status has been updated successfully.`);
      }

    } catch (error) {
      toast.error("Failed to update the user's status.")
    }
  }

  return (
    <div>
      <Navbar />
      <Header />
      <div className="p-14">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl px-72 font-medium text-gray-400">Listed Users</h2>
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
        
        <ListingTable data={users}
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
  )
}

export default Users
