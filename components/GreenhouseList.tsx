import { View, Badge, ScrollView, Button, FlatList } from "native-base";
import { useGreenhouseStore } from "../zustand/store";
import GreenhouseNavContainer from "./GreehouseNavContainer";
import Banner from "./NoGreenhouseBanner";
import { useEffect, useState } from "react";
import Icons from "../assets/Icons/Icons";
import { TouchableOpacity } from "react-native";
import GreenHouseAddForm from "./Forms/GreenhouseForm";
import CustomModal from "./ui/Modal";
import { Dimensions } from "react-native";

const GreenhouseList = () => {
  const width = Dimensions.get("screen").width;
  const store = useGreenhouseStore();
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
        <Badge colorScheme="green">Available Added Greenhouse</Badge>
        <TouchableOpacity
          onPress={() => {
            setShowGreenhouseAddForm(true);
          }}
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
        >
          <Icons.greenhouseAddIcon width={32} height={32} fill="black" />
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
                type="Greenhouse"
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
            message="You have no greenhouses, Add one!"
            icon={
              <Icons.greenhouseAddIcon height={32} width={32} fill="#A0A0A0" />
            }
          />
        </View>
      )}
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
    </View>
  );
};
export default GreenhouseList;
