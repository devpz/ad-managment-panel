
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Advertisement } from "../types/advertisement";

interface AdvertisementState {
  advertisements: Advertisement[];
  addAdvertisement: (ad: Advertisement) => boolean;
  removeAdvertisement: (id: string) => void;
  updateAdvertisement: (ad: Advertisement) => boolean;
  loadSampleData: () => void;
}

const sampleData: Advertisement[] = [
  {
    id: "1",
    name: "Summer Sale",
    content: "Get 50% off on all summer items!",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
  },
  {
    id: "2",
    name: "Black Friday",
    content: "Biggest sale of the year!",
    startDate: "2024-11-25",
    endDate: "2024-11-30",
  },
];

export const useAdvertisements = create<AdvertisementState>()(
  persist(
    (set, get) => ({
      advertisements: [],
      addAdvertisement: (ad) => {
        const exists = get().advertisements.some((a) => a.name === ad.name);
        if (exists) return false;
        set((state) => ({
          advertisements: [...state.advertisements, ad],
        }));
        return true;
      },
      removeAdvertisement: (id) =>
        set((state) => ({
          advertisements: state.advertisements.filter((ad) => ad.id !== id),
        })),
      updateAdvertisement: (ad) => {
        const exists = get().advertisements.some(
          (a) => a.name === ad.name && a.id !== ad.id
        );
        if (exists) return false;
        set((state) => ({
          advertisements: state.advertisements.map((a) =>
            a.id === ad.id ? ad : a
          ),
        }));
        return true;
      },
      loadSampleData: () => set({ advertisements: sampleData }),
    }),
    {
      name: "advertisements-storage",
    }
  )
);
