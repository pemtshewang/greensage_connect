import { Tabs } from "expo-router";
import { Icons } from "../../assets/Icons/Icons";
import { View } from "native-base";
import { Link } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        header: (props) => {
          return (
            <View
              style={{
                position: "absolute",
                right: 0,
                padding: 10,
              }}
            >
              <Link href="/Auth/login">
                <Icons.circleUser size={30} color="black" />
              </Link>
            </View>
          );
        },
        // if focused, the icon will be underlined
        tabBarActiveBackgroundColor: "#f3f4f6",
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
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
          // underlined when focused
        }}
      />
      <Tabs.Screen
        name="Notifications"
        options={{
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
