import { Badge, Text, View } from "native-base"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import { Circle } from "react-native-svg"
import Icons from "../assets/Icons/Icons"
const IrrigationControllerContainer = (
  {
    soilMoistureReading
  }: {
    soilMoistureReading: number
  }
) => {
  return (
    <>
      <View alignItems="center" style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 10
      }}>
        <Badge colorScheme="blue">Soil Moisture</Badge>
        <AnimatedCircularProgress
          size={120}
          width={15}
          fill={soilMoistureReading}
          tintColor={soilMoistureReading > 50 ? "#FF6347" : "#00e0ff"} // Red for higher humidity, blue for lower
          backgroundColor="#A0A0A0"
          arcSweepAngle={180}
          rotation={270}
          padding={10}
          renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="green" />}
        />
        <View position="absolute" top="1/2" alignItems="center" style={{
          gap: 5
        }}>
          <Icons.soilMoisture size={24} color="black" />
          <Badge colorScheme="blue">{soilMoistureReading + " %"}</Badge>
        </View>
      </View>
    </>
  )
}
export default IrrigationControllerContainer;
