import React, { useState, useEffect } from "react";
import { Text, View } from "native-base";
import * as Location from "expo-location";
import getWeather from "../api/weather/api";
import { Icons } from "../assets/Icons/Icons";
import { exportReadings as wData } from "../api/weather/api";
import { format } from "date-fns";
import { useNetInfo } from "@react-native-community/netinfo";

const WeatherContainer = () => {
  const { isInternetReachable } = useNetInfo();
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [weatherIcon, setWeatherIcon] = useState(
    <Icons.sunnyWeather width={55} height={55} color="black" />
  );
  const [weatherData, setWeatherData] = useState();

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
        getWeather().then((data) => {
          setWeatherData(data);
          setWeatherIcon(getWeatherIcon()); // Set the weather icon based on weather data
        });
      } else {
        setErrorMsg("No internet connection");
      }
    })();
  }, [isInternetReachable]);

  const getWeatherIcon = () => {
    if (wData) {
      const { is_day, precipitation, rain, showers, cloud_cover } = wData;

      if (is_day === 1) {
        // Daytime conditions
        if (precipitation > 0 || rain > 0 || showers > 0) {
          return <Icons.rain width={55} height={55} />;
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
    // Default icon if no conditions match
    return <Icons.sunnyWeather width={55} height={55} />;
  };

  let text = "Getting Location...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View
      padding="2"
      style={{
        flexDirection: 'row',
      }}
    >
      {weatherIcon}
      <View style={{
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: 4
      }}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 15,
          width: 150,
        }}>{format(new Date(), "EEEE")}, {format(new Date(), "dd")} {format(new Date(), "MMMM")}</Text>
      </View>
    </View>
  );
};

export default WeatherContainer;
