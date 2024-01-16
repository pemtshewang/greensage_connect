import { AnimatedCircularProgress } from "react-native-circular-progress";
import { View, Text, Badge } from "native-base";

import { Circle } from "react-native-svg";
import Icons from "../../assets/Icons/Icons";

export default function ReadingsContainer({
  temperatureReading,
  humidityReading,
  soilMoistureReading,
  ldrReading,
}: {
  temperatureReading: number;
  humidityReading: number;
  soilMoistureReading: number;
  ldrReading: number;
}) {
  return (
    <View
      style={{
        margin: 17,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8, // Required for Android
        backgroundColor: "#fff", // Add a background color if not already specified
        padding: 5, // Adjust padding as needed
        borderRadius: 10, // Add border radius for rounded corners if desired
      }}
    >
      {/* first row */}
      <View style={{
        flexDirection: "row",
        justifyContent: "space-around"
      }}>
        {/* Temperature */}
        <View style={{ position: "relative" }}>
          <Badge colorScheme="red">Temperature</Badge>
          <AnimatedCircularProgress
            size={120}
            width={15}
            arcSweepAngle={180}
            rotation={270}
            fill={temperatureReading}
            tintColor={temperatureReading > 50 ? "#FF6347" : "#00e0ff"} // Red for higher temperatures, blue for lower
            backgroundColor="#A0A0A0"
            padding={10}
            renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="green" />}
          />
          <Badge colorScheme="red" style={{ position: "absolute", top: "70%", left: "34%" }}>
            {temperatureReading + " °C"}
          </Badge>
          <Icons.thermometer
            style={{ position: "absolute", top: "39%", left: "39%" }}
            size={32}
            color="black"
          />
        </View>

        {/* Humidity */}
        <View style={{ position: "relative" }}>
          <Badge colorScheme="cyan">Humidity</Badge>
          <AnimatedCircularProgress
            size={120}
            width={15}
            fill={humidityReading}
            tintColor={humidityReading > 50 ? "#FF6347" : "#00e0ff"} // Red for higher humidity, blue for lower
            backgroundColor="#A0A0A0"
            arcSweepAngle={180}
            rotation={270}
            padding={10}
            renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="green" />}
          />
          <Badge colorScheme="cyan" style={{ position: "absolute", top: "70%", left: "34%" }}>
            {humidityReading + " %"}
          </Badge>
          <Icons.droplets
            style={{ position: "absolute", top: "39%", left: "39%" }}
            size={32}
            color="black"
          />
        </View>
      </View>
      {/* end of first row */}

      {/* start of second row */}
      <View style={{
        flexDirection: "row", justifyContent: "space-around"
      }}>
        {/* Soil Moisture */}
        <View style={{ position: "relative" }}>
          <Badge colorScheme="lightBlue">Soil Moisture</Badge>
          <AnimatedCircularProgress
            size={120}
            width={15}
            arcSweepAngle={180}
            rotation={270}
            fill={soilMoistureReading}
            tintColor={soilMoistureReading > 50 ? "#FF6347" : "#00e0ff"} // Red for higher temperatures, blue for lower
            backgroundColor="#A0A0A0"
            padding={10}
            renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="green" />}
          />
          <Badge colorScheme="lightBlue" style={{ position: "absolute", top: "70%", left: "34%" }}>
            {soilMoistureReading + " %"}
          </Badge>
          <Icons.soilMoisture
            style={{ position: "absolute", top: "39%", left: "39%" }}
            size={32}
            color="black"
          />
        </View>

        {/* LDR */}
        <View style={{ position: "relative" }}>
          <Badge colorScheme="indigo">Light Intensity</Badge>
          <AnimatedCircularProgress
            size={120}
            width={15}
            fill={ldrReading}
            tintColor={ldrReading > 50 ? "#FF6347" : "#00e0ff"} // Red for higher humidity, blue for lower
            backgroundColor="#A0A0A0"
            arcSweepAngle={180}
            rotation={270}
            padding={10}
            renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="green" />}
          />
          <Badge colorScheme="indigo" style={{ position: "absolute", top: "70%", left: "34%" }}>
            {ldrReading + " %"}
          </Badge>
          <Icons.sunIcon
            style={{ position: "absolute", top: "39%", left: "39%" }}
            size={32}
            color="black"
          />
        </View>
      </View>
      {/* end of second row */}
    </View>
  );
}
