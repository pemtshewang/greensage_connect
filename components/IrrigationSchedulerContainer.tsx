import { Switch, View, Text } from "native-base";
import { useState } from "react";
import { useIrrigationControllerStore } from "../zustand/store";

type ValveLabel = "firstSlot" | "secondSlot" | "thirdSlot" | "fourthSlot" | "fifthSlot";

const IrrigationSchedulerContainer = ({
  id,
  state,
  valveLabel,
}: {
  id: string,
  state: boolean,
  valveLabel: ValveLabel,
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
  return (
    <View>
      <Text>{valveLabel.toUpperCase()}</Text>
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
  )
}
export default IrrigationSchedulerContainer; 
