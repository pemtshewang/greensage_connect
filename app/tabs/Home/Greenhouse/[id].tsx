import { useLocalSearchParams } from "expo-router";
import { View, Text } from "native-base";
import { useGreenhouseStore } from "../../../../zustand/store";
import { GreenhouseAddFormSchemaType } from "../../../../types";
import { Stack } from "expo-router";
import { Heading } from "native-base";
import { Icons } from "../../../../assets/Icons/Icons";
import { useNavigation } from "expo-router";
import { Pressable } from "react-native";

const Page = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const store = useGreenhouseStore();
  const greenhouse: GreenhouseAddFormSchemaType = store.greenhouses.find(
    (g) => g.id === id
  );
  return (
    <>
      <Stack.Screen
        options={{
          header: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  padding: 10,
                  gap: 10,
                  backgroundColor: "green"
                }}
              >
                <Pressable
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Icons.navigateBack color="black" size={32}/>
                </Pressable>
                <Heading color="#fff">{greenhouse.name}</Heading>
              </View>
            );
          },
        }}
      />
      <View>
        <Text>This is {id}</Text>
      </View>
    </>
  );
};

export default Page;
