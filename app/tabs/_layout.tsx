import { Tabs } from "expo-router";
import { Icons } from "../../assets/Icons/Icons";
import { Button, View } from "native-base";
import { Heading } from "native-base";
import { useNotificationStore } from "../../zustand/store";
import { useEffect, useState } from "react";

const TabLayout = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const store = useNotificationStore();
  useEffect(() => {
    setNotificationCount(store.countOfUnseenNotifications);
    () => {
      setNotificationCount(0);
    }
  }, [store.notifications]);
  return (
    <Tabs screenOptions={{
      tabBarHideOnKeyboard: true
    }}>
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Icons.home color={focused ? "green" : "#6b7280"} size={size} />
          ),
          tabBarActiveTintColor: "green",
        }}
      />
      <Tabs.Screen
        name="Dashboard"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icons.dashboard
              color={focused ? "green" : "#6b7280"}
              size={size}
            />
          ),
          tabBarActiveTintColor: "green",
          header: () => {
            return (
              <View
                style={{
                  backgroundColor: "green",
                  padding: 10,
                }}
              >
                <Heading
                  style={{
                    color: "white",
                  }}
                >
                  Dashboard Analytics
                </Heading>
              </View>
            );
          }
        }}
      />
      <Tabs.Screen
        name="Notifications"
        listeners={{
          tabPress: () => {
            setTimeout(() => {
              store.markAllUnseenNotificationsAsSeen();
            }, 2000);
          }
        }}
        options={{
          headerShown: true,
          tabBarBadge: notificationCount > 0 ? notificationCount : undefined,
          header: () => {
            return (
              <View
                style={{
                  backgroundColor: "green",
                  padding: 10,
                }}
              >
                <Heading
                  style={{
                    color: "white",
                  }}
                >
                  Notifications
                </Heading>
              </View>
            );
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Icons.notification
              color={focused ? "green" : "#6b7280"}
              size={size}
              fill={focused ? "green" : "transparent"}
            />
          ),
          tabBarActiveTintColor: "green",
        }}
      />
      <Tabs.Screen
        name="Feeds"
        options={{
          headerShown: true,
          header: () => {
            return (
              <View
                style={{
                  backgroundColor: "green",
                  padding: 10,
                }}
              >
                <Heading
                  style={{
                    color: "white",
                  }}
                >
                  News Feed
                </Heading>
              </View>
            );
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Icons.post color={focused ? "green" : "#6b7280"} size={size} />
          ),
          tabBarActiveTintColor: "green",
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          headerShown: true,
          header: () => {
            return (
              <View
                style={{
                  backgroundColor: "green",
                  padding: 10,
                }}
              >
                <Heading
                  style={{
                    color: "white",
                  }}
                >
                  Settings
                </Heading>
              </View>
            );
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Icons.settings color={focused ? "green" : "#6b7280"} size={size} />
          ),
          tabBarActiveTintColor: "green",
        }}
      />
    </Tabs>
  );
};
export default TabLayout;
