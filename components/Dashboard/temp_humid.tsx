import React from "react";
import { View } from "react-native";
import {
  VictoryChart,
  VictoryLegend,
  VictoryLine,
  VictoryTheme,
} from "victory-native";
import { Box, Text, VStack } from "native-base";
import Icons from "../../assets/Icons/Icons";
export interface TempHumidDataType {
  id: string;
  name: string;
  data: {
    temperature: Array<{ time: string; value: number }>;
    humidity: Array<{ time: string; value: number }>;
  };
  legend: {
    name: string;
    symbol: {
      fill: string;
      type: string;
    };
  };
}

const LineGraph = ({ data }: { data: TempHumidDataType[] }) => {
  return (
    <VStack>
      {data.length > 0 && (
        <View>
          <Text
            marginTop="5"
            style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}
          >
            Temperature Trends for Today
          </Text>
          <VictoryChart
            theme={VictoryTheme.material}
            width={350}
            style={{
              background: {
                fill: "#f5f5f5",
                textAlign: "center",
              },
            }}
            padding={{ top: 10, bottom: 30, left: 60, right: 20 }}
            height={300}
          >
            {data.map((series) => {
              return (
                <VictoryLine
                  key={series.name}
                  data={series.data.temperature.map((temp) => ({
                    x: temp.time,
                    y: temp.value,
                  }))}
                  style={{
                    data: {
                      stroke: series.legend.symbol.fill,
                    },
                  }}
                />
              );
            })}
          </VictoryChart>
          <Text
            marginTop="5"
            style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}
          >
            Humidity Trends for Today
          </Text>
          <VictoryChart
            theme={VictoryTheme.material}
            width={350}
            style={{
              background: {
                fill: "#f5f5f5",
              },
            }}
            padding={{ top: 10, bottom: 30, left: 60, right: 20 }}
            height={300}
          >
            {data.map((series) => {
              return (
                <VictoryLine
                  key={series.name}
                  data={series.data.humidity.map((humid) => ({
                    x: humid.time,
                    y: humid.value,
                  }))}
                  style={{
                    data: {
                      stroke: series.legend.symbol.fill,
                    },
                  }}
                />
              );
            })}
          </VictoryChart>
          <VictoryLegend
            width={350}
            height={30}
            style={{ labels: { fontSize: 11 } }}
            orientation="horizontal"
            gutter={15}
            data={data.map((series) => series.legend)}
          />
        </View>
      )}
      {!data.length && (
        <Box alignItems="center" padding="5">
          <Icons.disconnectSession color="#A0A0A0" />
          <Text color="#A0A0A0" paddingTop="5" textAlign="center">
            No temperature and humidity trends recorded today
          </Text>
        </Box>
      )}
    </VStack>
  );
};

export default LineGraph;
