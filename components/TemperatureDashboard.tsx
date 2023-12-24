import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const greenhouseData = [
  { date: '1', greenhouse1: 25, greenhouse2: 28 },
  { date: '2', greenhouse1: 26, greenhouse2: 23 },
  { date: '3', greenhouse1: 27, greenhouse2: 28 },
  { date: '4', greenhouse1: 26, greenhouse2: 22 },
  { date: '5', greenhouse1: 23, greenhouse2: 29 },
  { date: '6', greenhouse1: 24, greenhouse2: 20 },
  { date: '7', greenhouse1: 29, greenhouse2: 29 },
  { date: '8', greenhouse1: 23, greenhouse2: 24 },
  { date: '9', greenhouse1: 20, greenhouse2: 20 },
  { date: '10', greenhouse1: 25, greenhouse2: 28 },
  { date: '11', greenhouse1: 26, greenhouse2: 23 },
  { date: '12', greenhouse1: 27, greenhouse2: 6 },
  { date: '13', greenhouse1: 26, greenhouse2: 22 },
  { date: '14', greenhouse1: 23, greenhouse2: 29 },
  { date: '15', greenhouse1: 24, greenhouse2: 20 },
  { date: '16', greenhouse1: 29, greenhouse2: 29 },
  { date: '17', greenhouse1: 23, greenhouse2: 24 },
  { date: '18', greenhouse1: 20, greenhouse2: 20 },
  { date: '19', greenhouse1: 25, greenhouse2: 28 },
  { date: '20', greenhouse1: 26, greenhouse2: 23 },
  { date: '21', greenhouse1: 27, greenhouse2: 28 },
  { date: '22', greenhouse1: 26, greenhouse2: 22 },
  { date: '23', greenhouse1: 23, greenhouse2: 29 },
  { date: '24', greenhouse1: 24, greenhouse2: 20 },
  { date: '25', greenhouse1: 29, greenhouse2: 29 },
  { date: '26', greenhouse1: 23, greenhouse2: 24 },
  { date: '27', greenhouse1: 20, greenhouse2: 20 },
  { date: '25', greenhouse1: 29, greenhouse2: 29 },
  { date: '26', greenhouse1: 23, greenhouse2: 24 },
  { date: '27', greenhouse1: 20, greenhouse2: 20 }
  // ... add more data
];

const TemperatureDashboard = () => {
  useEffect(() => {
    // Your initialization code, if any
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Greenhouse Temperature</Text>
      <LineChart
        data={{
          labels: greenhouseData.map(item => item.date),
          datasets: [
            {
              data: greenhouseData.map(item => item.greenhouse1),
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            },
            {
              data: greenhouseData.map(item => item.greenhouse2),
              color: (opacity = 1) => `rgba(219, 53, 69, ${opacity})`,
            },
            // Add datasets for other greenhouses
          ],
        }}
        width={Dimensions.get('window').width}
        height={220}
        //yAxisLabel="°C"
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#008000',
          backgroundGradientFrom: '#00A86B',
          backgroundGradientTo: '#008000',

          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default TemperatureDashboard;






