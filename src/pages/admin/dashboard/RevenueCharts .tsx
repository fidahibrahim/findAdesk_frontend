import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface RevenueChartsProps {
    monthlyRevenue: number[];
    yearlyRevenue: number[];
    loading: boolean;
}

const RevenueCharts = ({ monthlyRevenue, yearlyRevenue, loading }: RevenueChartsProps) => {
    // Monthly Revenue Chart Configuration
    const monthlyChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenue (₹)',
                data: monthlyRevenue,
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
            },
        ],
    };

    const monthlyChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Monthly Revenue',
            },
        },
    };

    // Yearly Revenue Chart Configuration
    const currentYear = new Date().getFullYear();
    const yearlyChartData = {
        labels: [
            currentYear - 4,
            currentYear - 3,
            currentYear - 2,
            currentYear - 1,
            currentYear,
        ],
        datasets: [
            {
                label: 'Revenue (₹)',
                data: yearlyRevenue,
                backgroundColor: 'rgba(16, 185, 129, 0.5)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 1,
            },
        ],
    };

    const yearlyChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Yearly Revenue',
            },
        },
    };

    return (
        <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-700 font-medium mb-4">Monthly Revenue</h3>
                <div className="h-48">
                    {!loading && <Bar data={monthlyChartData} options={monthlyChartOptions} />}
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-700 font-medium mb-4">Yearly Revenue</h3>
                <div className="h-48">
                    {!loading && <Bar data={yearlyChartData} options={yearlyChartOptions} />}
                </div>
            </div>
        </div>
    );
};

export default RevenueCharts;