import { Pressable } from "react-native";
import { View, Image, Text } from "native-base";
import { useRouter } from "expo-router";

const GreenhouseNavContainer = ({
  id,
  imageUrl,
}: {
  id: string;
  imageUrl: string;
}) => {
  const router = useRouter();
  return (
    <Pressable
      key={id}
      onPress={() => {
        router.push(`/tabs/Home/Greenhouse/${id}`);
      }}
    >
      <View>
        <Text>Image</Text>
        <Image source={{ uri: imageUrl }} width="container" alt="image" />
      </View>
    </Pressable>
  );
};
export default GreenhouseNavContainer;
