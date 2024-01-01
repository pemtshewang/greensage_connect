import React, { useState, useRef, useEffect } from "react";
import { View, Animated, Easing, Pressable } from "react-native";
import { Icons } from "../../../assets/Icons/Icons";
import { Text, Heading, Button } from "native-base";
import { GreenHouseContainerStyles } from "../../../styles/styles";
import CustomModal from "../../../components/ui/Modal";
import GreenHouseAddForm from "../../../components/Forms/GreenhouseForm";
import { useGreenhouseStore } from "../../../zustand/store";
import GreenhouseNavContainer from "../../../components/GreehouseNavContainer";
import { ScrollView } from "react-native";
import MqttConnectionTestForm from "../../../components/Forms/MqttConnectionTest";

const IndexPage = () => {
  const store = useGreenhouseStore();
  const [showAddGreenhouseForm, setShowAddGreenhouseForm] = useState(false);
  const [showMqtt, setShowMqtt] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const startAnimation = () => {
    Animated.timing(scaleValue, {
      toValue: 1.2,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      // Reverse the animation
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  };

  const scale = scaleValue.interpolate({
    inputRange: [1, 1.2],
    outputRange: [1, 1.2],
  });

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Heading>Available greenhouses</Heading>
        <Animated.View
          style={[
            GreenHouseContainerStyles.addButton,
            { transform: [{ scale }] },
          ]}
        >
          <Pressable
            onPress={() => {
              setShowAddGreenhouseForm(true);
              startAnimation();
            }}
            style={{
              backgroundColor: "green",
              borderRadius: 99,
              borderCurve: "circular",
              padding: 7,
            }}
          >
            <Icons.greenhouseAddIcon width={32} height={32} color={"black"} />
          </Pressable>
        </Animated.View>
      </View>
      <Button onPress={
        () => {
          setShowMqtt(true);
        }
      }>
        show Mqtt form
      </Button>
      <CustomModal
        modalVisible={showAddGreenhouseForm}
        setModalVisible={setShowAddGreenhouseForm}
        modalTitle={"Add Greenhouse"}
      >
        <GreenHouseAddForm
          modalState={showAddGreenhouseForm}
          setModalState={setShowAddGreenhouseForm}
        />
      </CustomModal>
      {store.greenhouses.length > 0 ? (
        <ScrollView
          style={{
            marginTop: 10,
            padding: 10,
          }}
        >
          {store.greenhouses.map((greenhouse) => {
            return (
              <GreenhouseNavContainer
                key={greenhouse.id}
                name={greenhouse.name}
                id={greenhouse.id}
                imageUrl={greenhouse.backgroundImage}
                removeGreenhouse={store.removeGreenhouse}
              />
            );
          })}
        </ScrollView>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text>No Greenhouses Found</Text>
        </View>
      )}
      <MqttConnectionTestForm showForm={showMqtt} setShowForm={setShowMqtt} id={"2"} />
    </View>
  );
};

export default IndexPage;
