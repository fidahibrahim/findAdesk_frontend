import { useState } from 'react';
import Layout from './Sidebar';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Plus, Send, Download, CreditCard, MoreHorizontal } from 'lucide-react';

const Wallet = () => {
    const [transactions, setTransactions] = useState([
        { id: 1, type: 'deposit', amount: 250.00, date: '2025-04-05', status: 'completed', description: 'Deposit from Bank' },
        { id: 2, type: 'withdraw', amount: 75.50, date: '2025-04-03', status: 'completed', description: 'Withdrawal to Bank' },
        { id: 3, type: 'deposit', amount: 120.00, date: '2025-04-01', status: 'completed', description: 'Payment Received' },
        { id: 4, type: 'withdraw', amount: 45.99, date: '2025-03-28', status: 'completed', description: 'Online Purchase' },
    ]);

    const balance = 748.51;

    return (
        <Layout>
            <div className="p-6 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">My Wallet</h1>
                </div>

                {/* Balance Card */}
                <div className="bg-blue-700 text-white rounded-xl p-6 mb-6">
                    <div className="flex items-center mb-2">
                        <WalletIcon className="mr-2" size={24} />
                        <span className="text-sm opacity-80">Available Balance</span>
                    </div>
                    <div className="text-3xl font-bold mb-4">₹ {balance.toFixed(2)}</div>
                </div>

                {/* Quick Actions */}
                {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 hover:bg-gray-100 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer">
                        <div className="bg-blue-100 p-3 rounded-full mb-2">
                            <Download size={20} className="text-blue-600" />
                        </div>
                        <span className="text-sm font-medium">Deposit</span>
                    </div>
                    <div className="bg-gray-50 hover:bg-gray-100 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer">
                        <div className="bg-blue-100 p-3 rounded-full mb-2">
                            <Send size={20} className="text-blue-600" />
                        </div>
                        <span className="text-sm font-medium">Withdraw</span>
                    </div>
                    <div className="bg-gray-50 hover:bg-gray-100 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer">
                        <div className="bg-blue-100 p-3 rounded-full mb-2">
                            <CreditCard size={20} className="text-blue-600" />
                        </div>
                        <span className="text-sm font-medium">Cards</span>
                    </div>
                    <div className="bg-gray-50 hover:bg-gray-100 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer">
                        <div className="bg-blue-100 p-3 rounded-full mb-2">
                            <MoreHorizontal size={20} className="text-blue-600" />
                        </div>
                        <span className="text-sm font-medium">More</span>
                    </div>
                </div> */}

                {/* Transaction History */}
                <div className="bg-blue-50 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between border-b border-gray-200 p-4">
                        <h2 className="font-semibold">Transaction History</h2>
                        <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {transactions.map(transaction => (
                            <div key={transaction.id} className="p-4 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className={`p-2 rounded-full mr-3 ${transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'}`}>
                                            {transaction.type === 'deposit' ?
                                                <ArrowDownLeft size={16} className="text-green-600" /> :
                                                <ArrowUpRight size={16} className="text-red-600" />
                                            }
                                        </div>
                                        <div>
                                            <p className="font-medium">{transaction.description}</p>
                                            <p className="text-xs text-gray-500">{transaction.date}</p>
                                        </div>
                                    </div>
                                    <div className={`font-semibold ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                                        {transaction.type === 'deposit' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Wallet;