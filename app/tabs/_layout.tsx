import { Tabs } from "expo-router";
import { Icons } from "../../assets/Icons/Icons";
import { Text, View, Button, HStack } from "native-base";
import { Heading } from "native-base";
import {
  NotificationStoreState,
  useNotificationStore,
} from "../../zustand/store";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import SessionContext from "../../context/SessionContext";
import { EnvironmentContext } from "../../context/envParamsContext";
import CustomModal from "../../components/ui/Modal";
import { LinearGradient } from "expo-linear-gradient";

const DeleteAllNotificationPrompt = ({
  isDeletePromptVisible,
  setIsDeletePromptVisible,
  store,
}: {
  isDeletePromptVisible: boolean;
  setIsDeletePromptVisible: (bool: boolean) => void;
  store: NotificationStoreState;
}) => {
  return (
    <CustomModal
      setModalVisible={setIsDeletePromptVisible}
      modalVisible={isDeletePromptVisible}
      modalTitle="Delete all notifications?"
    >
      <Text fontFamily="OpenSans" w="full">
        Are you sure you want to delete all notifications? (the operation is
        permananent)
      </Text>
      <HStack space={2} paddingY={5} justifyContent="flex-end">
        <Button
          bg="green.600"
          onPress={() => {
            store.clearNotifications();
            setIsDeletePromptVisible(false);
          }}
          fontFamily="OpenSans"
        >
          Delete
        </Button>
        <Button
          bg="red.500"
          onPress={() => {
            setIsDeletePromptVisible(false);
          }}
        >
          Cancel
        </Button>
      </HStack>
    </CustomModal>
  );
};

