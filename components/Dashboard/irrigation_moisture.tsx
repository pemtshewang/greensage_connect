import React from "react";
import { View } from "react-native";
import { VictoryChart, VictoryLegend, VictoryLine, VictoryTheme } from "victory-native";
import { Text, VStack } from "native-base";

export interface SoilMoistureCombinedProps {
  channel: string;
  data: {
    timestamp: number;
    moisture: number;
  }[];
  legend: {
    name: string;
    symbol: {
      fill: string;
      type: string;
    };
  };
}
const SoilMoistureGraph = ({
  data,
  title,
}: {
  data: SoilMoistureCombinedProps[],
  title: string,
}) => {
  return (
    <VStack>
      <View>
        <Text marginTop="5" style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}>
          {title}
        </Text>
        <VictoryChart
          theme={VictoryTheme.material}
          width={350}
          style={{
            background: {
              fill: "#f5f5f5",
            },
          }}
          padding={{ top: 10, bottom: 30, left: 40, right: 20 }}
          height={300}
        >
          {data.map((entry) => (
            <VictoryLine
              key={entry.channel}
              data={entry.data}
              x="timestamp"
              y="moisture"
              style={{
                data: { stroke: entry.legend.symbol.fill },
              }}
            />
          ))}
        </VictoryChart>
      </View>
      <VictoryLegend
        width={350}
        height={30}
        style={{ labels: { fontSize: 11 } }}
        orientation="horizontal"
        gutter={15}
        data={data.map((entry) => entry.legend)}
      />
    </VStack>
  );
}

export default SoilMoistureGraph;
