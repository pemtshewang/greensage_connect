import React from "react";
import { View } from "react-native";
import { VictoryChart, VictoryLegend, VictoryLine, VictoryTheme } from "victory-native";
import { Text, VStack } from "native-base";

export interface TempHumidDataType {
  name: string;
  data: {
    temperature: number[];
    humidity: number[];
  }
  legend: {
    name: string
    symbol: {
      fill: string;
      type: string;
    }
  }
}

const LineGraph = ({
  data,
  title,
}: {
  data: TempHumidDataType[],
  title: string,
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
          {
            data.map((series) => {
              return (
                <VictoryLine
                  key={series.name}
                  data={series.data.temperature}
                  style={{
                    data: {
                      stroke: series.legend.symbol.fill,
                    },
                  }} />
              )
            })
          }
        </VictoryChart>
        <VictoryLegend
          width={350}
          height={30}
          style={{ labels: { fontSize: 11 } }}
          orientation="horizontal"
          gutter={15}
          data={data.map((series) => series.legend)} />
      </View>
    </VStack>
  );
}

export default LineGraph;
