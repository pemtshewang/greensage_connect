import { View, Heading } from "native-base";
import { ScrollView } from "native-base";
import { Slot } from "expo-router";
import NewsFeedContext from "../../../context/NewsFeedContext";
import { useContext } from "react";
import { useState } from "react";
import { PostType } from "../../../types";

export default function NewsFeedLayout() {
  const [newsFeed, setNewsFeed] = useState<PostType[]>([]);
  return (
    <NewsFeedContext.Provider value={{ newsFeed, setNewsFeed }}>
      <View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
          padding="2"
          marginTop="3"
        >
          <Slot />
        </ScrollView>
      </View >
    </NewsFeedContext.Provider>
  )
}
