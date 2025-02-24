import { useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { getWorkspaces, updateStatus } from '@/services/api/admin';
import handleError from '@/utils/errorHandler';
import { workspaceRes } from '@/interface/owner/WorkspaceRegisterValues';
import { UserTableProps } from '../userMnagement/UserTable';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const WorkspaceTable: React.FC<UserTableProps> = ({ search, page, setTotalPages, filter }) => {

    const [workspaces, setWorkspaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getWorkspaces(search, page, filter)
            if (response?.status === 200) {
                setWorkspaces(response.data.data.workspaces)
                setTotalPages(response.data.data.totalPages)
            }
            setLoading(false);
        } catch (error) {
            toast.error("Something went wrong. Please try again later.")
            handleError(error)
            setLoading(false);
        }
    }

    const handleStatusUpdate = async (workspaceId: string | undefined, status: string) => {
        setLoading(true);
        try {
            const response = await updateStatus(workspaceId, status)
            if (response?.status == 200) {
                fetchData()
                toast.success("Status updated Successfully")
            }
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData()
    }, [search, page, filter])

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved':
                return 'bg-green-100 text-green-800';
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };
    const handleVievClick = (workspaceId: string | undefined) => {
        navigate("/admin/workspaceDetails", { state: { workspaceId: workspaceId } })
    }

    return (
        <div className="bg-white  ml-72 rounded-lg shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            sl.no
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                </thead>
                {workspaces.length === 0 ? (
                    <div className="px-6 py-4 text-center text-sm text-gray-500">
                        No workspaces found matching your filter.
                    </div>
                ) : (
                    <tbody className="bg-white divide-y divide-gray-200">
                        {workspaces.map((workspace: workspaceRes, index: number) => (
                            <tr key={workspace._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {(page - 1) * 6 + index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {workspace.workspaceMail}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {workspace.workspaceName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(workspace.status)}`}>
                                        {workspace.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="relative">
                                        {workspace.status === 'pending' ? (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        disabled={loading}
                                                        className="w-32"
                                                    >
                                                        Actions
                                                        <ChevronDown className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem
                                                        onClick={() => handleStatusUpdate(workspace._id, "Approved")}
                                                    >
                                                        Approve
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleStatusUpdate(workspace._id, "Rejected")}
                                                    >
                                                        Reject
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        ) : (
                                            <span className="text-gray-500 text-sm">
                                                Already Updated
                                            </span>
                                        )}

                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-blue-400 underline'
                                    onClick={() => handleVievClick(workspace._id)}
                                >
                                    view
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}

            </table>
        </div>
    );
};

export default WorkspaceTable;