import { Stack } from "expo-router";
import { View, Text } from "native-base";
import { useNavigation } from "expo-router";
import { Pressable } from "react-native";
import Icons from "../../../../../assets/Icons/Icons";
import WaterValveControllerContainer from "../../../../../components/WaterValveController";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useGreenhouseStore } from "../../../../../zustand/store";
import { useRouter } from "expo-router";

export default function ParamsContainer() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const store = useGreenhouseStore();
  const greenhouse = store.greenhouses.find((res) => res.id === id);
  const [state, opState] = useState<boolean>(greenhouse?.ventilationFanState || false);
  const router = useRouter();
  // session ends 
  const toggleState = () => {
    const updatedState = !state; // Calculate the updated state value
    // Perform actions based on the updatedState
    if (!updatedState) {
      greenhouse?.ws.sendMessage("waterValve:off");
      store.updateGreenhouse(id as string, {
        ...greenhouse,
        waterValveState: false
      });
    } else {
      greenhouse?.ws.sendMessage("waterValve:on");
      store.updateGreenhouse(id as string, {
        ...greenhouse,
        waterValveState: true
      });
    }
    opState(updatedState); // Update the state after performing actions
  };
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
        setState={toggleState} />
    </View>
  )
}

