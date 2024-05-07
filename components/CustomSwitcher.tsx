import { useContext } from "react";
import HomeListContext from "../context/HomeListContext";
import { View, HStack } from "native-base";
import { TouchableOpacity } from "react-native";
import Icons from "../assets/Icons/Icons";
import { LinearGradient } from "expo-linear-gradient";

const CustomSwitcher = () => {
  const { type, setType } = useContext(HomeListContext);
  return (
    <View>
      <HStack
        space={5}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        padding="5"
      >
        <TouchableOpacity
          onPress={() => {
            setType("greenhouse");
          }}
          style={{
            borderWidth: type === "greenhouse" ? 2 : 0,
            borderRadius: type === "greenhouse" ? 10 : 0,
            padding: type === "greenhouse" ? 3 : 0,
          }}
        >
          <LinearGradient
            style={{
              padding: 5,
              borderRadius: 10,
            }}
            colors={["#228929", "#6A4"]}
          >
            <Icons.greenhouse width={45} height={45} />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setType("irrigation");
          }}
          style={{
            borderWidth: type === "irrigation" ? 2 : 0,
            borderRadius: type === "irrigation" ? 10 : 0,
            padding: type === "irrigation" ? 3 : 0,
          }}
        >
          <LinearGradient
            colors={["#228929", "#6A4"]}
            style={{
              padding: 5,
              borderRadius: 10,
            }}
          >
            <Icons.waterSprinker width={45} height={45} />
          </LinearGradient>
        </TouchableOpacity>
      </HStack>
    </View>
  );
};

export default CustomSwitcher;
