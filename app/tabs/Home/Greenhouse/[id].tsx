import { useLocalSearchParams, useRouter } from "expo-router";
import { View, ScrollView, Text } from "native-base";
import { useGreenhouseStore } from "../../../../zustand/store";
import { Stack } from "expo-router";
import { Icons } from "../../../../assets/Icons/Icons";
import { useNavigation } from "expo-router";
import { Pressable } from "react-native";
import ReadingsContainer from "../../../../components/Greenhouse/Reading";
import ShadowContainer from "../../../../components/PressableShadowContainer";
import { useState, useEffect } from "react";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [params, setParams] = useState<{
    temperature: number;
    humidity: number;
    soil_moisture: number;
    ldr: number;
  }>({
    temperature: 0,
    humidity: 0,
    soil_moisture: 0,
    ldr: 0,
  });
  const store = useGreenhouseStore();
  const greenhouse = store.greenhouses.find(
    (g) => g.id === id
  );
  useEffect(() => {
    setParams({
      temperature: greenhouse?.temperature as number,
      humidity: greenhouse?.humidity as number,
      soil_moisture: greenhouse?.soil_moisture as number,
      ldr: greenhouse?.soil_moisture as number,
    });
  }, [greenhouse]);
  return (
    <>
      < ScrollView
        scrollEnabled={true}
        style={{
          paddingTop: 10
        }}>
        <ReadingsContainer
          temperatureReading={params.temperature}
          humidityReading={params.humidity}
          soilMoistureReading={params.soil_moisture}
          ldrReading={params.ldr}
        />
        <View style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20
        }}>
          <ShadowContainer
            label={"Manage Temperature"}
            id={id as string}
            icon={<Icons.exhaustFan width={32} height={32} color="black" />}
            navigatePath={`/tabs/Home/Greenhouse/mgTemperature/${id}`}
          />
          <ShadowContainer
            label={"Manage Waterflow"}
            id={id as string}
            icon={<Icons.valve width={32} height={32} color="black" />}
            navigatePath={`/tabs/Home/Greenhouse/mgWaterLevel/${id}`}
          />
        </View>
      </ScrollView >
    </>
  );
};

export default Page;
