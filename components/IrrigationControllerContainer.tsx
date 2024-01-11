import { View } from "native-base"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import { Circle } from "react-native-svg"
const IrrigationControllerContainer = (
  {
    soilMoistureReading
  }: {
    soilMoistureReading: number
  }
) => {
  return (
    <View>
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
    </View>
  )
}
export default IrrigationControllerContainer;
