import { Tabs } from "expo-router";
import { Icons } from "../../assets/Icons/Icons";
import { View } from "native-base";
import { Link } from "expo-router";
import WeatherContainer from "../../components/WeatherContainer";
import { SafeAreaView } from "react-native";

const TabLayout = () => {
  return (
    <Tabs>
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
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Icons.dashboard
              color={focused ? "green" : "#6b7280"}
              size={size}
            />
          ),
          tabBarActiveTintColor: "green",
          // underlined when focused
        }}
      />
      <Tabs.Screen
        name="Notifications"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Icons.notification
              color={focused ? "green" : "#6b7280"}
              size={size}
              fill={focused ? "green" : "transparent"}
            />
          ),
          tabBarActiveTintColor: "green",
          tabBarBadge: 3,
        }}
      />
      <Tabs.Screen
        name="Feeds"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Icons.post color={focused ? "green" : "#6b7280"} size={size} />
          ),
          tabBarActiveTintColor: "green",
          tabBarBadge: 3,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
