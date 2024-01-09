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
  setLeftRollerShutterState: () => void,
  setRightRollerShutterState: () => void,
}) {
  const [rightSwitchState, setRightSwitchState] = useState<boolean>(rightRollerShutterState as boolean);
  const [leftSwitchState, setLeftSwitchState] = useState<boolean>(leftRollerShutterState as boolean);
  const [bothSwitchState, setBothSwitchState] = useState<boolean>(rightSwitchState && leftSwitchState);
  const toggleRightSwitchState = () => {
    setRightSwitchState(!rightSwitchState);
    setRightRollerShutterState();
  }
  const toggleLeftSwitchState = () => {
    setLeftSwitchState(!leftSwitchState);
    setLeftRollerShutterState();
  }
  const toggleBothSwitchState = () => {
    setBothSwitchState(!bothSwitchState);
    setLeftRollerShutterState();
    setRightRollerShutterState();
  }
  return (
    <View
      w="container"
      marginTop="5"
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
          marginRight="5"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          style={{
            gap: 4
          }}
        >
          <View padding="2" borderWidth="1" w="16" flexDirection="column" alignItems="center">
            <Icons.rollerShutter width={32} height={32} color={rightSwitchState ? "green" : "red"} />
          </View>
          <View padding="2" borderWidth="1" w="16" flexDirection="column" alignItems="center">
            <Icons.powerState color={rightSwitchState ? "green" : "red"} />
            <Text>Right</Text>
          </View>
          <View padding="2" borderWidth="1" w="16" flexDirection="column" alignItems="center">
            <Icons.powerState color={leftSwitchState ? "green" : "red"} />
            <Text>Left</Text>
          </View>
          <View padding="2" borderWidth="1" w="16" flexDirection="column" alignItems="center">
            <Icons.powerState color={bothSwitchState ? "green" : "red"} />
            <Text>Both</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center"
          }}>
          <Text fontWeight="semibold" color="#A0A0A0">Toggle the RollerShutter State</Text>
          {/* For both */}
          <View w={200} marginTop="5" borderWidth="2" padding="2" flexDirection="column" alignItems="center">
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
            <Text>For Both Roller Shutter State</Text>
          </View>
          <View borderWidth="2"
            padding="5"
            marginTop="5"
            w={200}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 20
            }}>
            {/* For right */}
            <View flexDirection="column">
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
              <Text>Right</Text>
            </View>
            {/* For left */}
            <View flexDirection="column" alignItems="center">
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
              <Text textAlign="center">Left</Text>
            </View>
          </View>
        </View>
      </View>
    </View >
  )
}
