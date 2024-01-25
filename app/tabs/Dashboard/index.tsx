import { View, Spinner, Text } from "native-base";
import { useEffect, useState } from "react";
import LineGraph, { TempHumidDataType } from "../../../components/Dashboard/temp_humid";
import { useAnalyticsStore } from "../../../zustand/store";

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const { tempHumidData, getMinMaxTempHumidData } = useAnalyticsStore();
  useEffect(() => {
    const [data, setData] = useState<TempHumidDataType[]>([]);
    setData(tempHumidData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Spinner color="blue" />;
  }

  if (data.length === 0) {
    return <Text>No data recorded as of now.</Text>;
  }

  const { minTemp, minHumid, maxTemp, maxHumid } = getMinMaxTempHumidData();
  if (new Date() > new Date(maxTemp.time)) {
    setData([]);
  }

  return (
    <View>
      <LineGraph type="temp" title={'Temperature Analytics for greenhouse'} data={data} />
    </View>
  );
}