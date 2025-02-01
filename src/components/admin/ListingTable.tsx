
interface TableProps<T> {
    data: T[];
    loading: boolean;
    search: string;
    page: number;
    totalPages: number;
    handleBlock: (id: string) => void;
    isUser: boolean;
}

const ListingTable = <T extends { _id: string; name: string; email: string; isBlocked: boolean }>
 ({ data, loading, page, handleBlock  }: TableProps<T>)  => {

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
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-gray-600">
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                data.map((item, index) => (
                                    <tr
                                        key={item._id}
                                        className={index % 2 === 1 ? 'bg-blue-50' : 'bg-white'}
                                    >
                                        <td className="py-3 pl-10 pr-2 text-sm">{(page - 1) * 6 + index + 1}</td>
                                        <td className="py-3 px-4 text-sm">{item.name}</td>
                                        <td className="py-3 px-4 text-sm">{item.email}</td>
                                        <td className="py-3 px-4">
                                            <button
                                                className={`px-4 py-1 rounded-md text-sm ${item.isBlocked
                                                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                    : 'bg-red-100 text-red-600 hover:bg-red-200'
                                                    }`}
                                                onClick={() => handleBlock(item._id)}
                                            >
                                                {item.isBlocked
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

export default ListingTable;
