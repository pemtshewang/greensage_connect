import { View, Badge, ScrollView } from "native-base";
import GreenhouseNavContainer from "./GreehouseNavContainer";
import Banner from "./NoGreenhouseBanner";
import { useEffect, useState } from "react";
import Icons from "../assets/Icons/Icons";
import { TouchableOpacity } from "react-native";
import GreenHouseAddForm from "./Forms/GreenhouseForm";
import CustomModal from "./ui/Modal";
import { useIrrigationControllerStore } from "../zustand/store";

const IrrigationNavList = () => {
  const store = useIrrigationControllerStore();
  const [greenhouses, setGreenhouseList] = useState(store.items);
  const [showGreenhouseAddForm, setShowGreenhouseAddForm] =
    useState<boolean>(false);
  useEffect(() => {
    setGreenhouseList(store.items);
  }, [store.items]);
  return (
    <View>
      <View
        flexDirection="row"
        alignItems="center"
        marginBottom="1"
        justifyContent="space-between"
      >
        <Badge colorScheme="success">Available Added Irrigation</Badge>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            backgroundColor: "#8CC6A8",
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: {
              width: 80,
              height: 80,
            },
            marginEnd: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
          onPress={() => {
            setShowGreenhouseAddForm(true);
          }}
        >
          <Icons.irrigationAddIcon width={30} height={30} fill="black" />
        </TouchableOpacity>
      </View>
      {greenhouses.length > 0 ? (
        <ScrollView
          borderWidth="1"
          style={{
            marginBottom: 40,
          }}
          padding="1"
          borderRadius="sm"
          borderColor="coolGray.400"
        >
          {greenhouses.map((item) => {
            return (
              <GreenhouseNavContainer
                key={item.id}
                type="Irrigation"
                id={item.id}
                name={item.name}
                imageUrl={item.backgroundImage}
                removeGreenhouse={(id) => {
                  store.removeItem(id);
                }}
              />
            );
          })}
        </ScrollView>
      ) : (
        <View justifyContent="center" alignItems="center">
          <Banner
            message="You have no irrigation, Add one!"
            icon={
              <Icons.irrigationAddIcon height={32} width={32} fill="#A0A0A0" />
            }
          />
        </View>
      )}
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
    </View>
  );
};
export default IrrigationNavList;
