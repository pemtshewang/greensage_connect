import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { GreenhouseState, totalGreenhouseState } from "./state";
// import zustandStorage from "./mmkvWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define your store state
export interface StoreState extends totalGreenhouseState {
  addGreenhouse: (greenhouse: GreenhouseState) => void;
  updateGreenhouse: (id: string, data: Partial<GreenhouseState>) => void;
  removeGreenhouse: (id: string) => void;
  removeAllGreenhouses: () => void;
}

export const useGreenhouseStore = create<StoreState>(
  persist(
    (set) => ({
      count: 0,
      greenhouses: [],
      addGreenhouse: (greenhouse) =>
        set((state) => ({
          count: state.count + 1,
          greenhouses: [...state.greenhouses, greenhouse],
        })),
      updateGreenhouse: (id, data) =>
        set((state) => ({
          greenhouses: state.greenhouses.map((greenhouse) =>
            greenhouse.id === id ? { ...greenhouse, ...data } : greenhouse
          ),
        })),
      removeGreenhouse: (id) =>
        set((state) => ({
          count: state.count - 1,
          greenhouses: state.greenhouses.filter(
            (greenhouse) => greenhouse.id !== id
          ),
        })),
      removeAllGreenhouses: () =>
        set(() => ({
          count: 0,
          greenhouses: [],
        })),
    }),
    {
      name: "greenhouseStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
