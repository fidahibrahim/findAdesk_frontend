import { useEffect, useState } from 'react';
import Layout from './Sidebar';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, ChevronLeft } from 'lucide-react';
import handleError from '@/utils/errorHandler';
import { fetchWallet } from '@/services/api/user';
import { Link } from 'react-router-dom';

interface Transaction {
    _id: string;
    type: 'credit' | 'debit';
    date: string;
    amount: number;
    transactionId: string;
    description?: string;
}

interface WalletData {
    balance: number;
    transactions: Transaction[];
    _id: string;
    userId: string;
}

const Transactions = () => {
    const [walletData, setWalletData] = useState<WalletData>({
        balance: 0,
        transactions: [],
        _id: '',
        userId: '',
    });
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');

    useEffect(() => {
        const fetchWalletData = async () => {
            try {
                setLoading(true);
                const response = await fetchWallet();
                setWalletData(response.data.data);
            } catch (error) {
                handleError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchWalletData();
    }, []);

    const getTransactionType = (type: string) => {
        return type === 'credit' ? 'deposit' : 'withdraw';
    };

    const getTransactionDescription = (transaction: Transaction) => {
        if (transaction.description) {
            return transaction.description;
        }

        if (transaction.type === 'credit') {
            return 'Deposit to Wallet';
        } else {
            return 'Withdrawal from Wallet';
        }
    };

    const filteredTransactions = walletData.transactions.filter((transaction) => {
        if (filter === 'all') return true;
        return transaction.type === filter;
    });

    return (
        <Layout>
            <div className="p-6 max-w-6xl mx-auto">
                {/* Header with back button */}
                <div className="flex items-center mb-6">
                    <Link to="/profile/wallet" className="mr-2 p-2 rounded-full hover:bg-gray-100">
                        <ChevronLeft size={20} />
                    </Link>
                    <h1 className="text-2xl font-bold">Transaction History</h1>
                </div>


                {/* Balance card */}
                <div className="bg-blue-700 text-white rounded-xl p-4 mb-6">
                    <div className="flex items-center mb-1">
                        <WalletIcon className="mr-2" size={20} />
                        <span className="text-sm opacity-80">Current Balance</span>
                    </div>
                    <div className="text-2xl font-bold">₹ {walletData.balance.toFixed(2)}</div>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        <p className="mt-2">Loading transactions...</p>
                    </div>
                ) : (
                    <>
                        {/* Filter buttons */}
                        <div className="mb-4 flex space-x-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-lg ${filter === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('credit')}
                                className={`px-4 py-2 rounded-lg ${filter === 'credit'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                Deposits
                            </button>
                            <button
                                onClick={() => setFilter('debit')}
                                className={`px-4 py-2 rounded-lg ${filter === 'debit'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                Withdrawals
                            </button>
                        </div>

                        {/* Transactions list */}
                        <div className="bg-white rounded-xl border border-gray-200">
                            {filteredTransactions.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    {filter === 'all'
                                        ? 'No transactions yet'
                                        : filter === 'credit'
                                            ? 'No deposits yet'
                                            : 'No withdrawals yet'}
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {filteredTransactions.map(transaction => {
                                        const transactionType = getTransactionType(transaction.type);
                                        return (
                                            <div
                                                key={transaction._id || transaction.transactionId}
                                                className="p-4 hover:bg-gray-50"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className={`p-2 rounded-full mr-3 ${transactionType === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                                                            }`}>
                                                            {transactionType === 'deposit' ?
                                                                <ArrowDownLeft size={16} className="text-green-600" /> :
                                                                <ArrowUpRight size={16} className="text-red-600" />
                                                            }
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{getTransactionDescription(transaction)}</p>
                                                            <p className="text-xs text-gray-500">
                                                                {new Date(transaction.date).toLocaleDateString()} •
                                                                <span className="ml-1">
                                                                    {new Date(transaction.date).toLocaleTimeString([], {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })}
                                                                </span>
                                                            </p>
                                                            <p className="text-xs text-gray-400 mt-1">
                                                                ID: {transaction.transactionId}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className={`font-semibold ${transactionType === 'deposit' ? 'text-green-600' : 'text-red-600'
                                                        }`}>
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
        </Layout>
    );
};

export default Transactions;