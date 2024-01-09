import { Stack } from "expo-router";
import { View, Text, ScrollView } from "native-base";
import { useNavigation } from "expo-router";
import { Pressable } from "react-native";
import Icons from "../../../../../assets/Icons/Icons";
import WaterValveControllerContainer from "../../../../../components/WaterValveController";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useGreenhouseStore } from "../../../../../zustand/store";
import { useRouter } from "expo-router";
import ThresholdSetForm from "../../../../../components/Forms/ThresholdSetForm";
import WaterSchedulerForm from "../../../../../components/Forms/WaterScheduleForm";
import { IWebSocket, WaterScheduleSets } from "../../../../../zustand/state";

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
      greenhouse?.ws.sendMessage("waterValve:close");
      store.updateGreenhouse(id as string, {
        ...greenhouse,
        waterValveState: false
      });
    } else {
      greenhouse?.ws.sendMessage("waterValve:open");
      store.updateGreenhouse(id as string, {
        ...greenhouse,
        waterValveState: true
      });
    }
    opState(updatedState); // Update the state after performing actions
  };
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
                    fontSize="xl"
                  >Manage Waterflow</Text>
                </View>
              </View>
            );
          },
        }}
      />
      <ScrollView
        w="container"
        padding="5"
      >
        <WaterValveControllerContainer
          state={state}
          setState={toggleState} />
        <ThresholdSetForm
          type="soil_moisture"
          message="Set the soil moisture threshold"
          ws={greenhouse?.ws as IWebSocket}
          defaultValue={"10"} />
        <WaterSchedulerForm
          id={id as string}
          ws={greenhouse?.ws as IWebSocket}
          waterScheduleSets={greenhouse?.waterSchedule as WaterScheduleSets}
        />
      </ScrollView>
    </View>
  )
}

