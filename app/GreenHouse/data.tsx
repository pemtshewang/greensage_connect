import React from "react";
import { ScrollView, View } from "native-base";
import Display from "../../components/Display";

const GreenHouse = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View paddingX = "0" paddingTop="90" >
        <Display/>
      </View>
    </ScrollView>
  );
};

export default GreenHouse;
