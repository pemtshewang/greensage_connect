import { getValueFor } from "../../securestore";

// Define the expected structure of the threshold values
export type ThresholdValues = {
  id:string;
  maxThreshold: number;
  minThreshold: number;
  name: string;
  type: 'temperature' | 'humidity' | 'soilMoisture'
}[];

// Function to fetch threshold values from the API
const getThresholdValues = async (): Promise<ThresholdValues> => {
  try {
    // Fetch the token from secure storage
    const value = JSON.parse(await getValueFor("token") as string);
    const token = value?.accessToken?.token;

    // Make a request to the API to fetch the threshold values
    const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/resource/threshold?role=user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    // Check if the response is okay
    if (response.ok) {
      const data: ThresholdValues = await response.json();
      console.log("Data after successful fetch: ", data)
      return data;
    }
    // If response is not okay, return an empty array
    return [];
  } catch (error) {
    console.error("Error fetching threshold values:", error);
    return [];
  }
}

export default getThresholdValues;
