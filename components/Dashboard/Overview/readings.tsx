import { CartesianChart, Line } from "victory-native";
import { SharedValue } from "react-native-reanimated";
import { Circle } from "@shopify/react-native-skia";
import { IReadings } from "../../../types";
import { useChartPressState } from "victory-native";
import { useFont, Text as CText } from "@shopify/react-native-skia";
import inter from "../../../assets/fonts/Inter-Regular.ttf";
import { HStack, Text, Box, View } from "native-base";
import format from "date-fns/format";

export default function EnvironmentParametersChart({
  readings,
}: {
  readings: IReadings[] | Record<string, unknown>[];
}) {
  const INIT_STATE = {
    x: "",
    y: { humidity: 0, temperature: 0, soilMoisture: 0 },
  } as const;
  const { state, isActive } = useChartPressState(INIT_STATE);
  const font = useFont(inter, 12);

  function TemperatureToolTip({
    x,
    y,
  }: {
    x: { value: SharedValue<number>; position: SharedValue<number> };
    y: { value: SharedValue<number>; position: SharedValue<number> };
  }) {
    return (
      <>
        <CText
          transform={[
            {
              translateX: -5,
              translateY: -1,
            },
          ]}
          x={x.position.value}
          y={y.position.value}
          text={
            y.value.value.toString() +
            "°C" +
            `|${format(new Date(x.value.value.toString()), "dd/MM/yyyy hh:mm aa")}`
          }
          font={font}
        />
        <Circle
          cx={x.position.value}
          cy={y.position.value}
          r={8}
          color="black"
        />
      </>
    );
  }

  function HumidityToolTip({
    x,
    y,
  }: {
    x: { value: SharedValue<number>; position: SharedValue<number> };
    y: { value: SharedValue<number>; position: SharedValue<number> };
  }) {
    return (
      <>
        <CText
          transform={[
            {
              translateY: -20,
            },
          ]}
          x={x.position.value}
          y={y.position.value}
          text={
            y.value.value.toString() +
            "%" +
            `|${format(new Date(x.value.value.toString()), "dd/MM/yyyy hh:mm aa")}`
          }
          font={font}
        />
        <Circle
          cx={x.position.value}
          cy={y.position.value}
          r={8}
          color="black"
        />
      </>
    );
  }

  function SoilMoistureToolTip({
    x,
    y,
  }: {
    x: { value: SharedValue<number>; position: SharedValue<number> };
    y: { value: SharedValue<number>; position: SharedValue<number> };
  }) {
    return (
      <>
        <CText
          transform={[
            {
              translateY: -20,
            },
          ]}
          x={x.position.value}
          y={y.position.value}
          text={
            y.value.value.toString() +
            "%" +
            `|${format(new Date(x.value.value.toString()), "dd/MM/yyyy hh:mm aa")}`
          }
          font={font}
        />
        <Circle
          cx={x.position.value}
          cy={y.position.value}
          r={8}
          color="black"
        />
      </>
    );
  }
  return (
    <View style={{ height: readings.length > 0 ? 300 : 150, marginTop: 20 }}>
      <Text bold textAlign="center">
        Environment Parameter Readings Chart
      </Text>
      {readings.length > 0 ? (
        <>
          <CartesianChart
            padding={5}
            domain={{
              y: [0, 300],
            }}
            data={readings as Record<string, unknown>[]}
            xKey={"recordedAt"}
            yKeys={["humidity", "temperature", "soilMoisture"]}
            axisOptions={{
              font: font,
              isNumericalData: false,
              formatXLabel: (label) => "",
            }}
            chartPressState={state}
          >
            {({ points }) => (
              <>
                <Line
                  points={points.humidity}
                  connectMissingData={true}
                  curveType="cardinal50"
                  color="blue"
                  strokeWidth={3}
                  strokeCap="butt"
                  blendMode="color"
                  animate={{ type: "timing", duration: 300 }}
                />
                <Line
                  curveType="cardinal50"
                  connectMissingData={true}
                  points={points.temperature}
                  color="red"
                  strokeWidth={3}
                  strokeCap="butt"
                  blendMode="color"
                  animate={{ type: "timing", duration: 300 }}
                />
                <Line
                  curveType="cardinal50"
                  connectMissingData={true}
                  points={points.soilMoisture}
                  color="brown"
                  strokeWidth={3}
                  strokeCap="butt"
                  blendMode="color"
                  animate={{ type: "timing", duration: 300 }}
                />
                {isActive ? (
                  <TemperatureToolTip x={state.x} y={state.y.temperature} />
                ) : null}
                {isActive ? (
                  <HumidityToolTip x={state.x} y={state.y.humidity} />
                ) : null}
                {isActive ? (
                  <SoilMoistureToolTip x={state.x} y={state.y.soilMoisture} />
                ) : null}
              </>
            )}
          </CartesianChart>
          <Text textAlign="center">Legend</Text>
          <HStack justifyContent="center" padding="1" space={3}>
            <HStack alignItems="center" space={1}>
              <Box width={2} height={2} bg="blue.600"></Box>
              <Text>Humidity</Text>
            </HStack>
            <HStack alignItems="center" space={1}>
              <Box width={2} height={2} bg="red.800"></Box>
              <Text>Soil Moisture</Text>
            </HStack>
            <HStack alignItems="center" space={1}>
              <Box width={2} height={2} bg="red.500"></Box>
              <Text>Temperature</Text>
            </HStack>
          </HStack>
        </>
      ) : (
        <View
          flexDirection="row"
          justifyContent="center"
          flex="1"
          alignItems="center"
        >
          <Text color="coolGray.500" italic>
            Environmental parameters not recorded
          </Text>
        </View>
      )}
    </View>
  );
}
