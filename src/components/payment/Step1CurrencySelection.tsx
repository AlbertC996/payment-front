"use client";
// Currency type for select options
interface Currency {
  value: string;
  label: string;
  image?: string;
}
import { useEffect } from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { OrderData } from './types';
import { ArrowRight, CreditCard } from 'lucide-react';
import { useCurrencyStore } from './hooks/currencyStore';
import Image from 'next/image';

interface Step1Props {
  data: OrderData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onNext: () => void;
}

export default function Step1CurrencySelection({ data, onChange, onNext }: Step1Props) {
  const {
    fiatCurrencies,
    cryptoCurrencies,
    loading,
    fetchError,
    showFiatDropdown,
    showCryptoDropdown,
    fromTouched,
    toTouched,
    amountTouched,
    error,
    fetchCurrencies,
    setError,
    toggleFiatDropdown,
    toggleCryptoDropdown,
    setTouched,
    setCurrency,
  } = useCurrencyStore();

  function uniqueByValue(arr: Currency[]) {
    const seen = new Set<string>();
    return arr.filter((item) => {
      if (seen.has(item.value)) return false;
      seen.add(item.value);
      return true;
    });
  }

  useEffect(() => {
    fetchCurrencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newError: { from?: string; to?: string; amount?: string } = {};
    if (!data.from && fromTouched) newError.from = 'Please select a fiat currency.';
    if (!data.to && toTouched) newError.to = 'Please select a crypto currency.';
    if (amountTouched) {
      if (!data.amount || isNaN(Number(data.amount)) || Number(data.amount) < 1) {
        newError.amount = 'Please enter a valid amount (min 1).';
      }
    }
    setError(newError);
  }, [data.from, data.to, data.amount, amountTouched, fromTouched, toTouched, setError]);

  const amountIsValid = !!data.amount && !isNaN(Number(data.amount)) && Number(data.amount) >= 1;
  const isValid = !loading && fiatCurrencies.length > 0 && cryptoCurrencies.length > 0 && !!data.from && !!data.to && amountIsValid && Object.keys(error).length === 0;

  // Validate amount onBlur and onNext
  const validateAmount = () => {
    const newError = { ...error };
    if (!data.amount || isNaN(Number(data.amount)) || Number(data.amount) < 1) {
      newError.amount = 'Please enter a valid amount (min 1).';
    } else {
      delete newError.amount;
    }
    setError(newError);
  };

  // Handlers for currency selection
  const handleCurrencyClick = (type: 'from' | 'to', value: string) => {
    onChange({
      target: {
        name: type,
        value,
      }
    } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>);
    setCurrency(type, value);
  };

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

      {loading && (
        <div className="mb-5 text-center text-pink-400 animate-pulse">Loading currencies...</div>
      )}
      {fetchError && (
        <div className="mb-5 text-center text-red-400">{fetchError}</div>
      )}

  <div className={`mb-5 relative ${!showFiatDropdown ? "z-20" : ""}`}>
    <label className="paylabel relative z-[100005]">Pay With</label>
        <div className={`relative ${showFiatDropdown ? 'z-[99999]' : (showCryptoDropdown ? 'z-20' : 'z-50')}`}>
          <div
            onClick={() => {
              toggleFiatDropdown();
              setTouched('from');
            }}
            className={`payipt flex items-center justify-between cursor-pointer select-none relative ${showFiatDropdown ? 'z-[100000]' : (showCryptoDropdown ? 'z-30' : 'z-[100]')}`}
          >
            <div className="flex items-center gap-3">
              <span className={data.from ? 'text-white' : 'text-gray-400'}>
                {data.from ? (fiatCurrencies.find(c => c.value === data.from)?.label || data.from) : 'please select'}
              </span>
            </div>
            {showFiatDropdown ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
          </div>
          {showFiatDropdown && (
            <>
              <div
                onClick={toggleFiatDropdown}
                className={`${showFiatDropdown ? 'z-[99990]' : 'z-10'} fixed inset-0 bg-black/40 backdrop-blur-sm`}
              />
              <div
                className={`${showFiatDropdown ? 'z-[100001]' : 'z-[200]'} absolute top-full mt-2 left-0 right-0 max-h-[220px] rounded-xl border border-gray-700 bg-gray-900 shadow-2xl overflow-y-auto`}
              >
                {/* placeholder first item */}
                {uniqueByValue(fiatCurrencies).map((currency: Currency) => (
                  <div
                    key={currency.value}
                    className={`transition-all cursor-pointer px-4 py-2 border-b border-gray-800 last:border-b-0 flex items-center gap-2`
                      + (data.from === currency.value ? ' bg-pink-600/80 text-white font-bold shadow-inner' : ' hover:bg-gray-800 text-gray-200')}
                    onClick={() => {
                      handleCurrencyClick('from', currency.value);
                      toggleFiatDropdown();
                    }}
                  >
                    {currency.image && (
                      <Image src={currency.image} alt={currency.label} width={24} height={24} className="rounded-full mr-2" />
                    )}
                    <span>{currency.label}</span>
                    {data.from === currency.value && <span className="ml-2 text-xs bg-pink-900 px-2 py-1 rounded-full">Selected</span>}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
  {error.from && <div className="text-xs text-red-400 mt-1 relative z-[100005]">{error.from}</div>}
      </div>

  <div className="mb-5 relative z-20">
    <label className="paylabel relative z-[100005]">Receive</label>
        <div className={`relative ${showCryptoDropdown ? 'z-[99999]' : (showFiatDropdown ? 'z-20' : 'z-50')}`}>
          <div
            onClick={() => {
              toggleCryptoDropdown();
              setTouched('to');
            }}
            className={`payipt flex items-center justify-between cursor-pointer select-none relative ${showCryptoDropdown ? 'z-[100000]' : (showFiatDropdown ? 'z-30' : 'z-[60]')}`}
          >
            <div className="flex items-center gap-3">
              <span className={data.to ? 'text-white' : 'text-gray-400'}>
                {data.to ? (cryptoCurrencies.find(c => c.value === data.to)?.label || data.to) : 'please select'}
              </span>
            </div>
            {showCryptoDropdown ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
          </div>
          {showCryptoDropdown && (
            <>
              <div
                onClick={toggleCryptoDropdown}
                className={`${showCryptoDropdown ? 'z-[99990]' : 'z-10'} fixed inset-0 bg-black/40 backdrop-blur-sm`}
              />
              <div
                className={`${showCryptoDropdown ? 'z-[100001]' : 'z-[70]'} absolute top-full mt-2 left-0 right-0 max-h-[220px] rounded-xl border border-gray-700 bg-gray-900 shadow-2xl overflow-y-auto`}
              >
              {/* placeholder first item */}
              {uniqueByValue(cryptoCurrencies).map((currency: Currency) => (
                <div
                  key={currency.value}
                  className={`transition-all cursor-pointer px-4 py-2 border-b border-gray-800 last:border-b-0 flex items-center gap-2`
                    + (data.to === currency.value ? ' bg-pink-600/80 text-white font-bold shadow-inner' : ' hover:bg-gray-800 text-gray-200')}
                  onClick={() => {
                    handleCurrencyClick('to', currency.value);
                    toggleCryptoDropdown();
                  }}
                >
                  {currency.image && (
                    <Image src={currency.image} alt={currency.label} width={24} height={24} className="rounded-full mr-2" />
                  )}
                  <span>{currency.label}</span>
                  {data.to === currency.value && <span className="ml-2 text-xs bg-pink-900 px-2 py-1 rounded-full">Selected</span>}
                </div>
              ))}
              </div>
            </>
          )}
        </div>
  {error.to && <div className="text-xs text-red-400 mt-1 relative z-[100005]">{error.to}</div>}
      </div>

      <div className="mb-10">
        <label htmlFor="amount" className="paylabel">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          value={data.amount ?? ''}
          onChange={onChange}
          onFocus={() => setTouched('amount')}
          onBlur={() => {
            setTouched('amount');
            validateAmount();
          }}
          placeholder="Enter amount"
          min="1"
          max="1000"
          className="payipt"
          required
          disabled={loading || !!fetchError}
        />
        {error.amount && <div className="text-xs text-red-500 mt-1">{error.amount}</div>}
      </div>

      <button
        onClick={() => {
          validateAmount();
          onNext();
        }}
        className={`w-full paybtn ${!isValid ? 'paybtnDisabled' : 'paybtnHF'}`}
        disabled={!isValid}
      >
        Next <ArrowRight className="w-4 h-4" />
      </button>
    </>
  );
}