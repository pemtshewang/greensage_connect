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
import { useGreenhouseStore } from "../../zustand/store";
import * as Crypto from "expo-crypto";
import useWebSocket from "../../hooks/websocket";

const GreenHouseAddForm = ({
  modalState,
  setModalState,
}: {
  modalState: boolean;
  setModalState: (state: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [imagePath, setImage] = useState<string>("");
  const store = useGreenhouseStore();
  const [data, setData] = useState({
    id: Crypto.randomUUID(),
    name: "",
    ipAddress: "",
    image: imagePath,
  });
  const ws = useWebSocket(data.ipAddress, "81", data.id);
  const handleSubmitData = (data: GreenhouseAddFormSchemaType) => {
    store.addGreenhouse({
      id: data.id,
      name: data.name,
      ipAddress: data.ipAddress,
      isConnected: false,
      backgroundImage: imagePath,
      temperature: 0,
      humidity: 0,
      ws: ws,
      ventilationFanState: false,
      soil_moisture: 0,
      lightState: false,
    });
    setModalState(false);
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
      <View>
        <TextInputIcon
          type="text"
          placeholder="Keep a name for your greenhouse"
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
      <Pressable
        onPress={handleSubmit(handleSubmitData)}
        style={{
          width: "100%",
          borderWidth: 2,
          borderRadius: 5,
          padding: 11,
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "#228B29",
        }}
      >
        <Text>Add Greenhouse</Text>
      </Pressable>
    </VStack>
  );
};

export default GreenHouseAddForm;
