import { View, Text } from "native-base"
import Icons from "../assets/Icons/Icons"
import { Switch } from "react-native";
import { useState } from "react";

export default function RollerShutterController({
  leftRollerShutterState,
  rightRollerShutterState,
  setLeftRollerShutterState,
  setRightRollerShutterState,
}: {
  leftRollerShutterState: boolean | undefined,
  rightRollerShutterState: boolean | undefined,
  setLeftRollerShutterState: (state: boolean) => void,
  setRightRollerShutterState: (state: boolean) => void,
}) {
  const [rightSwitchState, setRightSwitchState] = useState<boolean>(rightRollerShutterState as boolean);
  const [leftSwitchState, setLeftSwitchState] = useState<boolean>(leftRollerShutterState as boolean);
  const [bothSwitchState, setBothSwitchState] = useState<boolean>(rightSwitchState && leftSwitchState);
  const toggleRightSwitchState = () => {
    setRightSwitchState(!rightSwitchState);
    setRightRollerShutterState(rightSwitchState);
  }
  const toggleLeftSwitchState = () => {
    setLeftSwitchState(!leftSwitchState);
    setLeftRollerShutterState(leftSwitchState);
  }
  const toggleBothSwitchState = () => {
    setBothSwitchState(!bothSwitchState);
    setLeftRollerShutterState(bothSwitchState);
    setRightRollerShutterState(bothSwitchState);
  }
  return (
    <View
      w="container"
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}>
      <View
        w="100%"
        style={{
          flexDirection: "row",
          gap: 4,
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
          borderRadius: 20

        }}>
        <View
          w="10"
          marginRight="5"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          style={{
            gap: 4
          }}
        >
          <Icons.powerState color={rightSwitchState ? "green" : "red"} />
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center"
          }}>
          <Text fontWeight="semibold" color="#A0A0A0">Toggle the switch to turn on and off</Text>
          {/* For both */}
          <View>
            <Switch
              style={{
                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
              }}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={bothSwitchState ? 'green' : '#f33'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleBothSwitchState}
              value={bothSwitchState}
            />
          </View>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20
          }}>
            {/* For right */}
            <Switch
              style={{
                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
              }}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={rightSwitchState ? 'green' : '#f33'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleRightSwitchState}
              value={rightSwitchState}
            />
            {/* For left */}
            <Switch
              style={{
                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
              }}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={leftSwitchState ? 'green' : '#f33'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleLeftSwitchState}
              value={leftSwitchState}
            />
          </View>
        </View>
      </View>
    </View >
  )
}
