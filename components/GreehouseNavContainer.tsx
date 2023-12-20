import { Pressable } from "react-native";
import { View, Image, Text } from "native-base";
import { useRouter } from "expo-router";
import { Divider } from "native-base";
import Icons from "../assets/Icons/Icons";

const GreenhouseNavContainer = ({
  id,
  name,
  imageUrl,
}: {
  id: string;
  name: string;
  imageUrl: string;
}) => {
  const router = useRouter();
  return (
    <>
      <View
        style={{
          width: "100%",
          height: 150,
          borderRadius: 9,
        }}
      >
        <View style={{
            width: 64,
            height: 64,
            borderRadius: 999,
            padding: 5,
            backgroundColor: "white",
            position: "absolute",
        }}>
            <Icons.help  size={32} color="black"/>
        </View>
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
      <Divider height="px" backgroundColor={"black"} />
      <View
        style={{
          alignContent: "center",
          paddingTop: 10,
          backgroundColor: "green",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text color="white" marginLeft={5}>
            {name}
          </Text>
          <Pressable>
            <Icons.enter color="black" />
          </Pressable>
        </View>
      </View>
    </>
  );
};
export default GreenhouseNavContainer;
