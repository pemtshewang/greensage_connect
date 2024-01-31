import { View, Spinner, Text, VStack, Button } from "native-base";
import { useEffect, useState } from "react";
import LineGraph, {
  TempHumidDataType,
} from "../../../components/Dashboard/temp_humid";

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TempHumidDataType[]>([]);

  if (isLoading) {
    return <Spinner color="blue" />;
  }
  return (
    <View>
      <VStack>
        <LineGraph data={data} />
      </VStack>
    </View>
  );
}
