import React from 'react';
import { View, Text } from 'react-native';
import { VictoryScatter, VictoryTooltip, VictoryChart, VictoryAxis, VictoryLegend } from 'victory-native';
import { format } from 'date-fns';

const formatDateTime = (isoDate) => {
  const date = new Date(isoDate);
  return format(date, 'dd/MM/yy@HH:mm'); // Format the date and time as desired
};

const CustomTooltip = ({ datum }) => (
  <VictoryTooltip datum={datum} />
);

const ThresholdRecordGraph = ({ data }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, margin: 10 }}>
        Threshold Records Readings
      </Text>
      <VictoryChart height={400}>
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryScatter
          data={data.TemperatureThresholdRecord}
          x="recordedAt"
          y="value"
          size={4}
          labels={(d) => d.x}
          style={{ data: { fill: 'red' } }}
          labelComponent={<CustomTooltip />}
        />
        <VictoryScatter
          data={data.HumidityThresholdRecord}
          x="recordedAt"
          y="value"
          size={4}
          style={{ data: { fill: 'blue' } }}
          labelComponent={<CustomTooltip />}
        />
        <VictoryScatter
          data={data.SoilMoistureThresholdRecord}
          x="recordedAt"
          y="value"
          size={4}
          style={{ data: { fill: 'yellow' } }}
          labelComponent={<CustomTooltip />}
        />
        <VictoryLegend
          x={50}
          y={50}
          orientation="vertical"
          gutter={20}
          style={{ title: { fontSize: 20 }, labels: { fontSize: 15 } }}
          data={[
            { name: 'Temperature', symbol: { fill: 'red' } },
            { name: 'Humidity', symbol: { fill: 'blue' } },
            { name: 'Soil Moisture', symbol: { fill: 'yellow' } },
          ]}
        />
      </VictoryChart>
    </View>
  );
};

export default ThresholdRecordGraph;
