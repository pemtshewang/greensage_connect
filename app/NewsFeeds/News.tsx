import React from "react";
import { ScrollView, View } from "native-base";
import SingleNews from "../../components/SingleNews";

const News = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View paddingX = "0" paddingTop="90" >
        <SingleNews></SingleNews>
        <View marginTop="4" />
        <SingleNews></SingleNews>
        <View marginTop="4" />
        <SingleNews></SingleNews>
      </View>
    </ScrollView>
  );
};

export default News;
