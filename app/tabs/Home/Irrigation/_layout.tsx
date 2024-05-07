import { Text, View } from "native-base";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useIrrigationControllerStore } from "../../../../zustand/store";
import Icons from "../../../../assets/Icons/Icons";
import { Pressable } from "react-native";
import WSDisconnectDialogBox from "../../../../components/WSDisconnectDialog";
import { useEffect, useState } from "react";
import KillSessionDialog from "../../../../components/LogoutSession";
import WSSessionButton from "../../../../components/WSSessionButton";
import { IWebSocket } from "../../../../zustand/state";

export default function Layout() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const irrigationStore = useIrrigationControllerStore();
  const irrigationController = irrigationStore.items.find((res) => res.id === id);
  const name = irrigationController?.name || "Irrigation Controller";
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showKillSessionDialog, setShowKillSessionDialog] = useState<boolean>(false);

  useEffect(() => {
    if (irrigationController?.isConnected === false) {
      // setShowDialog(true);
    }
  }, [irrigationController]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <WSDisconnectDialogBox
        title="Session Closed"
        dialogVisible={showDialog}
        message="The session has ended. Please try to connect again"
        setDialogVisible={setShowDialog}
      />
      <KillSessionDialog
        dialogVisible={showKillSessionDialog}
        message="Are you sure you want to disconnect this session?"
        setDialogVisible={setShowKillSessionDialog}
        ws={irrigationController?.ws as IWebSocket}
      />
      <Stack
        screenOptions={{
          header: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  padding: 10,
                  gap: 10,
                  backgroundColor: "green"
                }}
              >
                <Pressable
                  onPress={() => {
                    setShowKillSessionDialog(true);
                  }}
                >
                  <Icons.navigateBack color="black" size={32} />
                </Pressable>
                <View
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Text
                    color="#fff"
                    fontSize="xl"
                  >{name}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    flex: 1,
                  }}
                >
                  <WSSessionButton showDialog={showKillSessionDialog}
                    setShowDialog={setShowKillSessionDialog}
                    ws={irrigationController?.ws}
                  />
                </View>
              </View>
            );
          },
        }}
      />
    </>);
}
