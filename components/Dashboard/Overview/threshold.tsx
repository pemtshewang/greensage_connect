import { View } from "react-native";
import { CartesianChart, Line } from "victory-native";
import { SharedValue } from "react-native-reanimated";
import { Circle } from "@shopify/react-native-skia";
import { useChartPressState } from "victory-native";
import { useFont, Text as CText, Box } from "@shopify/react-native-skia";
import inter from "../../../assets/fonts/Inter-Regular.ttf";
import { IHumidityThresholdRecord, ITemperatureThresholdRecord, ISoilMoistureThresholdRecords } from "../../../types";
import { Text, VStack } from "native-base";
import { format } from "date-fns";

type CombinedInterface = IHumidityThresholdRecord[] | ITemperatureThresholdRecord[] | ISoilMoistureThresholdRecords[]

export default function ThresholdChart({
  data,
  type,
  title
}: {
  data: Record<string, unknown>[] | CombinedInterface
  type: "humidity" | "temperature" | "soilMoisture",
  title: string
}) {
  const INIT_STATE = { x: Number(new Date().getTime()), y: { value: 0 } } as const;
  const { state, isActive } = useChartPressState(INIT_STATE);
  const fontSize = 12;
  const font = useFont(inter, fontSize);

  function ToolTip({ x, y }: {
    x: { value: SharedValue<number>; position: SharedValue<number>; },
    y: { value: SharedValue<number>; }
  }) {
    return (
      <>
        <CText
          transform={[
            {
              translateY: -20
            }
          ]}
          x={x.position.value}
          y={y.value.position}
          text={y.value.value?.value.toString() + `${type === "temperature" ? "°C" : "%"}|${format(new Date(x.value.value.toString()), "dd/MM/yyyy hh:mm aa")}`}
          font={font}
        />
        <Circle cx={x.position.value} cy={y.value.position} r={8} color="black" />
      </>
    );
  }

  return (
    <View style={{
      height: data.length > 1 ? 300 : 150, marginTop: 20
    }}>
      <Text textAlign="center" bold>{title}</Text>
      {
        data.length > 1 ? (
          <CartesianChart
            domainPadding={{
              right: 15,
              top: 15,
            }}
            padding={5}
            data={data}
            xKey={"recordedAt"}
            yKeys={["value"]}
            domain={{
              y: [0, 100]
            }}
            axisOptions={{
              font: font,
              isNumericalData: false,
              formatYLabel: (label) => `${label}${type === "temperature" ? "°C" : "%"}`,
              formatXLabel: (label) => ""
            }}
            chartPressState={state}
          >
            {({ points }) => (
              <>
                <Line points={points.value} connectMissingData={true} curveType="cardinal50" color="blue" strokeWidth={3} strokeCap="butt" blendMode="color" animate={{ type: "timing", duration: 300 }} />
                {isActive ? (
                  <ToolTip x={state.x} y={state.y} />
                ) : null}
              </>
            )}
          </CartesianChart>
        ) : (
          <View style={{
            marginTop: 20,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Text color="#A0A0A0">
              No data has been recorded for {type}
            </Text>
            <VStack space={2} justifyContent="center" alignItems="center" padding={2}>
              <Text color="#A0A0A0">
                The chart will be generated when the data has been recorded
              </Text>
              <Text color="#A0A0A0">
                Or
              </Text>
              <Text color="#A0A0A0">
                It has enough data to be visualized
              </Text>
            </VStack>
          </View>
        )
      }
    </View >
  )
}
