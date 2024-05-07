import { useLocalSearchParams } from "expo-router";
import { useIrrigationControllerStore } from "../../../../zustand/store";
import { useState } from "react";
import IrrigationControllerContainer from "../../../../components/IrrigationControllerContainer";
import { Box, HStack, ScrollView } from "native-base";
import IrrigationSchedulerContainer from "../../../../components/IrrigationSchedulerContainer";
import { useIrrigationEnvironmentContext } from "../../../../context/envParamsContext";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, View } from "react-native";
import Icons from "../../../../assets/Icons/Icons";
type Zones =
  | "zone1"
  | "zone2"
  | "zone3"
  | "zone4"
  | "zone5"
  | "zone6"
  | "zone7";

const zones: Zones[] = [
  "zone1",
  "zone2",
  "zone3",
  "zone4",
  "zone5",
  "zone6",
  "zone7",
];

const Page = () => {
  const TabButton = ({
    onPress,
    label,
  }: {
    onPress: () => void;
    label: Zones;
  }) => {
    return (
      <View
        style={{
          position: "relative",
        }}
      >
        {currentTab === label && (
          <Icons.currentTriangle
            style={{
              position: "absolute",
              zIndex: 23,
              left: "35%",
              marginBottom: 5,
            }}
            width={11}
            height={11}
            color="black"
            fill="black"
            transform={[
              {
                rotate: "180deg",
              },
            ]}
          />
        )}
        <LinearGradient
          colors={["#228929", "#6A4"]}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderRadius: 5,
            alignItems: "center",
            position: "relative",
          }}
        >
          <TouchableOpacity
            onPress={onPress}
            style={{
              padding: 5,
            }}
          >
            <Icons.waterTap height={26} width={26} />
          </TouchableOpacity>
          {currentTab === label && (
            <Box
              borderBottomWidth={6}
              w="full"
              position="absolute"
              bottom="0"
              right="0"
            />
          )}
        </LinearGradient>
      </View>
    );
  };
  const handleTabButton = (item: Zones) => {
    setCurrentTab(item);
  };
  const { id } = useLocalSearchParams<{ id: string }>();
  const store = useIrrigationControllerStore();
  const irrigation = store.items.find((g) => g.id === id);
  const { environment: envtValues } = useIrrigationEnvironmentContext();
  const [currentTab, setCurrentTab] = useState<Zones>("zone1");
  const switchTabTo = (zoneType: Zones) => {
    switch (zoneType) {
      case "zone1":
        return (
          <IrrigationSchedulerContainer
            isActive={currentTab === "zone1"}
            prevStartTime={
              (irrigation?.valveStates.firstSlot?.startTime as Date) || null
            }
            prevEndTime={
              (irrigation?.valveStates.firstSlot?.endTime as Date) || null
            }
            valveLabel="firstSlot"
            repDays={
              (irrigation?.valveStates.firstSlot?.repDays as number) || 0
            }
            id={id as string}
            state={irrigation?.valveStates.firstSlot?.state as boolean}
          />
        );
      case "zone2":
        return (
          <IrrigationSchedulerContainer
            isActive={currentTab === "zone2"}
            prevStartTime={
              (irrigation?.valveStates.secondSlot?.startTime as Date) || null
            }
            prevEndTime={
              (irrigation?.valveStates.secondSlot?.endTime as Date) || null
            }
            valveLabel="secondSlot"
            repDays={
              (irrigation?.valveStates.secondSlot?.repDays as number) || 0
            }
            id={id as string}
            state={irrigation?.valveStates.secondSlot?.state as boolean}
          />
        );
      case "zone3":
        return (
          <IrrigationSchedulerContainer
            isActive={currentTab === "zone3"}
            prevStartTime={
              (irrigation?.valveStates.thirdSlot?.startTime as Date) || null
            }
            prevEndTime={
              (irrigation?.valveStates.thirdSlot?.endTime as Date) || null
            }
            valveLabel="thirdSlot"
            repDays={
              (irrigation?.valveStates.thirdSlot?.repDays as number) || 0
            }
            id={id as string}
            state={irrigation?.valveStates.thirdSlot?.state as boolean}
          />
        );
      case "zone4":
        return (
          <IrrigationSchedulerContainer
            isActive={currentTab === "zone4"}
            valveLabel="fourthSlot"
            prevStartTime={
              (irrigation?.valveStates.fourthSlot?.startTime as Date) || null
            }
            prevEndTime={
              (irrigation?.valveStates.fourthSlot?.endTime as Date) || null
            }
            repDays={
              (irrigation?.valveStates.fourthSlot?.repDays as number) || 0
            }
            id={id as string}
            state={irrigation?.valveStates.fourthSlot?.state as boolean}
          />
        );
      case "zone5":
        return (
          <IrrigationSchedulerContainer
            isActive={currentTab === "zone5"}
            valveLabel="fifthSlot"
            prevStartTime={
              (irrigation?.valveStates.fifthSlot?.startTime as Date) || null
            }
            prevEndTime={
              (irrigation?.valveStates.fifthSlot?.endTime as Date) || null
            }
            repDays={
              (irrigation?.valveStates.fifthSlot?.repDays as number) || 0
            }
            id={id as string}
            state={irrigation?.valveStates.fifthSlot?.state as boolean}
          />
        );
      case "zone6":
        return (
          <IrrigationSchedulerContainer
            isActive={currentTab === "zone6"}
            valveLabel="sixthSlot"
            prevStartTime={
              (irrigation?.valveStates.sixthSlot?.startTime as Date) || null
            }
            prevEndTime={
              (irrigation?.valveStates.sixthSlot?.endTime as Date) || null
            }
            repDays={
              (irrigation?.valveStates.sixthSlot?.repDays as number) || 0
            }
            id={id as string}
            state={irrigation?.valveStates.sixthSlot?.state as boolean}
          />
        );
      case "zone7":
        return (
          <IrrigationSchedulerContainer
            isActive={currentTab === "zone7"}
            valveLabel="seventhSlot"
            prevStartTime={
              (irrigation?.valveStates.seventhSlot?.startTime as Date) || null
            }
            prevEndTime={
              (irrigation?.valveStates.seventhSlot?.endTime as Date) || null
            }
            repDays={
              (irrigation?.valveStates.seventhSlot?.repDays as number) || 0
            }
            id={id as string}
            state={irrigation?.valveStates.seventhSlot?.state as boolean}
          />
        );
    }
  };
  return (
    <ScrollView backgroundColor="#fff">
      <IrrigationControllerContainer
        soilMoistureReading={envtValues.soilMoisture}
      />
      <HStack paddingY="2" space={5} justifyContent="center">
        {zones.map((item) => (
          <TabButton
            key={item}
            label={item}
            onPress={() => {
              handleTabButton(item);
            }}
          />
        ))}
      </HStack>
      {switchTabTo(currentTab)}
    </ScrollView>
  );
};

export default Page;
