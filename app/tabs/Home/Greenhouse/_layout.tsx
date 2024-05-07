import { Text, View } from "native-base";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useGreenhouseStore } from "../../../../zustand/store";
import Icons from "../../../../assets/Icons/Icons";
import { Pressable } from "react-native";
import WSDisconnectDialogBox from "../../../../components/WSDisconnectDialog";
import { useEffect, useState } from "react";
import KillSessionDialog from "../../../../components/LogoutSession";
import WSSessionButton from "../../../../components/WSSessionButton";
import { IWebSocket } from "../../../../zustand/state";
import { LinearGradient } from "expo-linear-gradient";

export default function Layout() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const store = useGreenhouseStore();
  const greenhouse = store.items.find((res) => res.id === id);
  const name = greenhouse?.name;
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showKillSessionDialog, setShowKillSessionDialog] =
    useState<boolean>(false);

  useEffect(() => {
    if (greenhouse?.isConnected === false) {
      // setShowDialog(true);
    }
  }, [greenhouse]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
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
        ws={greenhouse?.ws as IWebSocket}
      />
      <Stack
        screenOptions={{
          header: () => {
            return (
              <View>
                <LinearGradient
                  colors={["#228929", "#6A4"]}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    paddingBottom: 20,
                    gap: 10,
                  }}
                >
                  <Pressable
                    onPress={() => {
                      setShowKillSessionDialog(true);
                    }}
                  >
                    <Icons.navigateBack color="black" size={37} />
                  </Pressable>
                  <View flexDirection="column" justifyContent="center">
                    <Text
                      color="#fff"
                      fontSize="xl"
                      style={{
                        fontFamily: "OpenSans",
                      }}
                    >
                      {name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      flex: 1,
                    }}
                  >
                    <WSSessionButton
                      showDialog={showKillSessionDialog}
                      setShowDialog={setShowKillSessionDialog}
                      ws={greenhouse?.ws}
                    />
                  </View>
                </LinearGradient>
              </View>
            );
          },
        }}
      />
    </>
  );
}
