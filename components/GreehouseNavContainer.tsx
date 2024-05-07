import { Pressable, TouchableOpacity } from "react-native";
import { View, Image, Text, Badge, HStack, useClipboard } from "native-base";
import { Divider, Box } from "native-base";
import Icons from "../assets/Icons/Icons";
import { useDisclose } from "native-base";
import CustomActionSheet from "./ui/ActionSheet";
import { Actionsheet } from "native-base";
import { useEffect, useState } from "react";
import CustomAlertDialog from "./ui/AlertDialog";
import WSTestConnectionForm from "./Forms/WebSocketConnectionTest";
import MQTTConnectionTestForm from "./Forms/MqttConnectionTest";
import {
  useGreenhouseStore,
  useIrrigationControllerStore,
} from "../zustand/store";
import { Alert } from "react-native";
import { Animated } from "react-native";
import { syncToCloud } from "../utils/sync";
import createToast from "../hooks/toast";
import { LinearGradient } from "expo-linear-gradient";
import NavContainerEditForm from "./Forms/NavContainerEditForm";

const GreenhouseNavContainer = ({
  id,
  name,
  imageUrl,
  removeGreenhouse,
  type,
}: {
  id: string;
  name: string;
  type: "Greenhouse" | "Irrigation";
  imageUrl: string;
  removeGreenhouse: (id: string) => void;
}) => {
  const store =
    type === "Greenhouse"
      ? useGreenhouseStore()
      : useIrrigationControllerStore();
  const { toastMessage } = createToast();
  const controller = store.items.find((item) => item.id === id);
  const [synced, setSynced] = useState<boolean>(controller?.synced as boolean);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [alertDialog, setAlertDialogOpen] = useState<boolean>(false);
  const [removeGreenhouseConfirm, setRemoveGreenhouseConfirm] =
    useState<boolean>(false);
  const [showWSForm, setShowWSForm] = useState<boolean>(false);
  const [showMQTTForm, setShowMQTTForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Set loading to false initially
  const { onCopy } = useClipboard();

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
          message: "Synchronized to the server",
        });
        store.updateItem(controller?.id as string, {
          synced: true,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false when sync completes
    }
  };

  const spinValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
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
          top: 5,
          right: 5,
          backgroundColor: "#8CC6A8",
          marginTop: 3,
          marginRight: 3,
          borderRadius: 50,
        }}
        onPress={onOpen}
      >
        <LinearGradient
          colors={["#228929", "#6A4"]}
          style={{
            borderRadius: 50,
            padding: 5,
          }}
        >
          <Icons.action size={32} color="black" />
        </LinearGradient>
      </Pressable>
      <HStack
        space={1}
        borderRadius="sm"
        position="absolute"
        flexDirection="row"
        colorScheme="info"
      >
        <LinearGradient
          style={{
            borderCurve: "circular",
            borderRadius: 8,
          }}
          colors={["#228B29", "#6A4"]}
        >
          <Box borderRadius="md" borderWidth="1" padding="1">
            <TouchableOpacity
              style={{
                flexDirection: "row",
                gap: 5,
              }}
              onPress={() => {
                onCopy(id);
              }}
            >
              <Icons.clipboard size={24} color="black" />
              <Badge colorScheme="info">{id}</Badge>
            </TouchableOpacity>
          </Box>
        </LinearGradient>
      </HStack>
      <Divider height="px" backgroundColor={"black"} />

      <LinearGradient
        style={{
          borderBottomRightRadius: 9,
          borderBottomLeftRadius: 9,
        }}
        colors={["#228B29", "#6A4"]}
      >
        <View
          style={{
            alignContent: "center",
            backgroundColor: "transparent",
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
            <Badge minW="20" colorScheme="green">
              {name}
            </Badge>
            <HStack space={2} alignItems="center">
              <TouchableOpacity
                style={{
                  position: "relative",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: synced ? "#fff" : "#A0A0A0",
                  padding: 5,
                  borderRadius: 10,
                  gap: 3,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 8,
                  width: 100,
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
                      alignItems: "center",
                    }}
                    onPress={() => {
                      Alert.alert(
                        "Synchronization not registered",
                        "The controller has not been synchronized to any of the remote servers, You can still synchronize it through settings",
                      );
                    }}
                  >
                    <Icons.banIcon width={34} height={34} color="red" />
                  </Pressable>
                )}
                <Icons.mqttIcon width={32} height={32} color="black" />
                <Text>REMOTE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  padding: 5,
                  gap: 3,
                  borderRadius: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 8,
                  width: 100,
                }}
                onPress={() => {
                  setShowWSForm(true);
                }}
              >
                <Icons.wifiIcon width={32} height={32} color="black" />
                <Text>LOCAL</Text>
              </TouchableOpacity>
            </HStack>
          </View>
          <WSTestConnectionForm
            id={id}
            showForm={showWSForm}
            setShowForm={setShowWSForm}
            //@ts-ignore
            store={store}
            type={type}
          />
          <MQTTConnectionTestForm
            id={id}
            showForm={showMQTTForm}
            setShowForm={setShowMQTTForm}
            //@ts-ignore
            store={store}
            type={type}
          />
          <CustomActionSheet
            onClose={onClose}
            onOpen={onOpen}
            isOpen={isOpen}
            title={`Actions available for ${name}`}
          >
            <Actionsheet.Item
              startIcon={<Icons.edit color="black" size={32} />}
              onPress={() => {
                setShowEditForm(true);
                onClose();
              }}
            >
              Edit details
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
                            outputRange: ["0deg", "360deg"],
                          }),
                        },
                      ],
                    }}
                  />
                ) : synced ? (
                  <Box position="relative">
                    <Icons.syncedIcon width={23} height={23} />
                    <Icons.syncArrow
                      width={32}
                      height={32}
                      style={{
                        position: "absolute",
                        top: -4,
                        left: -4,
                      }}
                      color="black"
                    />
                  </Box>
                ) : (
                  <Box position="relative">
                    <Icons.notSynced width={23} height={23} />
                    <Icons.syncArrow
                      width={32}
                      height={32}
                      style={{
                        position: "absolute",
                        top: -4,
                        left: -4,
                      }}
                      color="black"
                    />
                  </Box>
                )
              }
            >
              {loading
                ? "Syncing to the server"
                : synced
                  ? "Synchronized to the server"
                  : "Not Synced, Press to sync it to server"}
            </Actionsheet.Item>
          </CustomActionSheet>
          <CustomAlertDialog
            title={`Remove ${type}`}
            isOpen={alertDialog}
            message={`Are you sure you want to remove ${name}?`}
            setIsOpen={setAlertDialogOpen}
            setDeleteGreenhouse={setRemoveGreenhouseConfirm}
          />
          {controller?.id && (
            <NavContainerEditForm
              key={controller?.id}
              id={controller?.id as string}
              name={controller?.name as string}
              store={store}
              modalTitle={`Edit ${controller?.name}`}
              modalVisible={showEditForm}
              setModalVisible={setShowEditForm}
              //@ts-ignore
              controller={controller}
            />
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export default GreenhouseNavContainer;
