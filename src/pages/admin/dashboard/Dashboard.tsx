import Header from '@/components/admin/Header';
import Navbar from '@/components/admin/Navbar';

const Dashboard = () => {
  

  // Sample data for recent activities
  const recentUsers = [
    { id: '001234567', date: '13/10/24', name: 'Sarah Broxton', email: 'test@gmail.com', mobile: '9875265890' },
    { id: '001234679', date: '13/10/24', name: 'normal', email: 'normal@gmail.com', mobile: '9875265890' }
  ];

  const workspaces = [
    { id: '001234567', date: '13/10/24', name: 'Workspace', count: 1, status: 'Active' },
    { id: '001234679', date: '13/10/24', name: 'WS1', count: 2, status: 'Active' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <Header/>

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
              <p className="text-2xl font-semibold">0</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm mb-1">Total Revenue</h3>
              <p className="text-2xl font-semibold">0</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-500 text-sm mb-1">Last Week Revenue</h3>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-700 font-medium mb-4">Monthly Revenue</h3>
              <div className="h-48 flex items-end space-x-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex-1 bg-gray-200 rounded-t" style={{ height: `${Math.random() * 100}%` }} />
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-gray-700 font-medium mb-4">Yearly Revenue</h3>
              <div className="h-48 flex items-end space-x-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex-1 bg-gray-200 rounded-t" style={{ height: `${Math.random() * 100}%` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="p-6">
              <h3 className="text-gray-700 font-medium mb-4">Recent Activities</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-sm">
                    <th className="pb-3">ID</th>
                    <th className="pb-3">UserID</th>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Mobile</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="py-2">{user.id}</td>
                      <td>{user.date}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-right">
                <a href="#" className="text-blue-600 text-sm hover:underline">View all Users</a>
              </div>
            </div>
          </div>

          {/* Workspace Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-sm">
                    <th className="pb-3">ID</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Count</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {workspaces.map((workspace) => (
                    <tr key={workspace.id}>
                      <td className="py-2">{workspace.id}</td>
                      <td>{workspace.date}</td>
                      <td>{workspace.name}</td>
                      <td>{workspace.count}</td>
                      <td>{workspace.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-right">
                <a href="#" className="text-blue-600 text-sm hover:underline">View all Workplaces</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;