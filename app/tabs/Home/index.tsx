import { View } from "native-base";
import { useState } from "react";
import GreenhouseList from "../../../components/GreenhouseList";
import { TouchableOpacity } from "react-native";
import Icons from "../../../assets/Icons/Icons";
import { Text } from "native-base";
import IrrigationNavList from "../../../components/IrrigationNavList";
import { SafeAreaView } from "react-native-safe-area-context";

const IndexPage = () => {
  const [currentList, setCurrentList] = useState<"greenhouse" | "irrigation">("greenhouse");
  const toggleList = () => {
    setCurrentList(state => state === "greenhouse" ? "irrigation" : "greenhouse");
  }
  return (
    <View padding="2" bg="white" style={{ flex: 1 }} >
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <View flexDirection="row" style={{
          gap: 4
        }}>
          <Icons.help width={20} height={20} color="black" />
          <Text color="#A0A0A0">Click to switch to {currentList === "greenhouse" ? "irrigation" : "greenhouse"} navigator</Text>
        </View>
        <TouchableOpacity
          onPress={toggleList}
          style={{
            width: 50,
            height: 50,
            backgroundColor: "green",
            borderWidth: 2,
            padding: 5,
            borderRadius: 50,
            alignItems: "center",
            marginRight: 10
          }}
        >
          {
            currentList === "greenhouse" ?
              <Icons.waterIrrigation width={32} height={32} color="black" />
              :
              <Icons.greenhouse width={32} height={32} color="black" />
          }
        </TouchableOpacity>
      </View>
      <SafeAreaView style={{
        flex: 1,
      }}>
        {
          currentList === "greenhouse" ?
            <GreenhouseList />
            :
            <IrrigationNavList />
        }
      </SafeAreaView>
    </View >
  );
};
export default IndexPage;
