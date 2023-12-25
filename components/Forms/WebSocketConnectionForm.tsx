import React, { useState, useRef, useEffect } from 'react';
import { Pressable, View, Animated, Easing, ActivityIndicator, Text } from 'react-native';
import CustomModal from '../ui/Modal';
import Icons from '../../assets/Icons/Icons';
import { Platform } from 'react-native';

export default function WSTestConnectionForm({
  id,
  ipAddress,
  showForm,
  setShowForm,
}: {
  id: string;
  ipAddress: string;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);
  const [conMsg, setConMsg] = useState<"Connected" | "Not Connected" | "Connection Failed" | "Connecting">(connected ? "Connected" : "Not Connected");
  const spinAnim = useRef(new Animated.Value(0)).current; // Use useRef for persistence

  useEffect(() => {
    if (connecting) {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000, // Set a duration for smoother animation
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinAnim.setValue(0); // Reset to initial value when not connecting
    }
  }, [connecting, spinAnim]);

  const testConnection = () => {
    setConnecting(true);
    setConMsg("Connecting");
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      setConMsg("Connected");
    }, 2000);
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <CustomModal
      modalTitle="Local Connection Test"
      modalVisible={showForm}
      setModalVisible={setShowForm}
    >
      <View style={{ flexDirection: 'column', gap: 10, justifyContent: 'center', alignItems: "center", position: 'relative' }}>
        <Text
          style={{
            fontWeight: "bold"
          }}
        >Testing connection with {ipAddress}</Text>
        {/* Circular border */}

        {/* Button */}
        <Pressable
          // disabled={connected}
          onPress={testConnection}
          style={({ pressed }) => [
            {
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#E0E0E0',
              padding: 15,
              width: 100,
              height: 100,
              borderRadius: 999,
              alignItems: 'center',
              elevation: pressed ? 10 : 5, // Change the elevation on press for an interactive effect
              borderWidth: (connected) ? 2 : 0,
              borderColor: (connected) ? 'green' : 'red',
            },
            Platform.OS === 'ios'
              ? {
                shadowColor: '#000',
                shadowOffset: {
                  width: 4,
                  height: 9,
                },
                shadowOpacity: 1,
                shadowRadius: 3,
              }
              : {}, // Android might not need these shadow properties if elevation is set
          ]}
        >
          {connecting && (
            <Animated.View
              style={{
                position: 'absolute',
                borderWidth: 4,
                borderColor: 'red',
                borderRadius: 999,
                width: 100,
                height: 100,
                transform: [{ rotate: spin }],
              }}
            />
          )}
          {
            connected ? <Icons.passedConnection size={32} /> :
              connecting ? <ActivityIndicator size="large" color="green" /> :
                <Icons.failedConnection size={32} />
          }
        </Pressable>
        <Text
          style={{
            color:
              conMsg === "Connected"
                ? "green"
                : conMsg === "Not Connected" || conMsg === "Connection Failed"
                  ? "red"
                  : conMsg === "Connecting"
                    ? "orange"
                    : "black", // Default color
          }}
        >{conMsg}</Text>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 5,
        }}>
          <Icons.help size={16} color="#A0A0A0" />
          <Text style={{
            color: "#A0A0A0"
          }}>
            Press the button for connection
          </Text>
        </View>
      </View>
    </CustomModal >
  );
}

