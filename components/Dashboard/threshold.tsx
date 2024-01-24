import React from "react";
import { View } from "react-native";
import { VictoryChart, VictoryLegend, VictoryTheme, VictoryLine, VictoryScatter, VictoryArea } from "victory-native";
import { Text, VStack } from "native-base";
import { LegendProps } from "./temp_humid";

export interface ThresholdData {
  index: number;
  humidity: number;
  temperature: number;
  soilMoisture: number;
}

const ThresholdLineGraph = ({
  data,
  title,
  legend,
  type
}: {
  data: ThresholdData[],
  title: string,
  legend: LegendProps[],
  type: string
}) => {
  return (
    <VStack>
      <View>
        <Text marginTop="5" style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}>{title}</Text>
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
          {legend.map((item, index) => (
            <VictoryLine
              key={index}
              data={data}
              x="index"
              y={item.name === "humidity" ? "humidity" : item.name === "temperature" ? "temperature" : "soilMoisture"}
              style={{
                data: { stroke: item.symbol.fill },
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
        data={legend}
      />
    </VStack>
  );
}

export default ThresholdLineGraph;
