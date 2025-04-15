import { useEffect, useState } from 'react';
import Layout from './Sidebar';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import handleError from '@/utils/errorHandler';
import { fetchWallet } from '@/services/api/user';
import { Link } from 'react-router-dom';

interface Transaction {
    _id: string;
    type: 'credit' | 'debit';
    date: string;
    amount: number;
    transactionId: string;
}

interface WalletData {
    balance: number;
    transactions: Transaction[];
    _id: string;
    userId: string;
}


const Wallet = () => {
    const [walletData, setWalletData] = useState<WalletData>({
        balance: 0,
        transactions: [],
        _id: '',
        userId: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWalletData = async () => {
            try {
                setLoading(true)
                const response = await fetchWallet()
                setWalletData(response.data.data);
                console.log(response)
            } catch (error) {
                handleError(error)
            } finally {
                setLoading(false);
            }
        }
        fetchWalletData();
    }, [])

    const getTransactionType = (type: string) => {
        return type === 'credit' ? 'deposit' : 'withdraw';
    };

    const getTransactionDescription = (transaction: Transaction) => {
        if (transaction.type === 'credit') {
            return 'Deposit to Wallet';
        } else {
            return 'Withdrawal from Wallet';
        }
    };

    const onRecharge = () => {
    }
    const latestTransactions = walletData.transactions.slice(0, 3);
    return (
        <Layout>
            <div className="p-6 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">My Wallet</h1>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        <p className="mt-2">Loading wallet...</p>
                    </div>
                ) : (
                    <>
                        < div className="bg-blue-700 text-white rounded-xl p-6 mb-6">
                            <div className="flex items-center mb-2">
                                <WalletIcon className="mr-2" size={24} />
                                <span className="text-sm opacity-80">Available Balance</span>
                            </div>
                            <div className="text-3xl font-bold mb-4">₹ {walletData.balance.toFixed(2)}</div>

                            {walletData.balance <= 0 && (
                                <button
                                    onClick={onRecharge}
                                    className="mt-2 bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                                >
                                    Recharge Your Wallet
                                </button>
                            )}
                        </div>

                        <div className="bg-blue-50 rounded-xl border border-gray-200">
                            <div className="flex items-center justify-between border-b border-gray-200 p-4">
                                <h2 className="font-semibold">Latest Transactions</h2>
                                <Link
                                    to="/transactionHistory"
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    View All
                                </Link>
                            </div>
                            {walletData.transactions.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    No transactions yet
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {latestTransactions.map(transaction => {
                                        const transactionType = getTransactionType(transaction.type);
                                        return (
                                            <div key={transaction._id || transaction.transactionId} className="p-4 hover:bg-gray-50">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className={`p-2 rounded-full mr-3 ${transactionType === 'deposit' ? 'bg-green-100' : 'bg-red-100'}`}>
                                                            {transactionType === 'deposit' ?
                                                                <ArrowDownLeft size={16} className="text-green-600" /> :
                                                                <ArrowUpRight size={16} className="text-red-600" />
                                                            }
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{getTransactionDescription(transaction)}</p>
                                                            <p className="text-xs text-gray-500">
                                                                {new Date(transaction.date).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className={`font-semibold ${transactionType === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                                                        {transactionType === 'deposit' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                    </>
                )}
            </div>
        </Layout >
    );
};

export default Wallet;