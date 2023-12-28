import { Text, View } from "native-base";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useGreenhouseStore } from "../../../../zustand/store";
import Icons from "../../../../assets/Icons/Icons";
import { Pressable } from "react-native";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import WSDisconnectDialogBox from "../../../../components/WSDisconnectDialog";

export default function Layout() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const store = useGreenhouseStore();
  const greenhouse = store.greenhouses.find((res) => res.id === id);
  const navigation = useNavigation();
  const name = greenhouse?.name;
  const [isConnected, setIsConnected] = useState<boolean>(greenhouse?.isConnected || true);
  useEffect(() => {
    setIsConnected(greenhouse?.isConnected || true);
  }, [greenhouse?.isConnected]);
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <WSDisconnectDialogBox
        isOpen={!isConnected}
        setIsOpen={setIsConnected}
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
                    navigation.goBack();
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
                    w="container"
                    fontSize="xl"
                  >{name}</Text>
                </View>
              </View>
            );
          },
        }}
      />
    </>);
}
