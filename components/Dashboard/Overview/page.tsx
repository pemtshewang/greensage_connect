import { View, Text } from "native-base";
import { getValueFor } from "../../../securestore";
import { useEffect, useState } from "react";
import EnvironmentParametersChart from "./readings";
import { IHumidityThresholdRecord, IReadings, ISoilMoistureThresholdRecords, ITemperatureThresholdRecord, IWaterScheduleRecords } from "../../../types";
import ThresholdChart from "./threshold";
import WaterScheduleTable from "./waterschedulerecords";
import { Pressable } from "react-native";
import Icons from "../../../assets/Icons/Icons";
import { Animated, Easing } from "react-native";
import { Center, VStack, Skeleton } from "native-base";
import { Divider } from "native-base";

async function getOverViewData() {
  const value = JSON.parse(await getValueFor("token") as string);
  const token = value?.accessToken?.token;
  const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/user/dashboard/readings/overview`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return false;
}

interface Data {
  waterScheduleRecords: IWaterScheduleRecords[],
  HumidityThresholdRecord: IHumidityThresholdRecord[],
  TemperatureThresholdRecord: ITemperatureThresholdRecord[],
  soilMoistureThresholdRecords: ISoilMoistureThresholdRecords[],
  readings: IReadings[]
}

const OverviewChart = () => {
  const [data, setData] = useState<Data>();
  const [isRefreshing, setIsRefreshing] = useState(false); // Use `isRefreshing` for animation state
  const [loading, setLoading] = useState(true);
  const spinValue = new Animated.Value(0); // Create Animated.Value
  useEffect(() => {
    const fetchData = async () => {
      setIsRefreshing(true); // Set `isRefreshing` to true before fetching data
      try {
        const res = await getOverViewData();
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsRefreshing(false); // Set `isRefreshing` to false after fetching or error
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    getOverViewData().then((res) => {
      setData(res);
    })
  }, []);

  const startSpinAnimation = () => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true, // Optimize for performance
    }).start();
  };

  const stopSpinAnimation = () => {
    spinValue.stopAnimation();
    spinValue.setValue(0); // Reset spinValue to initial state
  };
  return (
    <>
      {
        !loading ? (
          <>
            <View marginBottom="3" marginTop="2" marginRight="3" flexDirection="row" justifyContent="flex-end" position="relative">
              <Pressable
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5
                }}
                onPress={() => {
                  setIsRefreshing(true);
                  setLoading(true);
                  startSpinAnimation();
                  getOverViewData()
                    .then((res) => {
                      setData(res);
                    })
                    .catch((error) => {
                      console.error("Error fetching data:", error);
                    })
                    .finally(() => {
                      setIsRefreshing(false);
                      setLoading(false);
                      stopSpinAnimation();
                    });
                }}>
                <Text fontSize={11} fontFamily="OpenSans">Refresh Chart</Text>
                <Animated.View style={{ transform: [{ rotate: spinValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }}>
                  <Icons.syncArrow color="black" />
                </Animated.View>
              </Pressable>
            </View >
            {data && (
              <>
                <EnvironmentParametersChart readings={data.readings} />
                <Divider />
                <ThresholdChart data={data.TemperatureThresholdRecord} type="temperature" title="Temperature Threshold Overview Chart" />
                <Divider />
                <ThresholdChart data={data.HumidityThresholdRecord} type="humidity" title="Humidity Threshold Overview Chart" />
                <Divider />
                <ThresholdChart data={data.soilMoistureThresholdRecords} type="soilMoisture" title="Soil Moisture Threshold Overview Chart" />
                <Divider />
                <WaterScheduleTable waterScheduleRecords={data.waterScheduleRecords} />
              </>
            )
            }
          </>
        ) : (
          <VStack space={2} position="relative" >
            <Text position="absolute" top="1/2" right="1/4">The chart is being generated ...</Text>
            <Center w="full">
              <VStack w="100%" maxW="400" paddingBottom="5" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                borderColor: 'coolGray.500'
              }} _light={{
                borderColor: 'coolGray.200'
              }}>
                <Skeleton h="40" />
                <Skeleton h="2" px="4" />
              </VStack>
            </Center>
            <Center w="full">
              <VStack w="100%" maxW="400" paddingBottom="5" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                borderColor: 'coolGray.500'
              }} _light={{
                borderColor: 'coolGray.200'
              }}>
                <Skeleton h="40" />
                <Skeleton h="2" px="4" />
              </VStack>
            </Center>
            <Center w="full">
              <VStack w="100%" maxW="400" paddingBottom="5" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                borderColor: 'coolGray.500'
              }} _light={{
                borderColor: 'coolGray.200'
              }}>
                <Skeleton h="20" />
                <Skeleton h="2" px="4" />
              </VStack>
            </Center>
          </VStack>
        )
      }
    </>
  )
}

export default OverviewChart;


