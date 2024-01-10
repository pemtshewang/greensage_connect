import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { GreenhouseState, totalGreenhouseState, IrrigationControllerState, totalIrrigationControllerState } from "./state";
// import zustandStorage from "./mmkvWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define your store state
interface StoreState extends totalGreenhouseState {
  addGreenhouse: (greenhouse: GreenhouseState) => void;
  updateGreenhouse: (id: string, data: Partial<GreenhouseState>) => void;
  removeGreenhouse: (id: string) => void;
  removeAllGreenhouses: () => void;
}

interface IrrigationControllerStoreState extends totalIrrigationControllerState {
  addIrrigationController: (irrigationController: IrrigationControllerState) => void;
  updateIrrigationController: (id: string, data: Partial<IrrigationControllerState>) => void;
  removeIrrigationController: (id: string) => void;
  removeAllIrrigationControllers: () => void;
}

export const useIrrigationControllerStore = create<IrrigationControllerStoreState>(
  persist(
    (set) => ({
      count: 0,
      irrigationControllers: [],
      addIrrigationController: (irrigationController) =>
        set((state) => ({
          count: state.count + 1,
          irrigationControllers: [...state.irrigationControllers, irrigationController],
        })),
      updateIrrigationController: (id, data) =>
        set((state) => ({
          irrigationControllers: state.irrigationControllers.map((irrigationController) =>
            irrigationController.id === id ? { ...irrigationController, ...data } : irrigationController
          ),
        })),
      removeIrrigationController: (id) =>
        set((state) => ({
          count: state.count - 1,
          irrigationControllers: state.irrigationControllers.filter(
            (irrigationController) => irrigationController.id !== id
          ),
        })),
      removeAllIrrigationControllers: () =>
        set(() => ({
          count: 0,
          irrigationControllers: [],
        })),
    }),
    {
      name: "irrigationControllerStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

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
