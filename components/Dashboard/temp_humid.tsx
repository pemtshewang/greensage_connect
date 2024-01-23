import React from "react";
import { View } from "react-native";
import { VictoryChart, VictoryLabel, VictoryLegend, VictoryLine, VictoryTheme } from "victory-native";
import { Text, VStack } from "native-base";

const Graph = ({
  data
}: {
  data: {
    index: number; greenhouse1:
    number; greenhouse2: number;
  }[]
}) => {
  return (
    <VStack>
      <View >
        <VictoryChart
          theme={VictoryTheme.material}
          width={350}
          style={{
            background: {
              fill: "#fff",
            },
          }}
        >
          <Text marginTop="5" style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}>Temperature Analytics for greenhouse</Text>
          <VictoryLine data={data} x="index" y="greenhouse1" style={{ data: { stroke: "tomato" } }} />
          <VictoryLine data={data} x="index" y="greenhouse2" style={{ data: { stroke: "steelblue" } }} />
        </VictoryChart>
      </View>
      <VictoryLegend
        orientation="horizontal"
        gutter={20}
        data={[
          { name: "Greenhouse 1", symbol: { fill: "tomato", type: "star" } },
          { name: "Greenhouse 2", symbol: { fill: "steelblue", type: "star" } },
        ]} />
    </VStack>
  );
}

export default Graph;
