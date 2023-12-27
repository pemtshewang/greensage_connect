import { useLocalSearchParams } from "expo-router";
import { View, ScrollView, Text } from "native-base";
import { useGreenhouseStore } from "../../../../zustand/store";
import { GreenhouseAddFormSchemaType } from "../../../../types";
import { Stack } from "expo-router";
import { Icons } from "../../../../assets/Icons/Icons";
import { useNavigation } from "expo-router";
import { Pressable } from "react-native";
import ReadingsContainer from "../../../../components/Greenhouse/Reading";
import ShadowContainer from "../../../../components/PressableShadowContainer";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const store = useGreenhouseStore();
  const greenhouse: GreenhouseAddFormSchemaType = store.greenhouses.find(
    (g) => g.id === id
  );
  const greenhousename = greenhouse?.name;
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
                  <Icons.navigateBack color="black" size={32} />
                </Pressable>

                <View
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Text
                    color="#fff"
                    w="container"
                    fontSize="xl"
                  >{greenhousename}</Text>
                </View>
              </View >
            );
          },
        }}
      />
      < ScrollView
        scrollEnabled={true}
        style={{
          paddingTop: 10
        }}>
        <ReadingsContainer
          temperatureReading={45}
          humidityReading={34}
          soilMoistureReading={22}
          ldrReading={55}
        />
        <View style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20
        }}>
          <ShadowContainer
            label={"Manage Temperature"}
            id={id as string}
            icon={<Icons.exhaustFan width={32} height={32} color="black" />}
            navigatePath={`/tabs/Home/Greenhouse/mgTemperature/${id}`}
          />
          <ShadowContainer
            label={"Manage Waterflow"}
            id={id as string}
            icon={<Icons.valve width={32} height={32} color="black" />}
            navigatePath={`/tabs/Home/Greenhouse/mgWaterLevel/${id}`}
          />
        </View>
      </ScrollView >
    </>
  );
};

export default Page;
