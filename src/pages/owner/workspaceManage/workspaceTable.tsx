import { workspaceRes } from "@/interface/owner/WorkspaceRegisterValues";
import { UserTableProps } from "@/pages/admin/userMnagement/UserTable";
import { deleteWorkspace, listWorkspaces } from "@/services/api/owner";
import handleError from "@/utils/errorHandler";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const WorkspaceTable: React.FC<UserTableProps> = ({ search, page, setTotalPages }) => {

    const [workspaces, setWorkspaces] = useState<workspaceRes[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate()


    const { confirm } = Modal;

    const handleVievClick = (workspaceId: string | undefined) => {
        navigate("/owner/viewDetails", { state: { workspaceId: workspaceId } })
    }

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const response = await listWorkspaces(search, page)
                if (response.status === 200) {
                    setWorkspaces(response.data.data.workspaces)
                    setTotalPages(response.data.data.totalPages)
                }
            } catch (error) {
                handleError(error)
            } finally {
                setLoading(false);
            }
        }
        fetchWorkspaces()
    }, [search, page])

    const handleDelete = async (workspaceId: string | undefined) => {
        try {
            const response = await deleteWorkspace(workspaceId)
            if (response) {
                const updatedWorkspaces = workspaces.filter(workspace => workspace._id !== workspaceId);
                setWorkspaces(updatedWorkspaces);
            }
            toast.success("Your workspace has been deleted.")
        } catch (error) {
            handleError(error)
        }
    }

    const showDeleteConfirm = (workspaceId: string | undefined) => {
        confirm({
            title: "Are you sure you want to delete this workspace?",
            icon: <ExclamationCircleFilled />,
            content: "This action cannot be undone.",
            okText: "Yes, Delete",
            okType: "danger",
            cancelText: "No",
            onOk() {
                handleDelete(workspaceId);
            },
            onCancel() {
                console.log("Delete action cancelled.");
            },
        });
    };

    const handleEdit = (workspaceId: string | undefined) => {
        navigate("/owner/editWorkspace", { state: { workspaceId: workspaceId } })
    }

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
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-600">
                                    Loading...
                                </td>
                            </tr>
                        ) : workspaces.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-600">
                                    No data found
                                </td>
                            </tr>
                        ) : (
                            workspaces.map((workspace, index) => (
                                <tr key={workspace._id} className="bg-blue-50">
                                    <td className="py-3 pl-10 pr-2 text-sm">{(page - 1) * 6 + index + 1}</td>
                                    <td className="py-3 px-16 text-sm">{workspace.workspaceName}</td>
                                    <td className="py-3 px-12 text-sm">₹ {workspace.pricePerHour}</td>
                                    <td className="py-3 px-11 text-sm">{workspace.status}</td>
                                    <td className="py-3 px-7">
                                        <button
                                            className="bg-blue-100 text-blue-600 hover:bg-blue-200 mr-3 py-1 px-3 rounded"
                                            onClick={() => handleEdit(workspace._id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-blue-100 text-blue-600 hover:bg-blue-200 py-1 px-3 rounded"
                                            onClick={() => showDeleteConfirm(workspace._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td onClick={() => handleVievClick(workspace._id)} className="py-3 px-10 text-sm text-blue-500 underline"> View </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkspaceTable;
