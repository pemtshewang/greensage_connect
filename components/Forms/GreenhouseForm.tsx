import { z } from "zod";
import { VStack, Image } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import TextInputIcon from "../../components/TextInputIcon";
import { Icons } from "../../assets/Icons/Icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Spinner } from "native-base";
import { Divider } from "native-base";
import { useForm } from "react-hook-form";
import { LoginSchemaType } from "../../types";
import { LoginSchema } from "../../validations/Auth/schema";
import zodResolver from "@hookform/resolvers/zod";
import { View, Text, Box } from "native-base";
import { useRouter } from "expo-router";
import { LoginStyles } from "../../styles/styles";
import * as ImagePicker from "expo-image-picker";
import { Pressable } from "react-native";
import type { GreenhouseAddFormSchemaType } from "../../types";
import GreenhouseAddFormSchema from "../../validations/GreenhouseAddFormSchema";

const GreenHouseAddForm = () => {
  const [loading, setLoading] = useState(false);
  const [imagePath, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    ipAddress: "",
    image: imagePath,
  });
  const handleSubmitData = (data: GreenhouseAddFormSchemaType) => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    },2000);
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

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <VStack space={2} alignItems="start" h="full">
      <View>
        <TextInputIcon
          type="text"
          placeholder="Keep a name for your greenhouse"
          value={data.name}
          onChangeText={(text) => {
            setData({ ...data, name: text });
          }}
          InputLeftElement={
            <Box style={LoginStyles.icon}>
              <Icons.warehouseIcon color="black" />
            </Box>
          }
        />
        <Text color="#f00">
            {errors.name && errors.name.message}
        </Text>
      </View>
      <View>
        <TextInputIcon
          type="text"
          placeholder="Enter IP address of the micro-controller"
          value={data.ipAddress}
          onChangeText={(text) => {
            setData({ ...data, ipAddress: text });
          }}    
          InputLeftElement={
            <Box style={LoginStyles.icon}>
              <Icons.internet color="black" />
            </Box>
          }
        />
        <Text color="#f00">
            {errors.ipAddress && errors.ipAddress.message}
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
          <Image alt="Selected Image" source={{ uri: imagePath }} style={{ width: 200, height: 200 }} />
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
        <Text>
            Add Greenhouse
        </Text>
      </Pressable>
    </VStack>
  );
};

export default GreenHouseAddForm;
