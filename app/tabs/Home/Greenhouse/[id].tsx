import { useLocalSearchParams } from "expo-router";
import { View } from "native-base";
import { Icons } from "../../../../assets/Icons/Icons";
import ReadingsContainer from "../../../../components/Greenhouse/Reading";
import ShadowContainer from "../../../../components/PressableShadowContainer";
import { useGreenhouseStore } from "../../../../zustand/store";
import { useEnvironmentContext } from "../../../../context/envParamsContext";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const store = useGreenhouseStore()
  const { environment: envtValues } = useEnvironmentContext();
  return (
    <>
      <ReadingsContainer
        ldrReading={envtValues.light}
        humidityReading={envtValues.humidity}
        temperatureReading={envtValues.temperature}
        soilMoistureReading={envtValues.soilMoisture}
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
