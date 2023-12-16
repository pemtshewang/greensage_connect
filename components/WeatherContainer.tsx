import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import * as Location from "expo-location";
import getWeather from "../api/weather/api";
import { Icons } from "../assets/Icons/Icons";
import { exportReadings as wData } from "../api/weather/api";
import { format } from "date-fns";

const WeatherContainer = () => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [weatherIcon, setWeatherIcon] = useState(
    <Icons.cloudIcon width={55} height={55} color="black" />
  );
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    getWeather().then((data) => {
      setWeatherData(data);
      setWeatherIcon(getWeatherIcon()); // Set the weather icon based on weather data
    });
  }, []);

  const getWeatherIcon = () => {
    if (wData) {
      const { is_day, precipitation, rain, showers, cloud_cover } = wData;

      if (is_day === 1) {
        // Daytime conditions
        if (precipitation > 0 || rain > 0 || showers > 0) {
          return <Icons.cloudRainIcon width={55} height={55} color="black" />;
        } else if (cloud_cover >= 80) {
          return <Icons.cloudIcon width={55} height={55} color="black" />;
        } else {
          return <Icons.sunIcon width={55} height={55} color="black" />;
        }
      } else {
        // Nighttime conditions
        if (precipitation > 0 || rain > 0 || showers > 0) {
          return <Icons.cloudRainIcon width={55} height={55} color="black" />;
        } else if (cloud_cover >= 80) {
          return <Icons.cloudRainIcon width={55} height={55} color="black" />;
        } else {
          return <Icons.moonIcon width={55} height={55} color="black" />;
        }
      }
    }
    // Default icon if no conditions match
    return <Icons.cloudIcon width={55} height={55} color="black" />;
  };

  let text = "Getting Location...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={{
      flexDirection: 'row',
    }}
    >
      {weatherIcon}
      <View>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 15,
          width: 150,
        }}>{format(new Date(),"EEEE")}, {format(new Date(), "dd")} {format(new Date(), "MMMM")}</Text>
      </View>
    </View>
  );
};

export default WeatherContainer;
