import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BrokerConfigType } from "../types";
import { GreenhouseState, IrrigationControllerState } from "../zustand/state";
import { TempHumidDataType } from "../components/Dashboard/temp_humid";
import { SoilMoistureCombinedProps } from "../components/Dashboard/irrigation_moisture";

export interface BaseStore<T> {
  count: number;
  items: T[];
  addItem: (item: T) => void;
  updateItem: (id: string, data: Partial<T>) => void;
  removeItem: (id: string) => void;
  removeAllItems: () => void;
}

interface StoreConfig<T> {
  name: string;
  storage: any; // Replace with the actual type of storage
}

interface StoreState<T> extends BaseStore<T> {}

export function createStore<T>(
  config: StoreConfig<T>,
  initialState: StoreState<T>
) {
  return create<BaseStore<T>>(
    persist(
      (set) => ({
        count: initialState.count,
        items: initialState.items,
        addItem: (item) =>
          set((state) => ({
            count: state.count + 1,
            items: [...state.items, item],
          })),
        updateItem: (id, data) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.id === id ? { ...item, ...data } : item
            ),
          })),
        removeItem: (id) =>
          set((state) => ({
            count: state.count - 1,
            items: state.items.filter((item) => item.id !== id),
          })),
        removeAllItems: () =>
          set(() => ({
            count: 0,
            items: [],
          })),
      }),
      config
    )
  );
}

export const useGreenhouseStore = createStore<GreenhouseState>(
  {
    name: "greenhouseStore",
    storage: createJSONStorage(() => AsyncStorage),
  },
  {
    count: 0,
    items: [],
  }
);

export const useIrrigationControllerStore =
  createStore<IrrigationControllerState>(
    {
      name: "irrigationControllerStore",
      storage: createJSONStorage(() => AsyncStorage),
    },
    {
      count: 0,
      items: [],
    }
  );

interface BrokerStoreState extends BrokerConfigType {
  brokerUsername: string;
  brokerPassword: string;
  brokerURL: string;
  brokerPort: number;
  setBrokerConfig: (data: BrokerConfigType) => void;
  updateBrokerConfig: (data: Partial<BrokerConfigType>) => void;
  deleteBrokerConfig: () => void;
}

export const useMQTTBrokerStore = create<BrokerStoreState>(
  persist(
    (set) => ({
      brokerUsername: "",
      brokerPassword: "",
      brokerURL: "",
      brokerPort: 0,
      setBrokerConfig: (data) => set(() => data),
      updateBrokerConfig: (data) =>
        set((state) => ({
          brokerUsername: data.brokerUsername ?? state.brokerUsername,
          brokerPassword: data.brokerPassword ?? state.brokerPassword,
          brokerURL: data.brokerURL ?? state.brokerURL,
          brokerPort: data.brokerPort ?? state.brokerPort,
        })),
      deleteBrokerConfig: () =>
        set(() => ({
          brokerUsername: "",
          brokerPassword: "",
          brokerURL: "",
          brokerPort: 0,
        })),
    }),
    {
      name: "mqttBrokerStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export interface Notification {
  id: string;
  title: string;
  message: string;
  dateTime: Date;
  type?: string;
  seen: boolean;
  footer: string;
}

interface NotificationStoreState {
  countOfUnseenNotifications: number;
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  clearNotifications: () => void;
  deleteNotification: (id: string) => void;
  markAllUnseenNotificationsAsSeen: () => void;
}

export const useNotificationStore = create<NotificationStoreState>(
  persist(
    (set) => ({
      countOfUnseenNotifications: 0,
      notifications: [],
      addNotification: (notification) =>
        set((state) => ({
          notifications: [...state.notifications, notification],
          countOfUnseenNotifications: state.countOfUnseenNotifications + 1,
        })),
      markAllUnseenNotificationsAsSeen: () =>
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.seen ? notification : { ...notification, seen: true }
          ),
          countOfUnseenNotifications: 0,
        })),
      clearNotifications: () =>
        set(() => ({
          notifications: [],
        })),
      deleteNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter(
            (notification) => notification.id !== id
          ),
        })),
    }),
    {
      name: "notificationStore",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

type AnalyticsStoreState = {
  lastUpdated: string | null;
  updatedLastUpdatedDate: () => void;
  soilMoistureData: SoilMoistureCombinedProps[];
  addTempHumidData: (data: TempHumidDataType) => void;
  addSoilMoistureData: (data: SoilMoistureCombinedProps) => void;
  clearData: () => void;
  getMinMaxTempHumidData: () => {
    minTemp: number;
    minHumid: number;
    maxTemp: number;
    maxHumid: number;
  };
};

export const useAnalyticsStore = create<AnalyticsStoreState>(
  persist(
    (set) => ({
      tempHumidData: [],
      soilMoistureData: [],
      addTempHumidData: (data) =>
        set((state) => {
          const index = state.tempHumidData.findIndex(
            (item) => item.id === data.id
          );
          if (index !== -1) {
            // Update the existing data
            const updatedData = [...state.tempHumidData];
            updatedData[index] = data;
            return { tempHumidData: updatedData };
          } else {
            // Add new data
            return { tempHumidData: [...state.tempHumidData, data] };
          }
        }),
      addSoilMoistureData: (data) =>
        set((state) => {
          const index = state.soilMoistureData.findIndex(
            (item) => item.id === data.id
          );
          if (index !== -1) {
            // Update the existing data
            const updatedData = [...state.soilMoistureData];
            updatedData[index] = data;
            return { soilMoistureData: updatedData };
          } else {
            // Add new data
            return { soilMoistureData: [...state.soilMoistureData, data] };
          }
        }),
      clearData: () => set(() => ({ tempHumidData: [], soilMoistureData: [] })),
      getMinMaxTempHumidData: () =>
        get((state) => {
          let minTemp = Infinity;
          let minHumid = Infinity;
          let maxTemp = -Infinity;
          let maxHumid = -Infinity;
          state.tempHumidData.forEach((item) => {
            item.data.temperature.forEach((data) => {
              minTemp = Math.min(minTemp, data.value);
              maxTemp = Math.max(maxTemp, data.value);
            });
            item.data.humidity.forEach((data) => {
              minHumid = Math.min(minHumid, data.value);
              maxHumid = Math.max(maxHumid, data.value);
            });
          });
          return { minTemp, minHumid, maxTemp, maxHumid };
        }),
      updatedLastUpdatedDate: () =>
        set(() => ({ lastUpdated: new Date().toISOString() })),
    }),
    {
      name: "analyticsStore", // unique name
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
