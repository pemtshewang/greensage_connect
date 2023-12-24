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
      onPress={() => {
        router.setParams({ id: id });
        router.push(navigatePath);
      }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          margin: 7,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 8, // Required for Android
          backgroundColor: "green", // Add a background color if not already specified
          padding: 10, // Adjust padding as needed
          borderRadius: 10, // Add border radius for rounded corners if desired
        }}
      >
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          padding: 10
        }}>
          {icon}
        </View>
        <Text style={{
          textAlign: "center", fontWeight: "bold", color: "#fff",
          width: "100%",
        }}>{label}</Text>
      </View>
    </Pressable>
  )
}
