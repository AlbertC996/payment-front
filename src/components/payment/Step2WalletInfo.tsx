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
        <label htmlFor="address" className="paylabel">Wallet Address</label>
        <input id="address" name="address" type="text" value={data.address} onChange={onChange} placeholder="Enter your crypto wallet address" className="payipt" />
      </div>

      <div className="mb-5">
        <label htmlFor="country" className="paylabel">Country</label>
        <select id="country" name="country" value={data.country} onChange={onChange} className="payipt">
          {COUNTRIES.map((country) => (
            <option key={country.value} value={country.value}>{country.label}</option>
          ))}
        </select>
      </div>

      <div className="mb-10">
        <label htmlFor="email" className="paylabel">Email</label>
        <input id="email" name="email" type="email" value={data.email} onChange={onChange} placeholder="your@email.com" className="payipt" />
      </div>

      <div className="flex gap-5">
        <button onClick={onBack} className="paybtn">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={onNext} className="paybtn">
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};