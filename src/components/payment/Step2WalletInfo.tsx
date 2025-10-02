import { OrderData } from './types';
import { Wallet, ArrowRight, ArrowLeft } from 'lucide-react';
import { COUNTRIES } from './constants';

interface Step2Props {
  data: OrderData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2WalletInfo = ({ data, onChange, onNext, onBack }: Step2Props) => {
  return (
    <>
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 flex items-center justify-center">
          <Wallet className="w-14 h-14 text-white" strokeWidth={1.5} />
        </div>
      </div>
      <h2 className="text-white text-2xl font-bold text-center mb-3">Your Wallet</h2>
      <p className="text-white text-sm text-center mb-10 leading-relaxed px-2 opacity-90">
        Enter your wallet address where the cryptocurrency will be sent
      </p>
      
      <div className="mb-5">
        <label htmlFor="address" className="text-white text-xs block mb-2 ml-1">Wallet Address</label>
        <input id="address" name="address" type="text" value={data.address} onChange={onChange} placeholder="Enter your crypto wallet address" className="w-full bg-[#1a1b20] border-2 border-[#6f1c3a] rounded-full px-5 py-3.5 text-white text-sm placeholder-gray-400 shadow-[2px_2px_0_#bb6b88] transition-all duration-200" />
      </div>

      <div className="mb-5">
        <label htmlFor="country" className="text-white text-xs block mb-2 ml-1">Country</label>
        <select id="country" name="country" value={data.country} onChange={onChange} className="w-full bg-[#1a1b20] border-2 border-[#6f1c3a] rounded-full px-5 py-3.5 text-white text-sm placeholder-gray-400 shadow-[2px_2px_0_#bb6b88] transition-all duration-200">
          {COUNTRIES.map((country) => (
            <option key={country.value} value={country.value}>{country.label}</option>
          ))}
        </select>
      </div>

      <div className="mb-10">
        <label htmlFor="email" className="text-white text-xs block mb-2 ml-1">Email</label>
        <input id="email" name="email" type="email" value={data.email} onChange={onChange} placeholder="your@email.com" className="w-full bg-[#1a1b20] border-2 border-[#6f1c3a] rounded-full px-5 py-3.5 text-white text-sm placeholder-gray-400 shadow-[2px_2px_0_#bb6b88] transition-all duration-200" />
      </div>

      <div className="flex gap-5">
        <button onClick={onBack} className="flex-1 py-3.5 rounded-full font-semibold text-sm border border-[#222025] bg-gradient-to-r from-[#3a373e] to-[#222025] text-[#e34874] shadow-[0_0_25px_rgba(10,20,50,0.7),0_0_10px_rgba(255,255,255,0.5)] text-shadow-[0_0_8px_#e34874] hover:text-[#ffebf8] transition-all duration-200 flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={onNext} className="flex-1 py-3.5 rounded-full font-semibold text-sm border border-[#222025] bg-gradient-to-r from-[#3a373e] to-[#222025] text-[#e34874] shadow-[0_0_25px_rgba(10,20,50,0.7),0_0_10px_rgba(255,255,255,0.5)] text-shadow-[0_0_8px_#e34874] hover:text-[#ffebf8] transition-all duration-200 flex items-center justify-center gap-2">
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};