import { View } from "native-base"
import { Text } from "native-base"
import TemperatureDashboard from "../../components/TemperatureDashboard";
const DashboardPage = () => {
  return (
    <View>
      <Text>
        Dashboard
      </Text>
      <TemperatureDashboard/>
    </View>
  )
}
export default DashboardPage;
