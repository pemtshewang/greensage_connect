import { View, Text, FlatList } from "native-base";
import { useIrrigationControllerStore } from "../zustand/store";
import GreenhouseNavContainer from "./GreehouseNavContainer";
import Banner from "./NoGreenhouseBanner";
import { useEffect, useState } from "react";
import Icons from "../assets/Icons/Icons";
import { TouchableOpacity } from "react-native";
import GreenHouseAddForm from "./Forms/GreenhouseForm";
import CustomModal from "./ui/Modal";

const IrrigationNavList = () => {
  const store = useIrrigationControllerStore();
  const [greenhouses, setGreenhouseList] = useState(store.irrigationControllers);
  const [showGreenhouseAddForm, setShowGreenhouseAddForm] = useState<boolean>(false);
  useEffect(() => {
    setGreenhouseList(store.irrigationControllers);
  }, [store.irrigationControllers]);
  return (
    <View >
      <View flexDirection="row" alignItems="center" justifyContent="space-between" paddingY="5">
        <Text fontSize={19} >Available Irrigation Outlet</Text>
        <View bg="green.700" padding="2" borderRadius="full">
          <TouchableOpacity
            onPress={() => {
              setShowGreenhouseAddForm(true);
            }}
          >
            <Icons.irrigationAddIcon width={30} height={30} fill="black" />
          </TouchableOpacity>
        </View>
      </View>
      {
        greenhouses.length > 0 ? (
          <FlatList
            style={{
              maxHeight: 350,
              marginBottom: 30,
            }}
            scrollEnabled={true}
            data={greenhouses}
            renderItem={({ item }) => (
              <GreenhouseNavContainer
                type="irrigation"
                id={item.id}
                name={item.name}
                routeUrl={`/tabs/Home/Irrigation/${item.id}`}
                imageUrl={item.backgroundImage}
                removeGreenhouse={(id) => {
                  store.removeIrrigationController(id);
                }}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View justifyContent="center" alignItems="center">
            <Banner
              message="No irrigation components, Add one!"
              icon={<Icons.irrigationAddIcon width={32} height={32} fill="#A0A0A0" />}
            />
          </View>
        )
      }
      <CustomModal
        modalVisible={showGreenhouseAddForm}
        setModalVisible={setShowGreenhouseAddForm}
        modalTitle="Add New Irrigation Channel"
      >
        <GreenHouseAddForm
          type="irrigation"
          setModalState={setShowGreenhouseAddForm}
        />
      </CustomModal>
    </View >
  )
}
export default IrrigationNavList;
