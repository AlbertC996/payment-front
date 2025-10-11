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
  closeFiatDropdown: () => void;
  closeCryptoDropdown: () => void;
}

export interface CurrencyApi {
  ticker: string;
  name: string;
  image: string;
  hasExternalId: boolean;
  isExtraIdSupported: boolean;
  isFiat: boolean;
  featured: boolean;
  isStable: boolean;
  supportsFixedRate: boolean;
  network: string;
  tokenContract?: string | null;
  buy: boolean;
  sell: boolean;
  legacyTicker: string;
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
      const res = await fetch(`/changenow/currencies`);
      const data = await res.json();
      // Map API data to Currency type
      const mapped = (data as CurrencyApi[]).map((c) => ({
        value: c.ticker || c.legacyTicker,
        label: c.name,
        image: c.image,
        isFiat: c.isFiat
      }));
      set({
        fiatCurrencies: mapped.filter((c: { isFiat: boolean }) => c.isFiat),
        cryptoCurrencies: mapped.filter((c: { isFiat: boolean }) => !c.isFiat),
        fetchError: null
      });
    } catch (error) {
      set({ fetchError: "Failed to load currencies. Please refresh." });
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  setError: (err) => set({ error: err }),
  toggleFiatDropdown: () => set((state) => ({ showFiatDropdown: !state.showFiatDropdown })),
  toggleCryptoDropdown: () => set((state) => ({ showCryptoDropdown: !state.showCryptoDropdown })),
  closeFiatDropdown: () => set({ showFiatDropdown: false }),
  closeCryptoDropdown: () => set({ showCryptoDropdown: false }),
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
