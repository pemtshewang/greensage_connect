import { Stack } from "expo-router";
import { View, Text } from "native-base";
import { useNavigation } from "expo-router";
import { Pressable } from "react-native";
import Icons from "../../../../../assets/Icons/Icons";
import WaterValveControllerContainer from "../../../../../components/WaterValveController";
import { useState } from "react";

export default function ParamsContainer() {
  const [state, setState] = useState<boolean>(false);
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: 20
      }}
    >
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
                  >Manage Waterflow</Text>
                </View>
              </View>
            );
          },
        }}
      />
      <WaterValveControllerContainer
        state={state}
        setState={setState} />
    </View>
  )
}

