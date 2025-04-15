import { fetchWallet } from "@/services/api/user";
import handleError from "@/utils/errorHandler";
import { useEffect, useState } from "react";

interface PaymentMethodProps {
  onPaymentMethodChange: (method: string) => void;
  grandTotal?: number;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  onPaymentMethodChange,
  grandTotal = 0
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchWalletDetails();
  }, []);

  const fetchWalletDetails = async () => {
    try {
      setLoading(true);
      const response = await fetchWallet();
      if (response.status === 200) {
        setWalletBalance(response.data.data.balance);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };


  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setSelectedMethod(value);
    onPaymentMethodChange(value);
  };

  const insufficientFunds = walletBalance < grandTotal;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">
          3
        </span>
        Payment Method
      </h2>

      <div className="flex gap-4 mb-4">
        <div className="flex items-center">
          <input
            id="paymentGateway"
            name="paymentMethod"
            type="radio"
            value="paymentGateway"
            checked={selectedMethod === "paymentGateway"}
            onChange={handlePaymentMethodChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
          />
          <label
            htmlFor="paymentGateway"
            className="ml-2 block text-sm font-medium text-gray-700"
          >
            Online Payment
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="wallet"
            name="paymentMethod"
            type="radio"
            value="wallet"
            checked={selectedMethod === "wallet"}
            onChange={handlePaymentMethodChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
          />
          <div className="ml-2">
            <label
              htmlFor="wallet"
              className={`block text-sm font-medium ${insufficientFunds ? "text-gray-400" : "text-gray-700"
                }`}
            >
              Pay With Wallet
              {loading ? (
                <span className="ml-2 text-xs italic">Loading...</span>
              ) : (
                <span className="ml-2 text-xs font-normal">
                  (Available: ₹ {walletBalance.toFixed(2)})
                </span>
              )}
            </label>
            {insufficientFunds && !loading && (
              <p className="text-xs text-red-500 mt-1">
                Insufficient funds. Add money to your wallet to use this payment method.
              </p>
            )}
          </div>
        </div>
      </div>

      {selectedMethod === "wallet" && !insufficientFunds && (
        <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md">
          <p className="text-sm text-green-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            ₹ {grandTotal.toFixed(2)} will be deducted from your wallet.
          </p>
        </div>
      )}

    </div>
  );
};

export default PaymentMethod;