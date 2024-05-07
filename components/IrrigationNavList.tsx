import { View, Badge, FlatList } from "native-base";
import GreenhouseNavContainer from "./GreehouseNavContainer";
import Banner from "./NoGreenhouseBanner";
import { useEffect, useState } from "react";
import Icons from "../assets/Icons/Icons";
import { TouchableOpacity } from "react-native";
import GreenHouseAddForm from "./Forms/GreenhouseForm";
import CustomModal from "./ui/Modal";
import { useIrrigationControllerStore } from "../zustand/store";
import { LinearGradient } from "expo-linear-gradient";

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
        <Badge colorScheme="success" fontFamily="OpenSans">
          Available Added Irrigation
        </Badge>
        <TouchableOpacity
          onPress={() => {
            setShowGreenhouseAddForm(true);
          }}
        >
          <LinearGradient
            colors={["#228929", "#6A4"]}
            style={{
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Icons.add width={30} height={30} color="black" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {greenhouses.length > 0 ? (
        <FlatList
          height={420}
          data={greenhouses}
          renderItem={({ item }) => {
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
          }}
        />
      ) : (
        <View justifyContent="center" alignItems="center">
          <Banner
            message="You haven't added irrigation valves, Add one!"
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
