
const WorkspaceTable = () => {
    return (
        <div className="bg-white rounded-lg ml-64 shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="py-3 pl-10 pr-1 text-left text-sm font-medium text-gray-600">Sl. No</th>
                            <th className="py-3 text-left  pl-16 px-3 text-sm font-medium text-gray-600">Workspace Name</th>
                            <th className="py-3 text-left pl-10 text-sm font-medium text-gray-600">Price/hr</th>
                            <th className="py-3 text-left pl-10 text-sm font-medium text-gray-600">Status</th>
                            <th className="py-3 text-left px-24 pl-10 text-sm font-medium text-gray-600">Actions</th>
                            <th className="py-3 text-left text-sm font-medium text-gray-600"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* No data available */}
                        {/* <tr>
              <td colSpan={4} className="text-center py-8 text-gray-600">
                No users found
              </td>
            </tr> */}

                        {/* Example row */}
                        <tr className="bg-blue-50">
                            <td className="py-3 pl-10 pr-2 text-sm">1</td>
                            <td className="py-3 px-16 text-sm">John Doe</td>
                            <td className="py-3 px-12 text-sm">₹ 400</td>
                            <td className="py-3 px-11 text-sm">Active</td>
                            <td className="py-3 px-7">
                                <button
                                    className="bg-blue-100 text-blue-600 hover:bg-blue-200 mr-3 py-1 px-3 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-blue-100 text-blue-600 hover:bg-blue-200 py-1 px-3 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                            <td className="py-3 px-10 text-sm text-blue-500 underline "> View </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkspaceTable;
