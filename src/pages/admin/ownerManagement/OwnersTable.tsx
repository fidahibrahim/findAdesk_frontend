import { blockOwner, getOwners } from "@/services/api/admin";
import React, { useEffect, useState } from "react"
import { toast } from "sonner";

interface OwnersTableProps {
    search: string,
    page: number,
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

interface Owner {
    _id: string
    status: string
    name: string
    email: string
    isBlocked: boolean
}


const OwnersTable: React.FC<OwnersTableProps> = ({ search, page, setTotalPages }) => {
    const [owners, setOwners] = useState<Owner[]>([])
    const [loading, setLoading] = useState(false);

    const fetchOwner = async () => {
        try {
            setLoading(true);
            const response = await getOwners(search, page)
            if (response?.status == 200) {
                setOwners(response.data.owners)
                setTotalPages(response.data.totalPages)
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
    }, [search, page]);

    const handleBlock = async (ownerId: string) => {
        try {
            const response = await blockOwner(ownerId)
            if(response?.status == 200){
                fetchOwner()
                toast.success(`Owner status has been updated successfully.`);
            }
        } catch (error) {
            toast.error("Failed to update the user's status.")
        }
    }
    return (
        <>
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
                                {owners.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-8 text-gray-600">
                                            No users found
                                        </td>
                                    </tr>
                                ) : (
                                    owners.map((owner, index) => (
                                        <tr
                                            key={owner._id}
                                            className={index % 2 === 1 ? 'bg-blue-50' : 'bg-white'}
                                        >
                                            <td className="py-3 pl-10 pr-2 text-sm">{index + 1}</td>
                                            <td className="py-3 px-4 text-sm">{owner.name}</td>
                                            <td className="py-3 px-4 text-sm">{owner.email}</td>
                                            <td className="py-3 px-4">
                                                <button
                                                    className={`px-4 py-1 rounded-md text-sm ${owner.isBlocked
                                                        ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                                                        }`}
                                                    onClick={() => handleBlock(owner._id)}
                                                >
                                                    {owner.isBlocked
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
        </>
    )
}

export default OwnersTable
