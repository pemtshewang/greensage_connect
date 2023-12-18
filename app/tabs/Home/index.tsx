import React, { useState, useRef } from "react";
import { View, Animated, Easing, Pressable } from "react-native";
import { Icons } from "../../../assets/Icons/Icons";
import { Heading } from "native-base";
import { GreenHouseContainerStyles } from "../../../styles/styles";
import CustomModal from "../../../components/Modal";
import GreenHouseAddForm from "../../../components/Forms/GreenhouseForm";

const IndexPage = () => {
  const [showAddGreenhouseForm, setShowAddGreenhouseForm] = useState(false);
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
        <Heading>Available Greenhouses</Heading>
        <Animated.View
          style={[
            GreenHouseContainerStyles.addButton,
            { transform: [{ scale }] },
          ]}
        >
          <Pressable 
          onPress={()=>{
            setShowAddGreenhouseForm(true);
            startAnimation();
          }}
          >
            <Icons.plusCircle color="green" size={32} />
          </Pressable>
        </Animated.View>
      </View>
      <CustomModal modalVisible={showAddGreenhouseForm} setModalVisible={setShowAddGreenhouseForm}
      modalTitle={"Add Greenhouse"}
      >
        <GreenHouseAddForm />
      </CustomModal>
    </View>
  );
};

export default IndexPage;
