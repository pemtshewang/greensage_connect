import { Stack } from "expo-router";
import { View, Text } from "native-base";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { Pressable } from "react-native";
import Icons from "../../../../../assets/Icons/Icons";
import TemperatureControllerContainer from "../../../../../components/TemperatureController";
import { useState } from "react";
import { useGreenhouseStore } from "../../../../../zustand/store";

export default function ParamsContainer() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const store = useGreenhouseStore();
  const greenhouse = store.greenhouses.find((res) => res.id === id);
  const [state, opState] = useState<boolean>(greenhouse?.ventilationFanState as boolean);
  const toggleState = () => {
    const updatedState = !state;
    if (!updatedState) {
      greenhouse?.ws.sendMessage("light:off");
      store.updateGreenhouse(id as string, {
        ...greenhouse,
        ventilationFanState: false
      });
    } else {
      greenhouse?.ws.sendMessage("light:on");
      store.updateGreenhouse(id as string, {
        ...greenhouse,
        ventilationFanState: true
      });
    }
    opState(updatedState); // Update the state after performing actions
  };
  return (
    <View style={{
      padding: 20
    }}>
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
                    fontSize="xl"
                  >Manage Temperature</Text>
                </View>
              </View>
            );
          },
        }}
      />
      <TemperatureControllerContainer
        state={state}
        setState={toggleState} />
    </View>
  )
}
