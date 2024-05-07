import { View } from "native-base";
import { useState } from "react";
import GreenhouseList from "../../../components/GreenhouseList";
import IrrigationNavList from "../../../components/IrrigationNavList";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeListContext from "../../../context/HomeListContext";
import CustomSwitcher from "../../../components/CustomSwitcher";

const IndexPage = () => {
  const [currentList, setCurrentList] = useState<"greenhouse" | "irrigation">(
    "greenhouse",
  );
  return (
    <HomeListContext.Provider
      value={{
        type: currentList,
        setType: setCurrentList,
      }}
    >
      <View padding="2" bg="white" style={{ flex: 1 }}>
        <CustomSwitcher />
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          {currentList === "greenhouse" ? (
            <GreenhouseList />
          ) : (
            <IrrigationNavList />
          )}
        </SafeAreaView>
      </View>
    </HomeListContext.Provider>
  );
};
export default IndexPage;
