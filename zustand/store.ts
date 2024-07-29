import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { BrokerConfigType } from "../types";
import { GreenhouseState, IrrigationControllerState } from "../zustand/state";
//import zustandStorage from "./mmkvWrapper";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

interface StoreState<T> extends BaseStore<T> { }

export function createStore<T>(
  config: StoreConfig<T>,
  initialState: StoreState<T>,
) {
  return create<BaseStore<T>>(
    //@ts-ignore
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
              //@ts-ignore
              item.id === id ? { ...item, ...data } : item,
            ),
          })),
        removeItem: (id) =>
          set((state) => ({
            count: state.count - 1,
            //@ts-ignore
            items: state.items.filter((item) => item.id !== id),
          })),
        removeAllItems: () =>
          set(() => ({
            count: 0,
            items: [],
          })),
      }),
      config,
    ),
  );
}

export const useGreenhouseStore = createStore<GreenhouseState>(
  {
    name: "greenhouseStore",
    // storage: createJSONStorage(() => zustandStorage),
    storage: createJSONStorage(() => AsyncStorage),
  },
  {
    count: 0,
    items: [],
    addItem: function (item: GreenhouseState): void {
      throw new Error("Function not implemented.");
    },
    updateItem: function (id: string, data: Partial<GreenhouseState>): void {
      throw new Error("Function not implemented.");
    },
    removeItem: function (id: string): void {
      throw new Error("Function not implemented.");
    },
    removeAllItems: function (): void {
      throw new Error("Function not implemented.");
    }
  },
);

export const useIrrigationControllerStore =
  createStore<IrrigationControllerState>(
    {
      name: "irrigationControllerStore",
      // storage: createJSONStorage(() => zustandStorage),
      storage: createJSONStorage(() => AsyncStorage),
    },
    {
      count: 0,
      items: [],
      addItem: function (item: IrrigationControllerState): void {
        throw new Error("Function not implemented.");
      },
      updateItem: function (id: string, data: Partial<IrrigationControllerState>): void {
        throw new Error("Function not implemented.");
      },
      removeItem: function (id: string): void {
        throw new Error("Function not implemented.");
      },
      removeAllItems: function (): void {
        throw new Error("Function not implemented.");
      }
    },
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
    //@ts-ignore
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
      // storage: createJSONStorage(() => zustandStorage),
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
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

export interface NotificationStoreState {
  countOfUnseenNotifications: number;
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  clearNotifications: () => void;
  deleteNotification: (id: string) => void;
  markAllUnseenNotificationsAsSeen: () => void;
}

export const useNotificationStore = create<NotificationStoreState>(
    //@ts-ignore
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
            notification.seen ? notification : { ...notification, seen: true },
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
            (notification) => notification.id !== id,
          ),
        })),
    }),
    {
      name: "notificationStore",
      // storage: createJSONStorage(() => zustandStorage),
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
