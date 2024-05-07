import { View } from "react-native";
import { CartesianChart, Line } from "victory-native";
import { SharedValue } from "react-native-reanimated";
import { Circle } from "@shopify/react-native-skia";
import { useChartPressState } from "victory-native";
import { Text as CText } from "@shopify/react-native-skia";
import {
  IHumidityThresholdRecord,
  ITemperatureThresholdRecord,
  ISoilMoistureThresholdRecords,
} from "../../../types";
import { Text } from "native-base";
import { format } from "date-fns";
type CombinedInterface =
  | IHumidityThresholdRecord[]
  | ITemperatureThresholdRecord[]
  | ISoilMoistureThresholdRecords[];

export default function ThresholdChart({
  data,
  type,
  title,
}: {
  data: Record<string, unknown>[] | CombinedInterface;
  type: "humidity" | "temperature" | "soilMoisture";
  title: string;
}) {
  const INIT_STATE = {
    x: Number(new Date().getTime()),
    y: { value: 0 },
  } as const;
  const { state, isActive } = useChartPressState(INIT_STATE);

  function ToolTip({
    x,
    y,
  }: {
    x: { value: SharedValue<number>; position: SharedValue<number> };
    y: { value: SharedValue<number> };
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
          //@ts-ignore
          y={y.value.position}
          text={
            //@ts-ignore
            y.value.value?.value.toString() +
            `${type === "temperature" ? "°C" : "%"}|${format(new Date(x.value.value.toString()), "dd/MM/yyyy hh:mm aa")}`
          }
        />
        <Circle
          cx={x.position.value}
          //@ts-ignore
          cy={y.value.position}
          r={8}
          color="black"
        />
      </>
    );
  }

  return (
    <View
      style={{
        height: data.length > 1 ? 300 : 150,
        marginTop: 20,
      }}
    >
      <Text textAlign="center" bold>
        {title}
      </Text>
      {data.length > 1 ? (
        <CartesianChart
          domainPadding={{
            right: 15,
            top: 15,
          }}
          padding={5}
          //@ts-ignore
          data={data}
          //@ts-ignore
          xKey={"recordedAt"}
          //@ts-ignore
          yKeys={["value"]}
          domain={{
            y: [0, 100],
          }}
          axisOptions={{
            isNumericalData: false,
            formatYLabel: (label) =>
              `${label}${type === "temperature" ? "°C" : "%"}`,
            formatXLabel: (label) => "",
          }}
          //@ts-ignore
          chartPressState={state}
        >
          {({ points }) => (
            <>
              <Line
                //@ts-ignore
                points={points.value}
                connectMissingData={true}
                curveType="cardinal50"
                color="blue"
                strokeWidth={3}
                strokeCap="butt"
                blendMode="color"
                animate={{ type: "timing", duration: 300 }}
              />

              {/* @ts-ignore */}
              {isActive ? <ToolTip x={state.x} y={state.y} /> : null}
            </>
          )}
        </CartesianChart>
      ) : (
        <View
          style={{
            marginTop: 20,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text italic color="coolGray.500">
            Data not recorded for {type}
          </Text>
        </View>
      )}
    </View>
  );
}
