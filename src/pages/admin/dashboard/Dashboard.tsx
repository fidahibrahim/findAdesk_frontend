import Header from '@/components/admin/Header';
import Navbar from '@/components/admin/Navbar';
import { getDashboardData } from '@/services/api/admin';
import handleError from '@/utils/errorHandler';
import { useEffect, useState } from 'react';
import RevenueCharts from './RevenueCharts ';

interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  isAdmin: boolean;
  isBlocked: boolean;
  isVerified: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Workspace {
  _id: string;
  ownerId: string;
  workspaceName: string;
  workspaceMail: string;
  workspaceType: string;
  status: string;
  isActive?: boolean;
}

interface Stats {
  userCount: number;
  workspaceCount: number;
  totalRevenue: number;
}

interface DashboardData {
  stats: Stats;
  recentUsers: User[];
  recentWorkspaces: Workspace[];
  monthlyRevenue: number[];
  yearlyRevenue: number[];
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    stats: {
      userCount: 0,
      workspaceCount: 0,
      totalRevenue: 0
    },
    recentUsers: [],
    recentWorkspaces: [],
    monthlyRevenue: Array(12).fill(0),
    yearlyRevenue: Array(5).fill(0)
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await getDashboardData()
        if (response?.data) {
          setDashboardData(response.data.data);
        }
      } catch (error) {
        handleError(error)
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Header />

      {/* Main Content */}
      <div className="ml-64">

        {/* Dashboard Content */}
        <div className="p-8">
          <h1 className="text-xl mb-0 font-semibold">Dashboard</h1>
          <p className='text-lg mb-8 text-gray-500 ' >whole data about your business is here.</p>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm mb-1">Total Users</h3>
              <p className="text-2xl font-semibold">{dashboardData.stats.userCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm mb-1">Total Workspaces</h3>
              <p className="text-2xl font-semibold">{dashboardData.stats.workspaceCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm mb-1">Total Revenue</h3>
              <p className="text-2xl font-semibold">₹{dashboardData.stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>

          {/* Charts */}
          <RevenueCharts
            monthlyRevenue={dashboardData.monthlyRevenue}
            yearlyRevenue={dashboardData.yearlyRevenue}
            loading={loading}
          />

          {/* Recent Activities */}
          <div className="bg-blue-50 rounded-lg shadow-sm mb-8">
            <div className="p-6">
              <h3 className="text-gray-700 font-medium mb-4">Recent Activities</h3>
              {dashboardData.recentUsers && dashboardData.recentUsers.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 text-sm">
                      <th className="pb-3">sl.no</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Name</th>
                      <th className="pb-3">Email</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {dashboardData.recentUsers.map((user, index) => (
                      <tr key={user._id}>
                        <td className="py-2">{index + 1}</td>
                        <td>{formatDate(user.createdAt)}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`px-2 py-1 rounded-full text-xs ${user.isBlocked
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                            }`}>
                            {user.isBlocked ? 'Blocked' : 'Active'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No users found</p>
              )}
              <div className="mt-4 text-right">
                <a href="/admin/userManagement" className="text-blue-600 text-sm hover:underline">View all Users</a>
              </div>
            </div>
          </div>

          {/* Workspace Table */}
          <div className="bg-blue-50 rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="text-gray-700 font-medium mb-4">Recent Workspaces</h3>
              {dashboardData.recentWorkspaces && dashboardData.recentWorkspaces.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 text-sm">
                      <th className="pb-3">sl.no</th>
                      <th className="pb-3">Name</th>
                      <th className="pb-3">Email</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {dashboardData.recentWorkspaces.map((workspace, index) => (
                      <tr key={workspace._id}>
                        <td className="py-2">{index + 1}</td>
                        <td>{workspace.workspaceName}</td>
                        <td>{workspace.workspaceMail}</td>
                        <td>{workspace.workspaceType}</td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded-full text-xs${workspace.status === 'Approved'
                              ? 'bg-green-100 text-green-800'
                              : workspace.status === 'Rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                              }`}
                          >
                            {workspace.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No workspaces found</p>
              )}
              <div className="mt-4 text-right">
                <a href="/admin/workspaceManagement" className="text-blue-600 text-sm hover:underline">View all Workplaces</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;