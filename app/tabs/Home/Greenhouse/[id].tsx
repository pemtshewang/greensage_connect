import { useLocalSearchParams } from "expo-router";
import { View } from "native-base";
import { useGreenhouseStore } from "../../../../zustand/store";
import { Icons } from "../../../../assets/Icons/Icons";
import ReadingsContainer from "../../../../components/Greenhouse/Reading";
import ShadowContainer from "../../../../components/PressableShadowContainer";
import { useState, useEffect } from "react";
import { ScrollView } from "native-base";
import { Dimensions } from "react-native";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = Dimensions.get('window');
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
      <ReadingsContainer
        temperatureReading={params.temperature}
        humidityReading={params.humidity}
        soilMoistureReading={params.soil_moisture}
        ldrReading={params.ldr}
      />
      {
        width <= 768 ? (
          <ScrollView
            scrollEnabled={true}
            style={{
            }}
          >
            <View>
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
            </View>
          </ScrollView>) :
          (
            <View style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20
            }}>
              <ShadowContainer
                label={"Temperature"}
                id={id as string}
                icon={<Icons.exhaustFan width={32} height={32} color="black" />}
                navigatePath={`/tabs/Home/Greenhouse/mgTemperature/${id}`}
              />
              <ShadowContainer
                label={"Waterflow"}
                id={id as string}
                icon={<Icons.valve width={32} height={32} color="black" />}
                navigatePath={`/tabs/Home/Greenhouse/mgWaterLevel/${id}`}
              />
            </View>
          )
      }
    </>
  );
};

export default Page;
