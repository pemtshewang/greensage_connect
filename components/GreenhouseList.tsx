import { View, Badge, ScrollView } from "native-base";
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
  const [greenhouses, setGreenhouseList] = useState(store.items);
  const [showGreenhouseAddForm, setShowGreenhouseAddForm] = useState<boolean>(false);
  useEffect(() => {
    setGreenhouseList(store.items);
  }, [store.items]);
  return (
    <View>
      <View flexDirection="row" alignItems="center" marginBottom="1" justifyContent="space-between" >
        <Badge colorScheme="green">Available Added Greenhouse</Badge>
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
          <ScrollView
            borderWidth="1"
            style={{
              marginBottom: 40
            }}
            padding="1"
            borderRadius="sm"
            borderColor="coolGray.400"
          >
            {
              greenhouses.map((item) => {
                return (
                  <GreenhouseNavContainer
                    key={item.id}
                    type="Greenhouse"
                    id={item.id}
                    name={item.name}
                    imageUrl={item.backgroundImage}
                    removeGreenhouse={(id) => {
                      store.removeItem(id);
                    }}
                  />
                )
              })
            }
          </ScrollView>
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
