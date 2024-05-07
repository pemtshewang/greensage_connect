import { useRouter } from "expo-router";
import { View, Text } from "native-base";
import { Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ShadowContainer({
  navigatePath,
  icon,
  label,
  id,
}: {
  navigatePath: string;
  icon: JSX.Element;
  label: string;
  id: string;
}) {
  const router = useRouter();
  return (
    <Pressable
      style={{
        width: 150,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8, // Required for Android
        borderRadius: 10, // Add border radius for rounded corners if desired
      }}
      onPress={() => {
        router.setParams({ id: id });
        router.push(navigatePath);
      }}
    >
      <LinearGradient
        style={{
          padding: 10,
          borderCurve: "circular",
          borderRadius: 10,
        }}
        colors={["#228929", "#6A4"]}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          {icon}
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#ffd",
              fontFamily: "OpenSans",
              fontSize: 16,
            }}
          >
            Regulate
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}
