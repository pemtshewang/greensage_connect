import { View, Badge } from "native-base";
import { Switch } from "react-native";
import { useState } from "react";

export default function RollerShutterController({
  leftRollerShutterState,
  rightRollerShutterState,
  setLeftRollerShutterState,
  setRightRollerShutterState,
}: {
  leftRollerShutterState: boolean | undefined;
  rightRollerShutterState: boolean | undefined;
  setLeftRollerShutterState: () => void;
  setRightRollerShutterState: () => void;
}) {
  const [rightSwitchState, setRightSwitchState] = useState<boolean>(
    rightRollerShutterState as boolean,
  );
  const [leftSwitchState, setLeftSwitchState] = useState<boolean>(
    leftRollerShutterState as boolean,
  );
  const [bothSwitchState, setBothSwitchState] = useState<boolean>(
    rightSwitchState && leftSwitchState,
  );
  const toggleRightSwitchState = () => {
    setRightSwitchState(!rightSwitchState);
    setRightRollerShutterState();
  };
  const toggleLeftSwitchState = () => {
    setLeftSwitchState(!leftSwitchState);
    setLeftRollerShutterState();
  };
  const toggleBothSwitchState = () => {
    setBothSwitchState(!bothSwitchState);
    setLeftRollerShutterState();
    setRightRollerShutterState();
  };
  return (
    <View
      w="container"
      marginTop="5"
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <View
        w="full"
        style={{
          flexDirection: "column",
          alignItems: "center",
          // box shadow
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 8, // Required for Android
          backgroundColor: "#fff", // Add a background color if not already specified
          padding: 10, // Adjust padding as needed
          borderRadius: 20,
        }}
      >
        <Badge colorScheme="green">Side Ventilators</Badge>
        {/* For both */}
        <View
          padding="5"
          marginTop="5"
          w={200}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View flexDirection="column">
            <Switch
              style={{
                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
              }}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={rightSwitchState ? "green" : "#f33"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleRightSwitchState}
              value={rightSwitchState}
            />
            <Badge colorScheme="lime">Right</Badge>
          </View>
          {/* For left */}
          <View flexDirection="column" alignItems="center">
            <Switch
              style={{
                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
              }}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={leftSwitchState ? "green" : "#f33"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleLeftSwitchState}
              value={leftSwitchState}
            />
            <Badge colorScheme="teal">Left</Badge>
          </View>
        </View>
      </View>
    </View>
  );
}