const TabLayout = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isDeletePromptVisible, setIsDeletePromptVisible] = useState(false);
  const [environment, setEnvironment] = useState({
    temperature: 0,
    humidity: 0,
    pressure: 0,
    light: 0,
    soilMoisture: 0,
  });
  const updateEnvironment = (updates: {
    temperature?: number;
    humidity?: number;
    pressure?: number;
    light?: number;
    soilMoisture?: number;
  }) => {
    setEnvironment((prevEnvironment) => ({
      ...prevEnvironment,
      ...updates,
    }));
  };
  const store = useNotificationStore();
  useEffect(() => {
    setNotificationCount(store.countOfUnseenNotifications);
    () => {
      setNotificationCount(0);
    };
  }, [store.notifications]);
  return (
    <SessionContext.Provider
      value={{ modalVisible: showModal, setModalVisible: setShowModal }}
    >
      <EnvironmentContext.Provider value={{ environment, updateEnvironment }}>
        <Tabs
          screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarBackground: () => (
              <LinearGradient
                colors={["#228929", "#6A4"]}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              ></LinearGradient>
            ),
            tabBarActiveTintColor: "#fff",
          }}
        >
          <Tabs.Screen
            name="Home"
            options={{
              headerShown: false,
              tabBarLabelStyle: {
                fontFamily: "OpenSans",
                color: "#fff",
              },
              tabBarIcon: ({ focused, size }) => (
                <View
                  style={{
                    borderTopWidth: focused ? 3 : 0,
                    padding: 4,
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Icons.home
                    color={focused ? "#fff" : "#000"}
                    size={focused ? size * 1.2 : size}
                  />
                </View>
              ),
              tabBarActiveTintColor: "green",
            }}
          />
          <Tabs.Screen
            name="Dashboard"
            options={{
              tabBarLabelStyle: {
                fontFamily: "OpenSans",
                color: "#fff",
              },
              tabBarIcon: ({ focused, color, size }) => (
                <View
                  style={{
                    borderTopWidth: focused ? 3 : 0,
                    padding: 4,
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Icons.dashboard
                    color={focused ? "#fff" : "#000"}
                    size={focused ? size * 1.2 : size}
                  />
                </View>
              ),
              header: () => {
                return (
                  <LinearGradient
                    colors={["#228929", "#6A4"]}
                    style={{
                      padding: 10,
                      paddingBottom: 20,
                    }}
                  >
                    <Heading
                      style={{
                        color: "white",
                      }}
                    >
                      Dashboard Analytics
                    </Heading>
                  </LinearGradient>
                );
              },
            }}
          />
          <Tabs.Screen
            name="Notifications"
            listeners={{
              tabPress: () => {
                setTimeout(() => {
                  store.markAllUnseenNotificationsAsSeen();
                }, 2000);
              },
            }}
            options={{
              tabBarLabelStyle: {
                fontFamily: "OpenSans",
                color: "#fff",
              },
              headerShown: true,
              tabBarBadge:
                notificationCount > 0 ? notificationCount : undefined,
              header: () => {
                return (
                  <LinearGradient
                    colors={["#228929", "#6A4"]}
                    style={{
                      padding: 10,
                      paddingBottom: 20,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Heading
                      style={{
                        color: "white",
                      }}
                    >
                      Notifications
                    </Heading>
                    <TouchableOpacity
                      style={{
                        width: 30,
                        height: 30,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        setIsDeletePromptVisible(true);
                      }}
                    >
                      <Icons.trash color="black" size={30} />
                    </TouchableOpacity>
                  </LinearGradient>
                );
              },
              tabBarIcon: ({ focused, color, size }) => (
                <View
                  style={{
                    borderTopWidth: focused ? 3 : 0,
                    padding: 4,
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Icons.notification
                    color={focused ? "#fff" : "#000"}
                    size={focused ? size * 1.2 : size}
                  />
                </View>
              ),
              tabBarActiveTintColor: "green",
            }}
          />
          <Tabs.Screen
            name="Feeds"
            options={{
              tabBarLabelStyle: {
                fontFamily: "OpenSans",
                color: "#fff",
              },
              headerShown: true,
              header: () => {
                return (
                  <LinearGradient
                    colors={["#228929", "#6A4"]}
                    style={{
                      padding: 10,
                      paddingBottom: 20,
                    }}
                  >
                    <Heading
                      style={{
                        color: "white",
                      }}
                    >
                      News Feed
                    </Heading>
                  </LinearGradient>
                );
              },
              tabBarIcon: ({ focused, color, size }) => (
                <View
                  style={{
                    borderTopWidth: focused ? 3 : 0,
                    padding: 4,
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Icons.post
                    color={focused ? "#fff" : "#000"}
                    size={focused ? size * 1.2 : size}
                  />
                </View>
              ),
              tabBarActiveTintColor: "green",
            }}
          />
          <Tabs.Screen
            name="Settings"
            options={{
              headerShown: true,
              tabBarLabelStyle: {
                fontFamily: "OpenSans",
                color: "#fff",
              },
              header: () => {
                return (
                  <LinearGradient
                    colors={["#228929", "#6A4"]}
                    style={{
                      padding: 10,
                      paddingBottom: 20,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Heading
                      style={{
                        color: "white",
                      }}
                    >
                      Settings
                    </Heading>
                    <TouchableOpacity
                      onPress={() => {
                        setShowModal(true);
                      }}
                    >
                      <Icons.logOut color="black" size={30} />
                    </TouchableOpacity>
                  </LinearGradient>
                );
              },
              tabBarIcon: ({ focused, size }) => (
                <View
                  style={{
                    borderTopWidth: focused ? 3 : 0,
                    padding: 4,
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Icons.settings
                    color={focused ? "#fff" : "#000"}
                    size={focused ? size * 1.2 : size}
                  />
                </View>
              ),
              tabBarActiveTintColor: "green",
            }}
          />
        </Tabs>
        <DeleteAllNotificationPrompt
          isDeletePromptVisible={isDeletePromptVisible}
          setIsDeletePromptVisible={setIsDeletePromptVisible}
          store={store}
        />
      </EnvironmentContext.Provider>
    </SessionContext.Provider>
  );
};
export default TabLayout;
