import { VStack, Image } from "native-base";
import TextInputIcon from "../../components/TextInputIcon";
import { Icons } from "../../assets/Icons/Icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import zodResolver from "@hookform/resolvers/zod";
import { View, Text, Box } from "native-base";
import { LoginStyles } from "../../styles/styles";
import * as ImagePicker from "expo-image-picker";
import { Pressable } from "react-native";
import type { GreenhouseAddFormSchemaType } from "../../types";
import GreenhouseAddFormSchema from "../../validations/GreenhouseAddFormSchema";
import { useGreenhouseStore, useIrrigationControllerStore } from "../../zustand/store";
import * as Crypto from "expo-crypto";
import IDAlertDialog from "../IDAlert";
import { Spinner } from "native-base";

const GreenHouseAddForm = ({
  type,
  setModalState,
}: {
  type: "irrigation" | "greenhouse"
  setModalState: (state: boolean) => void;
}) => {
  const [imagePath, setImage] = useState<string>("");
  const irrigationStore = useIrrigationControllerStore();
  const greenhouseStore = useGreenhouseStore();
  const [data, setData] = useState({
    id: Crypto.randomUUID().slice(0, 10),
    name: "",
    ipAddress: "",
    image: imagePath,
  });
  const [alertIDDialogOpen, setAlertIDDialogOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmitData = (data: GreenhouseAddFormSchemaType) => {
    setLoading(true);
    if (type === "irrigation") {
      irrigationStore.addIrrigationController({
        id: data.id,
        name: data.name,
        ipAddress: data.ipAddress,
        isConnected: false,
        backgroundImage: imagePath,
        valveStates: {
          firstSlot: null,
          secondSlot: null,
          thirdSlot: null,
          fourthSlot: null,
          fifthSlot: null
        },
        soil_moisture: 0,
        ws: null
      });
    } else {
      greenhouseStore.addGreenhouse({
        id: data.id,
        name: data.name,
        ipAddress: data.ipAddress,
        isConnected: false,
        backgroundImage: imagePath,
        temperature: 0,
        humidity: 0,
        soil_moisture: 0,
        temperatureThreshold: 0,
        soilMoistureThreshold: 0,
        ws: null,
        ldrReading: 0,
        ventilationFanState: false,
        lightState: false,
        waterValveState: false,
        firstSlot: null,
        secondSlot: null,
        thirdSlot: null,
        humidityThreshold: 0,
        rollerShutterLeftState: false,
        rollerShutterRightState: false,
      });
    }
    setTimeout(() => {
      setLoading(false);
      setModalState(false);
    }, 1500);
  }
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
      <View>
        <TextInputIcon
          type="text"
          placeholder={`Keep a name for your ${type}`}
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
          type="text"
          placeholder="Enter IP address of the controller"
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
        <Text color="#f00">
          {errors.image && String(errors.image.message)}
        </Text>
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
          gap: 5
        }}
      >
        {
          loading ? <Text color="#a0a0a0">Adding {type}</Text> : <Text color="white">Add {type}</Text>
        }
        {
          loading && <Spinner color="white" />
        }
      </Pressable>
    </VStack>
  );
}

export default GreenHouseAddForm;
