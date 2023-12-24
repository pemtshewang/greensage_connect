import { Stack } from "expo-router";
import { View } from "native-base";
import { useNavigation } from "expo-router";
import { Pressable } from "react-native";
import Icons from "../../../../../assets/Icons/Icons";
import { Heading } from "native-base";

export default function ParamsContainer() {
  const navigation = useNavigation();
  return (
    <Stack.Screen
      options={{
        header: () => {
          return (
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                padding: 10,
                gap: 10,
                backgroundColor: "green"
              }}
            >
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Icons.navigateBack color="black" size={32} />
              </Pressable>
              <Heading color="#fff">Water level</Heading>
            </View>
          );
        },
      }}
    />
  )
}

