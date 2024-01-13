import { Badge, View, Text } from "native-base";
import { useState } from "react";
import { useIrrigationControllerStore } from "../zustand/store";
import { Switch } from "react-native";
import IrrigationSlotContainer from "./IrrigationScheduleSlotContainer";
import { IWebSocket } from "../zustand/state";

type ValveLabel = "firstSlot" | "secondSlot" | "thirdSlot" | "fourthSlot" | "fifthSlot";

const IrrigationSchedulerContainer = ({
  id,
  state,
  valveLabel,
  repDays,
  prevStartTime,
  prevEndTime
}: {
  id: string,
  state: boolean,
  valveLabel: ValveLabel,
  repDays: number,
  prevStartTime: Date | null,
  prevEndTime: Date | null
}) => {
  const store = useIrrigationControllerStore();
  const irrigation = store.irrigationControllers.find((g) => g.id === id);
  const [valveState, setValveState] = useState<boolean>(state);
  const toggleValveState = () => {
    setValveState(!valveState);
    if (irrigation) {
      irrigation.ws?.sendMessage(`waterValve:${valveLabel}:${valveState ? "close" : "open"}`);
      store.updateIrrigationController(id, {
        ...irrigation,
        valveStates: {
          ...irrigation.valveStates,
          [valveLabel]: {
            ...irrigation.valveStates[valveLabel],
            state: valveState,
          }
        }
      });
    }
  }
  const badge = valveLabel.split('S')[0][0].toUpperCase() + valveLabel.split('S')[0].slice(1,) + " Valve";
  return (
    <View
      flexDirection="row"
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
        margin: 10
      }}
    >
      <View flexDirection="column" alignItems="center" w="20" style={{
        gap: 5
      }}>
        <View>
          <Badge colorScheme="info" fontWeight="bold">{badge}</Badge>
        </View>
        <View>
          <Badge colorScheme="teal" fontWeight="bold">Manual</Badge>
        </View>
        <View borderWidth={1} padding={3} style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20
        }}>
          <Switch
            style={{
              transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
            }}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={state ? 'green' : '#f33'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleValveState}
            value={valveState}
          />
        </View>
      </View>
      <View flex={1} flexDirection="column" alignItems="center" w="20" style={{
        gap: 5
      }}>
        <IrrigationSlotContainer id={id} valveNumber={valveLabel} repDays={repDays} ws={irrigation?.ws as IWebSocket} prevEndTime={prevEndTime} prevStartTime={prevStartTime} />
      </View>
    </View>
  )
}
export default IrrigationSchedulerContainer; 
