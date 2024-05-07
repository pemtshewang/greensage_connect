import React, { useState, useEffect } from "react";
import { Badge, HStack, Text, VStack, View } from "native-base";
import * as Location from "expo-location";
import getWeather from "../api/weather/api";
import { Icons } from "../assets/Icons/Icons";
import { exportReadings as wData } from "../api/weather/api";
import { format } from "date-fns";
import { useNetInfo } from "@react-native-community/netinfo";
import LocationDetails from "../api/location";
import { Skeleton } from "native-base";

const WeatherContainer = () => {
  const getWeatherIcon = () => {
    if (wData) {
      const { is_day, precipitation, rain, showers, cloud_cover } = wData;
      if (is_day === 1) {
        // Daytime conditions
        if (precipitation > 0 || rain > 0 || showers > 0) {
          return <Icons.rain width={55} height={55} fill="lightblue" />;
        } else if (cloud_cover >= 80) {
          return <Icons.sunnyCloudy width={55} height={55} />;
        } else {
          return <Icons.sunnyWeather width={55} height={55} />;
        }
      } else {
        // Nighttime conditions
        if (precipitation > 0 || rain > 0 || showers > 0) {
          return <Icons.moon width={55} height={55} />;
        } else if (cloud_cover >= 80) {
          return <Icons.moon width={55} height={55} />;
        } else {
          return <Icons.moon width={55} height={55} />;
        }
      }
    }
    return <Skeleton height="12" width="12" borderRadius={99} />;
  };
  const { isInternetReachable } = useNetInfo();
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [weatherIcon, setWeatherIcon] = useState(
    <Icons.sunnyWeather width={55} height={55} color="black" />,
  );
  const [readings, setReadings] = useState<any>([]);
  const [locationName, setLocationName] = useState<{
    village: string;
    state: string;
    county: string;
  }>({
    village: "",
    state: "",
    county: "",
  });
  useEffect(() => {
    (async () => {
      if (isInternetReachable) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        getWeather({
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        }).then((data) => {
          setReadings(data);
          setWeatherIcon(getWeatherIcon());
        });
        if (location) {
          const locationName = await LocationDetails({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          setLocationName({
            village: locationName.village,
            state: locationName.state,
            county: locationName.county,
          });
        }
      } else {
        setErrorMsg("No internet connection");
      }
    })();
  }, [isInternetReachable]);
  useEffect(() => {
    (async () => { })();
  }, []);

  let text = "Getting Location...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View bg="white">
      <View
        bg="teal.50"
        paddingX="5"
        paddingY="4"
        style={{
          borderBottomRightRadius: 50,
          borderBottomLeftRadius: 50,
          flexDirection: "row",
          shadowColor: "#000",
          elevation: 8,
          position: "relative",
        }}
      >
        {weatherIcon}
        <VStack padding="4" space={2}>
          {locationName.village === "" ? (
            <HStack space="2">
              <Skeleton height="2" width="12" />
              <Skeleton height="2" width="10" />
              <Skeleton height="2" width="10" />
            </HStack>
          ) : (
            <Text fontFamily="OpenSans">
              {locationName.village && locationName.village}
              {locationName.village && " "}
              {locationName.county && locationName.county.split(" ")[0]}
              {locationName.county && " "}
              {locationName.state}
            </Text>
          )}
          <HStack space="3">
            <HStack>
              <Icons.thermometer width={25} height={25} color="#003" />
              {readings.temperature_2m ? (
                <Badge colorScheme="teal">{readings.temperature_2m}</Badge>
              ) : (
                <Skeleton colorScheme="trueGray" height="2" width="9" />
              )}
            </HStack>
            <HStack>
              <Icons.droplets width={25} height={25} color="black" />
              {readings.relative_humidity_2m ? (
                <Badge colorScheme="teal">
                  {readings.relative_humidity_2m}
                </Badge>
              ) : (
                <Skeleton colorScheme="trueGray" height="2" width="9" />
              )}
            </HStack>
          </HStack>
        </VStack>
        <Text
          color="#A0A0A0"
          fontSize={10}
          position="absolute"
          right="9"
          bottom="0"
          fontFamily="OpenSans"
          padding="1"
        >
          Powered by @OpenMeteo
        </Text>
        <VStack position="absolute" right="20%" top="43%">
          <Text textAlign="center" fontSize="2xl" bold>
            {format(new Date(), "dd")}
          </Text>
          <Text textAlign="center">{format(new Date(), "MMMM")}</Text>
        </VStack>
      </View>
    </View>
  );
};
export default WeatherContainer;
