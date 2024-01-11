import { View, Text, FlatList } from "native-base";
import { useGreenhouseStore } from "../zustand/store";
import GreenhouseNavContainer from "./GreehouseNavContainer";
import Banner from "./NoGreenhouseBanner";
import { useEffect, useState } from "react";
import Icons from "../assets/Icons/Icons";
import { TouchableOpacity } from "react-native";
import GreenHouseAddForm from "./Forms/GreenhouseForm";
import CustomModal from "./ui/Modal";

const GreenhouseList = () => {
  const store = useGreenhouseStore();
  const [greenhouses, setGreenhouseList] = useState(store.greenhouses);
  const [showGreenhouseAddForm, setShowGreenhouseAddForm] = useState<boolean>(false);
  useEffect(() => {
    setGreenhouseList(store.greenhouses);
  }, [store.greenhouses]);
  return (
    <View >
      <View flexDirection="row" alignItems="center" justifyContent="space-between" paddingY="5">
        <Text fontSize={19} >Available Greenhouses</Text>
        <View bg="green.700" padding="2" borderRadius="full">
          <TouchableOpacity
            onPress={() => {
              setShowGreenhouseAddForm(true);
            }}
          >
            <Icons.greenhouseAddIcon width={32} height={32} fill="black" />
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
                type="greenhouse"
                id={item.id}
                routeUrl={`/tabs/Home/Greenhouse/${item.id}`}
                name={item.name}
                imageUrl={item.backgroundImage}
                removeGreenhouse={(id) => {
                  store.removeGreenhouse(id);
                }}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View justifyContent="center" alignItems="center">
            <Banner
              message="You have no greenhouses, Add one!"
              icon={<Icons.greenhouseAddIcon height={32} width={32} fill="#A0A0A0" />}
            />
          </View>
        )
      }
      <CustomModal
        modalVisible={showGreenhouseAddForm}
        setModalVisible={setShowGreenhouseAddForm}
        modalTitle="Add New Greenhouse"
      >
        <GreenHouseAddForm
          type="greenhouse"
          setModalState={setShowGreenhouseAddForm}
        />
      </CustomModal>
    </View >
  )
}
export default GreenhouseList;
