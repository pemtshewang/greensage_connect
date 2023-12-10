import { Tabs } from "expo-router";
import { Icons } from "../../assets/Icons/Icons";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // if focused, the icon will be underlined
        tabBarActiveBackgroundColor: "#f3f4f6",
      }}
    >
      <Tabs.Screen
        // Name of the route to hide.
        name="Home"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icons.home
              color={focused ? "#033500" : "#6b7280"}
              size={size}
            />
          ),
          tabBarActiveTintColor: "#033500",
          // underlined when focused
          tabBarActiveBackgroundColor: "#f3f4f6",
        }}
      />
      <Tabs.Screen
        name="Dashboard"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icons.dashboard
              color={focused ? "#033500" : "#6b7280"}
              size={size}
            />
          ),
          tabBarActiveTintColor: "#033500",
          // underlined when focused
        }}
      />
      <Tabs.Screen
        name="Notifications"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icons.notification
              color={focused ? "#033500" : "#6b7280"}
              size={size}
              fill={focused ? "#033500" : "transparent"}
            />
          ),
          tabBarActiveTintColor: "#033500",
          tabBarBadge: 3,
        }}
      />
      <Tabs.Screen
        name="Feeds"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icons.post
              color={focused ? "#033500" : "#6b7280"}
              size={size}
            />
          ),
          tabBarActiveTintColor: "#033500",
          tabBarBadge: 3,
        }}
      />
    </Tabs >
  )
}

export default TabLayout;


