import { Pressable, TouchableOpacity } from "react-native";
import { View, Image, Text, Badge, HStack, useClipboard, useToast } from "native-base";
import { Divider, Box } from "native-base";
import Icons from "../assets/Icons/Icons";
import { useDisclose } from "native-base";
import CustomActionSheet from "./ui/ActionSheet";
import { Actionsheet } from "native-base";
import { useEffect, useState } from "react";
import CustomAlertDialog from "./ui/AlertDialog";
import WSTestConnectionForm from "./Forms/WebSocketConnectionTest";
import { useRouter } from "expo-router";
import MQTTConnectionTestForm from "./Forms/MqttConnectionTest";
import { useGreenhouseStore, useIrrigationControllerStore } from "../zustand/store";
import { Alert } from "react-native";
import { Animated } from "react-native";
import { syncToCloud } from "../utils/sync";
import createToast from "../hooks/toast";

const GreenhouseNavContainer = ({
  id,
  name,
  imageUrl,
  removeGreenhouse,
  type
}: {
  id: string;
  name: string;
  type: "Greenhouse" | "Irrigation";
  imageUrl: string;
  removeGreenhouse: (id: string) => void;
}) => {
  const router = useRouter();
  const store = type === "Greenhouse" ? useGreenhouseStore() : useIrrigationControllerStore();
  const { toastMessage } = createToast();
  const controller = store.items.find((item) => item.id === id);
  const [synced, setSynced] = useState<boolean>(controller?.synced as boolean);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [alertDialog, setAlertDialogOpen] = useState<boolean>(false);
  const [removeGreenhouseConfirm, setRemoveGreenhouseConfirm] = useState<boolean>(false);
  const [showWSForm, setShowWSForm] = useState<boolean>(false);
  const [showMQTTForm, setShowMQTTForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Set loading to false initially
  const { onCopy } = useClipboard();
  const toast = useToast();

  useEffect(() => {
    if (removeGreenhouseConfirm) {
      removeGreenhouse(id);
    }
  }, [removeGreenhouseConfirm]);

  const handleSync = async () => {
    setLoading(true); // Set loading to true when starting sync
    try {
      const res = await syncToCloud({
        controllerId: controller?.id as string,
        name: controller?.name as string,
        type: type === "Greenhouse" ? "greenhouse" : "irrigation",
      });
      if (res) {
        setSynced(true);
        toastMessage({
          type: "success",
          message: "Synchronized to the server"
        })
        store.updateItem(controller?.id as string, {
          synced: true
        })
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false when sync completes
    }
  }

  const spinValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        spinValue,
        {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }
      )
    ).start();
  }, []);

  const LoadingIcon = Animated.createAnimatedComponent(Icons.syncArrow);

  return (
    <View
      style={{
        borderRadius: 11,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,
        marginVertical: 10,
        borderWidth: 1,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 150,
          borderRadius: 9,
        }}
      >
        <Image
          alt="Selected Image"
          source={{ uri: imageUrl }}
          style={{
            width: "100%",
            height: 150,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      </View>
      <Pressable
        style={{
          position: "absolute",
          right: 0,
          backgroundColor: "green",
          padding: 3,
          borderRadius: 50,
          marginTop: 3,
          marginRight: 3,
        }}
        onPress={onOpen}
      >
        <Icons.action size={32} color="black" />
      </Pressable>
      <HStack space={1} borderRadius="sm" marginLeft="1" bg="coolGray.300" padding="2" position='absolute' flexDirection="row" colorScheme="info" left="0">
        <Badge colorScheme="info">{id}</Badge>
        <Box borderWidth="1" padding="1">
          <TouchableOpacity style={{}} onPress={() => {
            onCopy(id)
            toast.show({
              render: () => {
                return (
                  <Box bg="green.500" px={4} py={3} rounded="sm" mb={5}>
                    <Text color="black" bold>
                      Copied to clipboard
                    </Text>
                  </Box>
                )
              },
              duration: 1500,
              placement: 'top',
            });
          }
          }>
            <Icons.clipboard size={24} color="black" />
          </TouchableOpacity>
        </Box>
      </HStack>
      <Divider height="px" backgroundColor={"black"} />
      <View
        style={{
          alignContent: "center",
          backgroundColor: "green",
          borderBottomRightRadius: 9,
          borderBottomLeftRadius: 9,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <Badge minW="20" colorScheme="green">{name}</Badge>
          <HStack space={2} alignItems="center">
            <TouchableOpacity style={{
              position: "relative",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: synced ? "#fff" : "#A0A0A0",
              padding: 5,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 8,
            }}
              aria-disabled={!synced}
              disabled={!synced}
              onPress={() => {
                setShowMQTTForm(true);
              }}
            >
              {!synced && (
                <Pressable
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    alignItems: "center"
                  }}
                  onPress={() => {
                    Alert.alert("Synchronization not registered", "The controller has not been synchronized to any of the remote servers, You can still synchronize it through settings")
                  }}
                >
                  <Icons.banIcon width={34} height={34} color="red" />
                </Pressable>
              )}
              <Icons.mqttIcon width={32} height={32} color="black" />
              <Text style={{ marginLeft: 10 }}>MQTT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: 5,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 8,
            }}
              onPress={() => {
                setShowWSForm(true);
              }}
            >
              <Icons.wifiIcon width={32} height={32} color="black" />
              <Text style={{ marginLeft: 10 }}>WiFi</Text>
            </TouchableOpacity>
          </HStack>

        </View>
        <WSTestConnectionForm
          id={id}
          showForm={showWSForm}
          setShowForm={setShowWSForm}
          store={store}
          type={type}
        />
        <MQTTConnectionTestForm
          id={id}
          showForm={showMQTTForm}
          setShowForm={setShowMQTTForm}
          store={store}
          type={type}
        />
        <CustomActionSheet
          onClose={onClose}
          onOpen={onOpen}
          isOpen={isOpen}
          title={name}
        >
          <Actionsheet.Item startIcon={<Icons.edit color="black" size={32} />}>
            Edit
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              setAlertDialogOpen(true);
              onClose();
            }}
            startIcon={<Icons.trash color="black" size={32} />}
          >
            Remove
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={handleSync}
            startIcon={
              loading ? (
                <LoadingIcon
                  width={32}
                  height={32}
                  color="black"
                  style={{
                    transform: [
                      {
                        rotate: spinValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '360deg']
                        })
                      }
                    ]
                  }}
                />
              ) :
                synced ? (
                  <Box position="relative">
                    <Icons.syncedIcon width={23} height={23} />
                    <Icons.syncArrow width={32} height={32} style={{
                      position: "absolute",
                      top: -4,
                      left: -4
                    }} color="black" />
                  </Box>
                ) : (
                  <Box position="relative">
                    <Icons.notSynced width={23} height={23} />
                    <Icons.syncArrow width={32} height={32} style={{
                      position: "absolute",
                      top: -4,
                      left: -4
                    }} color="black" />
                  </Box>
                )
            }
          >
            {
              loading ? "Syncing to the server" :
                synced ? "Synchronized to the server"
                  : "Not Synced, Press to sync it to server"
            }
          </Actionsheet.Item>
        </CustomActionSheet>
        <CustomAlertDialog
          title={`Remove ${type}`}
          isOpen={alertDialog}
          message={`Are you sure you want to remove ${name}?`}
          setIsOpen={setAlertDialogOpen}
          setDeleteGreenhouse={setRemoveGreenhouseConfirm}
        />
      </View>
    </View >
  );
};

export default GreenhouseNavContainer;
