import { View, Spinner, Text, VStack, Button } from "native-base";
import { useEffect, useState } from "react";
import LineGraph, {
  TempHumidDataType,
} from "../../../components/Dashboard/temp_humid";
import OverViewThresholdGraph from "../../../components/Dashboard/Overview/page";

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TempHumidDataType[]>([]);

  if (isLoading) {
    return <Spinner color="blue" />;
  }
  return (
    <View>
      <VStack>
        <OverViewThresholdGraph />
      </VStack>
    </View>
  );
}
