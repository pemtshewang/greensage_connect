import { AnimatedCircularProgress } from "react-native-circular-progress";
import { View, Text } from "native-base";
import { Circle } from "react-native-svg";
import Icons from "../../assets/Icons/Icons";
import { useEffect } from "react";

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
        margin: 7,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8, // Required for Android
        backgroundColor: "#fff", // Add a background color if not already specified
        padding: 10, // Adjust padding as needed
        borderRadius: 10, // Add border radius for rounded corners if desired
      }}
    >
      {/* first row */}
      <View style={{
        paddingTop: 5,
        flexDirection: "row", justifyContent: "space-around"
      }}>
        {/* Temperature */}
        <View style={{ position: "relative" }}>
          <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}>
            Temperature
          </Text>
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
          <Text style={{ position: "absolute", top: "60%", left: "40%", textAlign: "center", fontWeight: "bold" }}>
            {temperatureReading}°C
          </Text>
          <Icons.thermometer
            style={{ position: "absolute", top: "39%", left: "39%" }}
            size={32}
            color="black"
          />
        </View>

        {/* Humidity */}
        <View style={{ position: "relative" }}>
          <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}>
            Humidity
          </Text>
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
          <Text style={{ position: "absolute", top: "60%", left: "40%", textAlign: "center", fontWeight: "bold" }}>
            {humidityReading}%
          </Text>
          <Icons.droplets
            style={{ position: "absolute", top: "39%", left: "39%" }}
            size={32}
            color="black"
          />
        </View>
      </View>

      {/* start of second row */}
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        {/* LDR */}
        <View style={{ position: "relative" }}>
          <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}>
            LDR intensity
          </Text>
          <AnimatedCircularProgress
            size={120}
            width={15}
            fill={ldrReading}
            tintColor={ldrReading > 50 ? "#FF6347" : "#00e0ff"} // Red for higher readings, blue for lower
            backgroundColor="#A0A0A0"
            arcSweepAngle={180}
            rotation={270}
            padding={10}
            renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="green" />}
          />
          <Text style={{ position: "absolute", top: "60%", left: "40%", textAlign: "center", fontWeight: "bold" }}>
            {ldrReading}%
          </Text>
          <Icons.sunIcon
            style={{ position: "absolute", top: "39%", left: "39%" }}
            size={32}
            color="black"
          />
        </View>

        {/* Soil moisture */}
        <View style={{ position: "relative" }}>
          <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}>
            Soil Moisture Reading
          </Text>
          <AnimatedCircularProgress
            size={120}
            width={15}
            fill={soilMoistureReading}
            arcSweepAngle={180}
            rotation={270}
            tintColor={soilMoistureReading > 50 ? "#FF6347" : "#00e0ff"} // Red for higher readings, blue for lower
            backgroundColor="#A0A0A0"
            padding={10}
            renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="green" />}
          />
          <Text style={{ position: "absolute", top: "60%", left: "40%", textAlign: "center", fontWeight: "bold" }}>
            {soilMoistureReading}%
          </Text>
          <Icons.soilMoisture
            style={{ position: "absolute", top: "39%", left: "37%" }}
            size={32}
            color="black"
          />
        </View>
      </View>
      {/* end of second row */}
    </View>
  );
}
