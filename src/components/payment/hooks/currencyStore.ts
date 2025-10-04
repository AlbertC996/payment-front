import { create } from "zustand";

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

interface CurrencyStore {
  fiatCurrencies: Currency[];
  cryptoCurrencies: Currency[];
  loading: boolean;
  error: { from?: string; to?: string; amount?: string };
  fetchError: string | null;
  setError: (err: { from?: string; to?: string; amount?: string }) => void;
  setFetchError: (msg: string | null) => void;
  fetchCurrencies: () => Promise<void>;
}

interface Currency {
  value: string;
  label: string;
  image?: string;
}

export const useCurrencyStore = create<CurrencyStore>((set) => ({
  fiatCurrencies: [],
  cryptoCurrencies: [],
  loading: false,
  error: {},
  fetchError: null,
  setError: (err) => set({ error: err }),
  setFetchError: (msg) => set({ fetchError: msg }),
  fetchCurrencies: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/changenow/currencies`);
      const data: CurrencyApi[] = await res.json();
  const fiat = data.filter((c) => c.isFiat).map((c) => ({ value: c.ticker, label: c.name, image: c.image }));
  const crypto = data.filter((c) => !c.isFiat).map((c) => ({ value: c.ticker, label: c.name, image: c.image }));
  set({ fiatCurrencies: fiat, cryptoCurrencies: crypto, fetchError: null });
    } catch {
      set({ fiatCurrencies: [], cryptoCurrencies: [], fetchError: 'Failed to load currencies. Please refresh.' });
    } finally {
      set({ loading: false });
    }
  },
}));