import { getUsers } from '@/services/api/admin';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface User {
    id: string;
    userId: string;
    status: string;
    name: string;
    email: string;
}

const UserTable = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await getUsers();
            if (response && response.data) {
                setUsers(response.data.users || []);
            } else {
                setUsers([]);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Listed Users</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="pl-3 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Search className="h-4 w-4 text-gray-500" />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg ml-72 shadow-lg">
                <div className="overflow-x-auto">
                    {loading ? (
                        <p>  Loading...</p>
                    ) : users.length === 0 ? (
                        <p>No users found</p>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">sl.no</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">UserID</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Name</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Email</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className={index % 2 === 1 ? 'bg-blue-50' : 'bg-white'}
                                    >
                                        <td className="py-3 px-4 text-sm">{index + 1}</td>
                                        <td className="py-3 px-4 text-sm">{user.userId}</td>
                                        <td className="py-3 px-4 text-sm">{user.status}</td>
                                        <td className="py-3 px-4 text-sm">{user.name}</td>
                                        <td className="py-3 px-4 text-sm">{user.email}</td>
                                        <td className="py-3 px-4">
                                            <button className="bg-blue-100 text-blue-600 px-4 py-1 rounded-md text-sm hover:bg-blue-200">
                                                Block
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <div className="flex justify-center items-center gap-2 py-24 ">
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">&lt;</button>
                <button className="px-3 py-1 border rounded-md bg-blue-50 text-blue-600">1</button>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded-md hover:bg-gray-50">&gt;</button>
            </div>
        </div>
    );
};

export default UserTable;
