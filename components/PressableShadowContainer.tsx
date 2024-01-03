import { useRouter } from "expo-router";
import { View, Text } from "native-base";
import { Pressable } from "react-native";

export default function ShadowContainer({
  navigatePath,
  icon,
  label,
  id
}: {
  navigatePath: string,
  icon: JSX.Element,
  label: string,
  id: string
}) {
  const router = useRouter();
  return (
    <Pressable
      style={{
        width: 150,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8, // Required for Android
        backgroundColor: "green", // Add a background color if not already specified
        borderRadius: 10, // Add border radius for rounded corners if desired
      }}
      onPress={() => {
        router.setParams({ id: id });
        router.push(navigatePath);
      }}
    >
      <View style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10
      }}>
        {icon}
        <Text style={{
          color: "#ffd"
        }}>{label}</Text>
      </View>
    </Pressable >
  )
}
