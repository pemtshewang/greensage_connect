import { View, Text, Divider, Box, HStack, Badge } from "native-base";
import { useState } from "react";
import { useIrrigationControllerStore } from "../zustand/store";
import { TextInput } from "react-native";
import IrrigationSlotContainer from "./IrrigationScheduleSlotContainer";
import { ConnectionType, IWebSocket } from "../zustand/state";
import Icons from "../assets/Icons/Icons";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import createToast from "../hooks/toast";
import { useEffect } from "react";
import { getValueFor } from "../securestore";

type ValveLabel =
  | "firstSlot"
  | "secondSlot"
  | "thirdSlot"
  | "fourthSlot"
  | "fifthSlot"
  | "sixthSlot"
  | "seventhSlot";

const valveLabelIndex = {
  firstSlot: 1,
  secondSlot: 2,
  thirdSlot: 3,
  fourthSlot: 4,
  fifthSlot: 5,
  sixthSlot: 6,
  seventhSlot: 7,
};

const IrrigationSchedulerContainer = ({
  id,
  state,
  valveLabel,
  repDays,
  prevStartTime,
  prevEndTime,
  isActive,
}: {
  id: string;
  state: boolean;
  valveLabel: ValveLabel;
  repDays: number;
  prevStartTime: Date | null;
  prevEndTime: Date | null;
  isActive: boolean;
}) => {
  const { toastMessage } = createToast();
  const store = useIrrigationControllerStore();
  const irrigation = store.items.find((g) => g.id === id);
  const [userBrokerId, setUserBrokerId] = useState();
  const [changeWaterValveName, setChangeWaterValveName] = useState<
    string | null
  >(null);
  const [isEditingValveName, setIsEditingValveName] = useState<boolean>(false);
  useEffect(() => {
    getValueFor("token").then((res) => {
      const parsed = JSON.parse(res as string);
      setUserBrokerId(parsed.brokerId);
    });
  }, []);
  useEffect(() => {
    const valveStates = irrigation?.valveStates;
    const states = Object.values(valveStates as Object).map(
      (slot) => slot?.state,
    );
    const onCounts = states.filter((item) => item === true);
    if (onCounts.length > 1) {
      toastMessage({
        message: `${onCounts.length - 1
          } other ${onCounts.length - 1 < 2 ? "valve is" : "valves are"} open, You may consider closing ${onCounts.length - 1 < 2 ? "it" : "them"}`,
        type: "warning",
        duration: 6000,
      });
    }
  }, [irrigation?.valveStates]);
  const handleChangeWaterValveName = () => {
    if (isActive) {
      store.updateItem(id, {
        ...irrigation,
        valveStates: {
          ...irrigation?.valveStates,
          [valveLabel]: {
            name: changeWaterValveName,
          },
        },
      });
      setChangeWaterValveName(null);
      toastMessage({
        message: "The zone has been renamed",
        type: "success",
      });
      setIsEditingValveName(false);
    }
  };
  const toggleValveState = (valveLabel: ValveLabel) => {
    const updatedValveState = !irrigation?.valveStates[valveLabel]?.state;
    store.updateItem(id, {
      ...irrigation,
      valveStates: {
        ...irrigation?.valveStates,
        [valveLabel]: {
          ...irrigation?.valveStates[valveLabel],
          state: updatedValveState,
        },
      },
    });
    if (irrigation?.connectionType === ConnectionType.MQTT) {
      const topic =
        "user/" +
        userBrokerId +
        "/" +
        id +
        `/actuator/valve/${Number(valveLabelIndex[valveLabel]) - 1}`;
      irrigation?.ws?.sendMessage(
        topic,
        irrigation.valveStates[valveLabel]?.state ? `close` : `open`,
      );
    } else {
      irrigation?.ws?.sendMessage(
        `valve:${Number(valveLabelIndex[valveLabel] - 1).toString()}:${irrigation.valveStates[valveLabel]?.state ? "close" : "open"
        }`,
      );
    }
  };
  return (
    <View
      flexDirection="column"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        padding: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,
        borderRadius: 9,
        backgroundColor: "white",
        borderWidth: 1,
        margin: 10,
      }}
    >
      <HStack justifyContent="space-between">
        <Box>
          {isEditingValveName ? (
            <TextInput
              placeholderTextColor="#A0A0A0"
              autoFocus={true}
              placeholder="Enter new name"
              onChangeText={(text) => {
                setChangeWaterValveName(text);
              }}
            />
          ) : (
            <Badge colorScheme="info">
              {(irrigation?.valveStates[valveLabel]?.name as string) ??
                valveLabel}
            </Badge>
          )}
        </Box>
        {isEditingValveName ? (
          <HStack space="2">
            <TouchableOpacity
              onPress={() => {
                handleChangeWaterValveName();
              }}
            >
              <LinearGradient
                colors={["#228929", "#6A4"]}
                style={{
                  padding: 3,
                  borderRadius: 5,
                }}
              >
                <Icons.confirm width={23} height={23} color="black" />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsEditingValveName(false);
              }}
            >
              <LinearGradient
                colors={["#228929", "#6A4"]}
                style={{
                  padding: 3,
                  borderRadius: 5,
                }}
              >
                <Icons.close width={23} height={23} color="black" />
              </LinearGradient>
            </TouchableOpacity>
          </HStack>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setIsEditingValveName(true);
            }}
          >
            <LinearGradient
              colors={["#228929", "#6A4"]}
              style={{
                padding: 3,
                borderRadius: 5,
              }}
            >
              <Icons.edit width={23} height={23} color="black" />
            </LinearGradient>
          </TouchableOpacity>
        )}
      </HStack>
      <View
        flexDirection="column"
        alignItems="center"
        style={{
          gap: 5,
        }}
      >
        <View
          padding={3}
          style={{
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <LinearGradient
            colors={["#228929", "#6A4"]}
            style={{
              padding: 10,
              borderRadius: 99,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                toggleValveState(valveLabel);
              }}
            >
              <Icons.power size={34} color="black" />
            </TouchableOpacity>
          </LinearGradient>
          <HStack
            flexDirection={state ? "row" : "row-reverse"}
            bg={state ? "green.500" : "red.500"}
            borderRadius="full"
            justifyContent="space-between"
            alignItems="center"
            padding="1"
            style={{
              width: 98,
            }}
          >
            <Box>
              <Text
                bold
                textAlign={state ? "right" : "left"}
                w="full"
                color="white"
                marginRight={1}
              >
                {state ? "OPEN" : "CLOSE"}
              </Text>
            </Box>
            <Box borderRadius="full" bg="white" w="8" h="8"></Box>
          </HStack>
        </View>
      </View>
      <Divider marginBottom="5" />
      <View
        flexDirection="column"
        alignItems="center"
        style={{
          gap: 5,
        }}
      >
        <IrrigationSlotContainer
          id={id}
          valveNumber={valveLabel}
          repDays={repDays}
          ws={irrigation?.ws as IWebSocket}
          prevEndTime={prevEndTime}
          prevStartTime={prevStartTime}
        />
      </View>
    </View>
  );
};
export default IrrigationSchedulerContainer;
