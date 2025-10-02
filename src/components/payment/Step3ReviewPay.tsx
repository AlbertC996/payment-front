import { OrderData } from './types';
import { Gift, ArrowLeft } from 'lucide-react';

interface Step3Props {
  data: OrderData;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  truncateAddress: (address: string) => string;
  buttonStyles: string;
}

export const Step3ReviewPay = ({ data, loading, onSubmit, onBack, truncateAddress, buttonStyles }: Step3Props) => {
  return (
    <>
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 flex items-center justify-center">
          <Gift className="w-14 h-14 text-white" strokeWidth={1.5} />
        </div>
      </div>
      <h2 className="text-white text-2xl font-bold text-center mb-3">Review & Pay</h2>
      <p className="text-white text-sm text-center mb-10 leading-relaxed px-2 opacity-90">
        Review your payment details before proceeding
      </p>
      
      <div className="mb-10 p-5 bg-[#1a1b20] rounded-2xl">
        <div className="flex justify-between mb-3">
          <span className="text-gray-400 text-sm">Pay</span>
          <span className="text-white font-semibold">{data.amount} {data.from}</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-gray-400 text-sm">Receive</span>
          <span className="text-white font-semibold">{data.to}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Wallet</span>
          <span className="text-white font-semibold text-xs">{truncateAddress(data.address)}</span>
        </div>
      </div>

      <div className="flex gap-5">
        <button onClick={onBack} className={buttonStyles}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={onSubmit} disabled={loading} className={buttonStyles}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </>
  );
};