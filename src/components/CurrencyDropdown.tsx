"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface Currency {
  value: string;
  label: string;
  image?: string;
}

interface CurrencyDropdownProps {
  label: string;
  selectedValue?: string;
  options: Currency[];
  showDropdown: boolean;
  loading?: boolean;
  error?: string;
  disabled?: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  onClose: () => void;
}

export default function CurrencyDropdown({
  error,
  label,
  loading = false,
  disabled = false,
  options,
  showDropdown,
  selectedValue,
  onClose,
  onSelect,
  onToggle,
}: CurrencyDropdownProps) {
  const uniqueByValue = (arr: Currency[]) => {
    const seen = new Set<string>();
    return arr.filter((item) => {
      if (seen.has(item.value)) return false;
      seen.add(item.value);
      return true;
    });
  };

  const selected = options.find((c) => c.value === selectedValue);

  const handleSelect = (value: string) => {
    onSelect(value);
    onClose();
  };

  return (
    <div className="mb-5 relative">
      <label className="paylabel relative z-[105]">{label}</label>

      <div className={`relative ${showDropdown ? "z-[99999]" : "z-20"}`}>
        <div
          onClick={() => {
            if (!loading && !disabled) onToggle();
          }}
          className={`payipt flex items-center justify-between select-none relative transition-all ${
            loading || disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:border-pink-500"
          }`}
        >
          <div className="flex items-center gap-3">
            {selected?.image && (
              <Image
                src={selected.image}
                alt={selected.label}
                width={24}
                height={24}
                className="rounded-full mr-2"
              />
            )}
            <span className={selected ? "text-white" : "text-gray-400"}>
              {loading
                ? "Loading..."
                : selected
                ? selected.label
                : "Please select"}
            </span>
          </div>
          {showDropdown ? (
            <ChevronUp className="w-5 h-5 text-white" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white" />
          )}
        </div>

        {/* Dropdown list */}
        {showDropdown && !disabled && (
          <>
            <div
              onClick={onClose}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[99990]"
            />
            <div className="absolute top-full mt-2 left-0 right-0 max-h-[220px] rounded-xl border border-gray-700 bg-gray-900 shadow-2xl overflow-y-auto z-[100001]">
              {loading
                ? Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-2 mb-2 rounded-lg bg-gray-700 animate-pulse h-8 w-full"
                      />
                    ))
                : uniqueByValue(options).map((currency) => (
                    <div
                      key={currency.value}
                      className={`transition-all cursor-pointer px-4 py-2 border-b border-gray-800 last:border-b-0 flex items-center gap-2 ${
                        selectedValue === currency.value
                          ? "bg-pink-600/80 text-white font-bold shadow-inner"
                          : "hover:bg-gray-800 text-gray-200"
                      }`}
                      onClick={() => handleSelect(currency.value)}
                    >
                      {currency.image && (
                        <Image
                          src={currency.image}
                          alt={currency.label}
                          width={24}
                          height={24}
                          className="rounded-full mr-2"
                        />
                      )}
                      <span>{currency.label}</span>
                      {selectedValue === currency.value && (
                        <span className="ml-2 text-xs bg-pink-900 px-2 py-1 rounded-full">
                          Selected
                        </span>
                      )}
                    </div>
                  ))}
            </div>
          </>
        )}
      </div>

      {error && (
        <div className="text-xs text-red-400 mt-1 relative z-[100005]">
          {error}
        </div>
      )}
    </div>
  );
}