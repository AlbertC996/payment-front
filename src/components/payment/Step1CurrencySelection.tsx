import { OrderData } from './types';
import { ArrowRight, CreditCard } from 'lucide-react';
import { FIAT_CURRENCIES, CRYPTO_CURRENCIES } from './constants';

interface Step1Props {
  data: OrderData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
}

export const Step1CurrencySelection = ({ data, onChange, onNext }: Step1Props) => {
  return (
    <>
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 flex items-center justify-center">
          <CreditCard className="w-14 h-14 text-white" strokeWidth={1.5} />
        </div>
      </div>
      <h2 className="text-white text-2xl font-bold text-center mb-3">Select Currencies</h2>
      <p className="text-white text-sm text-center mb-10 leading-relaxed px-2 opacity-90">
        Choose the currency you want to pay with and the cryptocurrency you want to receive
      </p>
      
      <div className="mb-5">
        <label htmlFor="from" className="text-white text-xs block mb-2 ml-1">Pay With</label>
        <select id="from" name="from" value={data.from} onChange={onChange} className="w-full bg-[#1a1b20] border-2 border-[#6f1c3a] rounded-full px-5 py-3.5 text-white text-sm placeholder-gray-400 shadow-[2px_2px_0_#bb6b88] transition-all duration-200">
          {FIAT_CURRENCIES.map((currency) => (
            <option key={currency.value} value={currency.value}>{currency.label}</option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label htmlFor="to" className="text-white text-xs block mb-2 ml-1">Receive</label>
        <select id="to" name="to" value={data.to} onChange={onChange} className="w-full bg-[#1a1b20] border-2 border-[#6f1c3a] rounded-full px-5 py-3.5 text-white text-sm placeholder-gray-400 shadow-[2px_2px_0_#bb6b88] transition-all duration-200">
          {CRYPTO_CURRENCIES.map((currency) => (
            <option key={currency.value} value={currency.value}>{currency.label}</option>
          ))}
        </select>
      </div>

      <div className="mb-10">
        <label htmlFor="amount" className="text-white text-xs block mb-2 ml-1">Amount</label>
        <input id="amount" name="amount" type="number" value={data.amount} onChange={onChange} placeholder="10.00" min="1" max="1000" className="w-full bg-[#1a1b20] border-2 border-[#6f1c3a] rounded-full px-5 py-3.5 text-white text-sm placeholder-gray-400 shadow-[2px_2px_0_#bb6b88] transition-all duration-200" />
      </div>

      <button onClick={onNext} className="w-full py-3.5 rounded-full font-semibold text-sm border border-[#222025] bg-gradient-to-r from-[#3a373e] to-[#222025] text-[#e34874] shadow-[0_0_25px_rgba(10,20,50,0.7),0_0_10px_rgba(255,255,255,0.5)] text-shadow-[0_0_8px_#e34874] hover:text-[#ffebf8] transition-all duration-200 flex items-center justify-center gap-2">
        Next <ArrowRight className="w-4 h-4" />
      </button>
    </>
  );
};