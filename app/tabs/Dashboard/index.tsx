import { PostType } from "../../../types";
import { useState } from "react";
import { View } from "native-base";
import LineGraph, { LegendProps } from "../../../components/Dashboard/temp_humid";
import ThresholdLineGraph from "../../../components/Dashboard/threshold";
import SoilMoistureGraph, { SoilMoistureCombinedProps } from "../../../components/Dashboard/irrigation_moisture";
import { TempHumidDataType } from "../../../components/Dashboard/temp_humid";

export default function SingleNewsPage() {
  const tempHumidData: TempHumidDataType[] = [
    {
      name: "greenhouse1",
      data: {
        temperature: [83, 53, 73, 33],
        humidity: [88, 21, 12, 21],
      },
      legend: {
        name: "greenhouse1",
        symbol: {
          fill: "blue",
          type: "square",
        },
      }
    },
    {
      name: "greenhouse2",
      data: {
        temperature: [23, 23, 43, 83],
        humidity: [33, 21, 12, 21],
      },
      legend: {
        name: "greenhouse2",
        symbol: {
          fill: "red",
          type: "square",
        },
      }
    },
    {
      name: "greenhouse3",
      data: {
        temperature: [23, 53, 13, 23],
        humidity: [33, 21, 12, 51],
      },
      legend: {
        name: "greenhouse3",
        symbol: {
          fill: "green",
          type: "square",
        },
      }
    },
  ]
  const thresholdLineData = [
    { index: 1, humidity: 30, temperature: 25, soilMoisture: 20 },
    { index: 2, humidity: 35, temperature: 26, soilMoisture: 25 },
    { index: 3, humidity: 28, temperature: 23, soilMoisture: 18 },
  ];
  const thresholdLegendData: LegendProps[] = [
    {
      name: "humidity",
      symbol: { fill: "tomato", type: "square" },
    },
    {
      name: "temperature",
      symbol: { fill: "steelblue", type: "square" },
    },
    {
      name: "soilMoisture",
      symbol: { fill: "green", type: "square" },
    },
  ];
  const soilMoistureData: SoilMoistureCombinedProps[] = [
    {
      channel: "Channel 1",
      data: [
        { timestamp: 1, moisture: 20 },
        { timestamp: 2, moisture: 25 },
        { timestamp: 3, moisture: 18 },
      ],
      legend: {
        name: "Channel 1",
        symbol: { fill: "blue", type: "line" },
      },
    },
    {
      channel: "Channel 2",
      data: [
        { timestamp: 1, moisture: 30 },
        { timestamp: 2, moisture: 22 },
        { timestamp: 3, moisture: 28 },
      ],
      legend: {
        name: "Channel 2",
        symbol: { fill: "green", type: "line" },
      },
    },
    // Add more entries as needed
  ];
  return (
    <View  >
      <LineGraph type="temp" title={'Temperature Analytics for greenhouse'} data={tempHumidData} />
      <ThresholdLineGraph
        data={thresholdLineData}
        title="Threshold Line Chart"
        legend={thresholdLegendData}
        type="line"
      />
      <SoilMoistureGraph data={soilMoistureData} title="Soil Moisture Analytics" />
    </View>
  );
}

