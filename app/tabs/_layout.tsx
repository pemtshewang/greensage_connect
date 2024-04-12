import { Tabs } from "expo-router";
import { Icons } from "../../assets/Icons/Icons";
import { Text, View, Button, HStack } from "native-base";
import { Heading } from "native-base";
import {
  NotificationStoreState,
  useNotificationStore,
} from "../../zustand/store";
import { useEffect, useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import SessionContext from "../../context/SessionContext";
import { EnvironmentContext } from "../../context/envParamsContext";
import CustomModal from "../../components/ui/Modal";

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
            tabBarStyle: {
              marginStart: 3,
              marginEnd: 3,
              elevation: 8,
            },
            tabBarActiveBackgroundColor: "#F5F5F5",
          }}
        >
          <Tabs.Screen
            name="Home"
            options={{
              headerShown: false,
              tabBarLabelStyle: {
                fontFamily: "OpenSans",
              },
              tabBarIcon: ({ focused, color, size }) => (
                <View
                  style={{
                    borderTopWidth: focused ? 2 : 0,
                    padding: 4,
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Icons.home
                    color={focused ? "green" : "#6b7280"}
                    size={size}
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
              },
              tabBarIcon: ({ focused, color, size }) => (
                <View
                  style={{
                    borderTopWidth: focused ? 2 : 0,
                    padding: 4,
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Icons.dashboard
                    color={focused ? "green" : "#6b7280"}
                    size={size}
                  />
                </View>
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
              },
              headerShown: true,
              tabBarBadge:
                notificationCount > 0 ? notificationCount : undefined,
              header: () => {
                return (
                  <View
                    style={{
                      backgroundColor: "green",
                      padding: 10,
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
                    <Pressable
                      style={{
                        borderWidth: 1,
                        width: 35,
                        height: 35,
                        borderRadius: 99,
                        padding: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        setIsDeletePromptVisible(true);
                      }}
                    >
                      <Icons.trash color="black" size={20} />
                    </Pressable>
                  </View>
                );
              },
              tabBarIcon: ({ focused, color, size }) => (
                <View
                  style={{
                    borderTopWidth: focused ? 2 : 0,
                    padding: 4,
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Icons.notification
                    color={focused ? "green" : "#6b7280"}
                    size={size}
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
              },
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
                <View
                  style={{
                    borderTopWidth: focused ? 2 : 0,
                    padding: 4,
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Icons.post
                    color={focused ? "green" : "#6b7280"}
                    size={size}
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
              },
              header: () => {
                return (
                  <View
                    style={{
                      backgroundColor: "green",
                      padding: 10,
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
                      style={{
                        borderRadius: 100,
                        borderWidth: 1,
                        borderColor: "white",
                        padding: 7,
                      }}
                      onPress={() => {
                        setShowModal(true);
                      }}
                    >
                      <Icons.logOut color="white" size={20} />
                    </TouchableOpacity>
                  </View>
                );
              },
              tabBarIcon: ({ focused, color, size }) => (
                <View
                  style={{
                    borderTopWidth: focused ? 2 : 0,
                    padding: 4,
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Icons.settings
                    color={focused ? "green" : "#6b7280"}
                    size={size}
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
