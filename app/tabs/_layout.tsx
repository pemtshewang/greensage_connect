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
            <Icons.home color={focused ? "#033500" : "#6b7280"} size={size} />
          ),
          tabBarActiveTintColor: "#033500",
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
            <Icons.post color={focused ? "#033500" : "#6b7280"} size={size} />
          ),
          tabBarActiveTintColor: "#033500",
          tabBarBadge: 3,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
