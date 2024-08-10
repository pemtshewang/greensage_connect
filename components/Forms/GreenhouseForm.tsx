import { VStack, Image } from "native-base";
import TextInputIcon from "../../components/TextInputIcon";
import { Icons } from "../../assets/Icons/Icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import zodResolver from "@hookform/resolvers/zod";
import { View, Text, Box } from "native-base";
import { LoginStyles } from "../../styles/styles";
import * as ImagePicker from "expo-image-picker";
import { Pressable } from "react-native";
import type { GreenhouseAddFormSchemaType } from "../../types";
import GreenhouseAddFormSchema from "../../validations/GreenhouseAddFormSchema";
import {
  useGreenhouseStore,
  useIrrigationControllerStore,
} from "../../zustand/store";
import * as Crypto from "expo-crypto";
import { Spinner } from "native-base";
import { Checkbox } from "native-base";
import { checkInternetConnection } from "../../utils/internet";
import { syncToCloud } from "../../utils/sync";
import createToast from "../../hooks/toast";

const GreenHouseAddForm = ({
  type,
  setModalState,
}: {
  type: "irrigation" | "greenhouse";
  setModalState: (state: boolean) => void;
}) => {
  const [imagePath, setImage] = useState<string>("");
  const [synced, setSynced] = useState<boolean>(false);
  const irrigationStore = useIrrigationControllerStore();
  const greenhouseStore = useGreenhouseStore();
  const { toastMessage } = createToast();
  const [loadingMsg, setLoadingMsg] = useState<string>("Adding" + type);
  const [data, setData] = useState({
    id: Crypto.randomUUID().slice(0, 10),
    name: "",
    ipAddress: "192.168.4.1",
    image: imagePath,
  });
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    checkInternetConnection().then((res) => {
      if (res) {
        setSynced(true);
      } else {
        setSynced(false);
      }
    });
  }, []);
  const handleSubmitData = (data: GreenhouseAddFormSchemaType) => {
    setLoading(true);

    try {
      if (synced) {
        setLoadingMsg("Syncing with cloud");
        checkInternetConnection().then((res) => {
          if (res) {
            syncToCloud({
              controllerId: data.id,
              name: data.name,
              type: type,
            }).then((res) => {
              if (res) {
                toastMessage({
                  type: "success",
                  message: res as string,
                });
              } else {
                toastMessage({
                  type: "error",
                  message: "Failed to sync data to cloud",
                });
              }
            });
          } else {
            toastMessage({
              type: "error",
              message: "No internet connection",
            });
          }
        });
      }
      if (type === "irrigation") {
        const defaultSlotValues = {
          state: false,
          endTime: null,
          repDays: 0,
          startTime: null,
        };
        irrigationStore.addItem({
          id: data.id,
          name: data.name,
          ipAddress: data.ipAddress,
          isConnected: false,
          backgroundImage: imagePath,
          valveStates: {
            firstSlot: {
              name: "firstSlot",
              ...defaultSlotValues,
            },
            secondSlot: {
              name: "secondSlot",
              ...defaultSlotValues,
            },
            thirdSlot: {
              name: "thirdSlot",
              ...defaultSlotValues,
            },
            fourthSlot: {
              name: "fourthSlot",
              ...defaultSlotValues,
            },
            fifthSlot: {
              name: "fifthSlot",
              ...defaultSlotValues,
            },
            sixthSlot: {
              name: "sixthSlot",
              ...defaultSlotValues,
            },
            seventhSlot: {
              name: "seventhSlot",
              ...defaultSlotValues,
            },
          },
          soilMoisture: 0,
          synced: synced,
          ws: null,
          connectionType: null,
        });
      } else {
        greenhouseStore.addItem({
          id: data.id,
          name: data.name,
          ipAddress: data.ipAddress,
          isConnected: false,
          backgroundImage: imagePath,
          temperatureThreshold: 0,
          soilMoistureThreshold: 0,
          ws: null,
          ventilationFanState: false,
          lightState: false,
          waterValveState: false,
          firstSlot: null,
          secondSlot: null,
          thirdSlot: null,
          humidityThreshold: 0,
          rollerShutterLeftState: false,
          rollerShutterRightState: false,
          connectionType: null,
          synced: synced,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setModalState(false);
    }
  };
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<GreenhouseAddFormSchemaType>({
    resolver: zodResolver.zodResolver(GreenhouseAddFormSchema),
    defaultValues: { ...data },
    values: { ...data },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImagePath = result.assets[0].uri;
      setImage(newImagePath);
      setData((prevData) => ({ ...prevData, image: newImagePath }));
    }
  };
  return (
    <VStack space={2} alignItems="start" h="full">
      <View marginBottom="3">
        <Checkbox
          shadow={2}
          value="sync"
          accessibilityLabel="This is a sync checkbox"
          _checked={{ bg: "green.500" }}
          isChecked={synced}
          onChange={() => {
            setSynced(!synced);
          }}
          fontFamily="OpenSans"
        >
          Sync it for remote access
        </Checkbox>
      </View>
      <View>
        <TextInputIcon
          //@ts-ignore
          type="text"
          placeholder={`Keep a name for your ${type}`}
          placeholderTextColor="coolGray.400"
          letterSpacing="0"
          value={data.name}
          onChangeText={(text: string) => {
            setData({ ...data, name: text });
          }}
          InputLeftElement={
            <Box style={LoginStyles.icon}>
              <Icons.warehouseIcon color="black" />
            </Box>
          }
        />
        <Text color="#f00">{errors.name && String(errors.name.message)}</Text>
      </View>
      <View>
        <TextInputIcon
          //@ts-ignore
          type="text"
          placeholder="Enter IP address of the controller"
          placeholderTextColor="coolGray.400"
          letterSpacing="0"
          value={data.ipAddress}
          onChangeText={(text: string): void => {
            setData({ ...data, ipAddress: text });
          }}
          InputLeftElement={
            <Box style={LoginStyles.icon}>
              <Icons.internet color="black" />
            </Box>
          }
        />
        <Text color="#f00">
          {errors.ipAddress && String(errors.ipAddress.message)}
        </Text>
      </View>
      <View>
        <Pressable
          onPress={pickImage}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderWidth: 2,
            padding: 11,
            borderRadius: 5,
          }}
        >
          <Text>Choose an image for greenhouse</Text>
          <Icons.camera color="black" />
        </Pressable>
        <Text color="#f00">{errors.image && String(errors.image.message)}</Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {imagePath && (
            <Image
              alt="Selected Image"
              source={{ uri: imagePath }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
      </View>
      <Pressable
        disabled={loading}
        onPress={handleSubmit(handleSubmitData)}
        style={{
          width: "100%",
          borderWidth: 2,
          borderRadius: 5,
          padding: 11,
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "#228B29",
          gap: 5,
        }}
      >
        {loading ? (
          <Text fontFamily="OpenSans" color="#a0a0a0">
            {loadingMsg}
          </Text>
        ) : (
          <Text fontFamily="OpenSans" letterSpacing="1" color="white">
            Add {type}
          </Text>
        )}
        {loading && <Spinner color="white" />}
      </Pressable>
    </VStack>
  );
};
export default GreenHouseAddForm;
