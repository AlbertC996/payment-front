import { create } from "zustand";

interface Currency {
  value: string;
  label: string;
  image?: string;
}// currencyStore.ts

interface CurrencyStore {
  fiatCurrencies: Currency[];
  cryptoCurrencies: Currency[];
  showFiatDropdown: boolean;
  showCryptoDropdown: boolean;
  fromTouched: boolean;
  toTouched: boolean;
  amountTouched: boolean;
  error: { from?: string; to?: string; amount?: string };
  fetchError: string | null;
  loading: boolean;
  fetchCurrencies: () => Promise<void>;
  setError: (err: { from?: string; to?: string; amount?: string }) => void;
  toggleFiatDropdown: () => void;
  toggleCryptoDropdown: () => void;
  setTouched: (field: "from" | "to" | "amount") => void;
  setCurrency: (type: "from" | "to", value: string) => void;
  setFetchError: (msg: string | null) => void;
  resetState: () => void;
}

export const useCurrencyStore = create<CurrencyStore>((set) => ({
  fiatCurrencies: [],
  cryptoCurrencies: [],
  showFiatDropdown: false,
  showCryptoDropdown: false,
  fromTouched: false,
  toTouched: false,
  amountTouched: false,
  error: {},
  fetchError: null,
  loading: false,

  fetchCurrencies: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/changenow/currencies`);
      const data: Currency[] = await res.json();
      // Process and set currencies here as needed...
      set({ fiatCurrencies: data.filter(c => c.isFiat), cryptoCurrencies: data.filter(c => !c.isFiat), fetchError: null });
    } catch (error) {
      set({ fetchError: "Failed to load currencies. Please refresh." });
    } finally {
      set({ loading: false });
    }
  },

  setError: (err) => set({ error: err }),

  toggleFiatDropdown: () => set((state) => ({ showFiatDropdown: !state.showFiatDropdown })),
  toggleCryptoDropdown: () => set((state) => ({ showCryptoDropdown: !state.showCryptoDropdown })),

  setTouched: (field) => set((state) => ({ [`${field}Touched`]: true })),
  
  setCurrency: (type, value) => set({ [type]: value }),

  setFetchError: (msg) => set({ fetchError: msg }),

  resetState: () => set({
    showFiatDropdown: false,
    showCryptoDropdown: false,
    fromTouched: false,
    toTouched: false,
    amountTouched: false,
    error: {},
  }),
}));
