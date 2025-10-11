"use client";
// Currency type for select options
interface Currency {
  value: string;
  label: string;
  image?: string;
}
import { useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { OrderData } from './types';
import { ArrowRight, CreditCard } from 'lucide-react';
import { useCurrencyStore } from './hooks/currencyStore';
import Image from 'next/image';
import CurrencyDropdown from '../CurrencyDropdown';

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
    closeFiatDropdown,
    closeCryptoDropdown,
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
    if (fiatCurrencies.length === 0 && cryptoCurrencies.length === 0) {
      fetchCurrencies();
    }
  }, [fiatCurrencies.length, cryptoCurrencies.length, fetchCurrencies]);

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

      <CurrencyDropdown
        label="Pay With"
        selectedValue={data.from}
        options={fiatCurrencies}
        showDropdown={showFiatDropdown}
        loading={loading}
        disabled={loading || !!fetchError}
        error={error.from}
        onToggle={() => {
          if (!loading) toggleFiatDropdown();
        }}
        onSelect={(val: string) =>
          onChange({ target: { name: "from", value: val } } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
        }
        onClose={closeFiatDropdown}
      />

      <CurrencyDropdown
        label="Receive"
        selectedValue={data.to}
        options={cryptoCurrencies}
        showDropdown={showCryptoDropdown}
        loading={loading}
        disabled={loading || !!fetchError}
        error={error.to}
        onToggle={() => {
          if (!loading) toggleCryptoDropdown();
        }}
        onSelect={(val: string) =>
          onChange({ target: { name: "to", value: val } } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
        }
        onClose={closeCryptoDropdown}
      />


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