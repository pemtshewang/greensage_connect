import { useLocalSearchParams } from "expo-router";
import { View } from "native-base";
import { Icons } from "../../../../assets/Icons/Icons";
import ReadingsContainer from "../../../../components/Greenhouse/Reading";
import ShadowContainer from "../../../../components/PressableShadowContainer";
import { useGreenhouseStore } from "../../../../zustand/store";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const store = useGreenhouseStore()
  const greenhouse = store.greenhouses.find((res) => res.id === id);
  return (
    <>
      <ReadingsContainer
        temperatureReading={greenhouse?.temperature as number}
        humidityReading={greenhouse?.humidity as number}
        soilMoistureReading={greenhouse?.soil_moisture as number}
        ldrReading={greenhouse?.ldrReading as number}
      />
      <View style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20
      }}>
        <ShadowContainer
          label={"Temperature"}
          id={id as string}
          icon={<Icons.exhaustFan width={32} height={32} color="black" />}
          navigatePath={`/tabs/Home/Greenhouse/mgTemperature/${id}`}
        />
        <ShadowContainer
          label={"Waterflow"}
          id={id as string}
          icon={<Icons.valve width={32} height={32} color="black" />}
          navigatePath={`/tabs/Home/Greenhouse/mgWaterLevel/${id}`}
        />
      </View>
    </>
  );
};

export default Page;
