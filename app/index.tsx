import { View } from "react-native";
import { HomeStyles } from "../styles/styles";
import { Redirect } from "expo-router";
import GreenHouse from "./GreenHouse/data";
import TemperatureDashboard from "../components/TemperatureDashboard";

export default function Page() {
  return (
    <Redirect href="/Auth/login" />  
    
  );
}

