import { blockUser, getUsers } from '@/services/api/admin';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface User {
    _id: string;
    status: string;
    name: string;
    email: string;
    isBlocked: boolean
}

interface UserTableProps {
    search: string;
    page: number;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const UserTable: React.FC<UserTableProps> = ({ search, page }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await getUsers(search, page);
            if (response.status === 200) {
                setUsers(response.data.users)
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Please try again later.")
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [search, page]);


    const handleBlock = async (userId: string) => {
        try {
            const response = await blockUser(userId)
            console.log("respooo", response)
            if (response?.status === 200) {
                fetchUser()
                toast.success(`User status has been updated successfully.`);
            }

        } catch (error) {
            toast.error("Failed to update the user's status.")
        }
    }

    return (
        <div className="bg-white rounded-lg ml-64 shadow-lg">
            <div className="overflow-x-auto">
                {loading ? (
                    <p className="text-center py-8 text-gray-600">  Loading...</p>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b ">
                                <th className="py-3  pl-10 pr-2 text-left text-sm font-medium text-gray-600">sl.no</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Name</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Email</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-gray-600">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                users.map((user, index) => (
                                    <tr
                                        key={user._id}
                                        className={index % 2 === 1 ? 'bg-blue-50' : 'bg-white'}
                                    >
                                        <td className="py-3 pl-10 pr-2 text-sm">{index + 1}</td>
                                        <td className="py-3 px-4 text-sm">{user.name}</td>
                                        <td className="py-3 px-4 text-sm">{user.email}</td>
                                        <td className="py-3 px-4">
                                            <button
                                                className={`px-4 py-1 rounded-md text-sm ${user.isBlocked
                                                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                    : 'bg-red-100 text-red-600 hover:bg-red-200'
                                                    }`}
                                                onClick={() => handleBlock(user._id)}
                                            >
                                                {user.isBlocked
                                                    ? 'Unblock'
                                                    : 'Block'
                                                }
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default UserTable;
