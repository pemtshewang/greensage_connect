import { Stack } from "expo-router";
import { View, Text } from "native-base";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Pressable } from "react-native";
import Icons from "../../../../../assets/Icons/Icons";

export default function ParamsContainer() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
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
                <View
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Text
                    color="#fff"
                    w="container"
                    fontSize="xl"
                  >Manage Temperature</Text>
                </View>
              </View>
            );
          },
        }}
      />
      <Text>
        This is the {id}
      </Text>
    </View>
  )
}

