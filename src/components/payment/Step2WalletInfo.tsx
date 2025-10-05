import { OrderData } from './types';
import { Wallet, ArrowRight, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { COUNTRIES } from './constants';
import { useState } from 'react';
import Image from 'next/image';


interface Step2Props {
  data: OrderData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
  onBack: () => void;
}


export const Step2WalletInfo = ({ data, onChange, onNext, onBack }: Step2Props) => {
  const [countryDropdown, setCountryDropdown] = useState(false);
  const [addressTouched, setAddressTouched] = useState(false);
  const [error, setError] = useState<{ address?: string }>({});


  // Validate wallet address (basic: not empty)
  const validateAddress = () => {
    const newError: { address?: string } = {};
    if (!data.address || data.address.trim() === "") {
      newError.address = "Wallet address is required.";
    }
    setError(newError);
  };

  // On next, validate address
  const handleNext = () => {
    validateAddress();
    if (!error.address && data.address && data.address.trim() !== "") {
      onNext();
    }
  };

  // On address blur, validate
  const handleAddressBlur = () => {
    setAddressTouched(true);
    validateAddress();
  };

  // Button should be disabled if addressTouched and address is empty
  const nextDisabled = addressTouched && (!data.address || data.address.trim() === "");

  // Custom dropdown for country
  const selectedCountry = COUNTRIES.find(c => c.value === data.country);

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
        <input
          id="address"
          name="address"
          type="text"
          value={data.address}
          onChange={onChange}
          onBlur={handleAddressBlur}
          onFocus={() => setAddressTouched(true)}
          placeholder="Enter your crypto wallet address"
          className="payipt"
          required
        />
        {error.address && addressTouched && (
          <div className="text-xs text-red-400 mt-1">{error.address}</div>
        )}
      </div>

      <div className={`mb-5 relative ${!countryDropdown ? "z-20" : ""}`}>  
        <label className="paylabel relative z-[100005]">Country</label>
        <div className={`relative ${countryDropdown ? 'z-[99999]' : 'z-50'}`}>  
          <div
            onClick={() => setCountryDropdown(v => !v)}
            className={`payipt flex items-center justify-between cursor-pointer select-none relative ${countryDropdown ? 'z-[100000]' : 'z-[100]'} `}
          >
            <div className="flex items-center gap-3">
              <span className={selectedCountry ? 'text-white' : 'text-gray-400'}>
                {selectedCountry ? selectedCountry.label : 'please select'}
              </span>
            </div>
            {countryDropdown ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
          </div>
          {countryDropdown && (
            <>
              <div
                onClick={() => setCountryDropdown(false)}
                className={`${countryDropdown ? 'z-[99990]' : 'z-10'} fixed inset-0 bg-black/40 backdrop-blur-sm`}
              />
              <div
                className={`${countryDropdown ? 'z-[100001]' : 'z-[200]'} absolute top-full mt-2 left-0 right-0 max-h-[220px] rounded-xl border border-gray-700 bg-gray-900 shadow-2xl overflow-y-auto`}
              >
                {COUNTRIES.map((country, idx) => (
                  <div
                    key={country.value ? country.value : `${country.label}-${idx}`}
                    className={`transition-all cursor-pointer px-4 py-2 border-b border-gray-800 last:border-b-0 flex items-center gap-2`
                      + (data.country === country.value ? ' bg-pink-600/80 text-white font-bold shadow-inner' : ' hover:bg-gray-800 text-gray-200')}
                    onClick={() => {
                      onChange({
                        target: {
                          name: 'country',
                          value: country.value,
                        }
                      } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>);
                      setCountryDropdown(false);
                    }}
                  >
                    <span>{country.label}</span>
                    {data.country === country.value && <span className="ml-2 text-xs bg-pink-900 px-2 py-1 rounded-full">Selected</span>}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mb-10">
        <label htmlFor="email" className="paylabel">Email (optional)</label>
        <input id="email" name="email" type="email" value={data.email} onChange={onChange} placeholder="your@email.com" className="payipt" />
      </div>

      <div className="flex gap-5">
        <button
          onClick={onBack}
          className={`w-full paybtn paybtnHF`}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handleNext}
          className={`w-full paybtn ${nextDisabled ? 'paybtnDisabled' : 'paybtnHF'}`}
          disabled={nextDisabled}
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};