import { TouchableOpacity } from "react-native";
import { BrokerConfigType } from "../types"
import { Box, Text, VStack, HStack } from "native-base";
import { useState } from "react";
import Icons from "../assets/Icons/Icons";
import BrokerConfigForm from "./Forms/BrokerConfigForm";
const BrokerConfigDisplay = ({
  brokerConfig
}: {
  brokerConfig: BrokerConfigType | null;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <VStack padding="3">
      <HStack>
        <Box flex="1">
          <Text borderRadius={7} padding="2" w="40" bg="coolGray.300" fontSize="md">Broker Configuration</Text>
        </Box>
        <TouchableOpacity style={{
          padding: 8,
          borderWidth: 1,
          borderColor: "#A0A0A0",
          borderRadius: 30,
          alignSelf: "flex-end",
          backgroundColor: "green"
        }}
          onPress={() => setModalVisible(true)}
        >
          <Icons.mqttServerAdd width={30} height={30} />
        </TouchableOpacity>
        <BrokerConfigForm setModalState={setModalVisible} modalVisible={modalVisible} />
      </HStack>
      {
        brokerConfig ? (
          <VStack>
            <HStack>
              <Box w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
                Username
              </Box>
              <Box flex="1" padding="2" borderWidth="1" borderColor="coolGray.500">
                {brokerConfig.brokerUsername}
              </Box>
            </HStack>
            <HStack>
              <Box w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
                Password
              </Box>
              <Box flex="1" padding="2" flexDirection="row" borderWidth="1" borderColor="coolGray.500">
                <Text flex="1">
                  {
                    showPassword ? (
                      brokerConfig.brokerPassword
                    ) : (
                      brokerConfig.brokerPassword.replace(/./g, "*")
                    )
                  }
                </Text>
                <TouchableOpacity onPress={() => {
                  setShowPassword(!showPassword)
                }}>
                  {
                    showPassword ? (
                      <Icons.visible width={20} height={20} color="black" />
                    ) : (
                      <Icons.visibleOff width={20} height={20} color="black" />
                    )
                  }
                </TouchableOpacity>
              </Box>
            </HStack>
            <HStack>
              <Box w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
                Broker URL
              </Box>
              <Box flex="1" padding="2" borderWidth="1" borderColor="coolGray.500">
                {brokerConfig.brokerURL}
              </Box>
            </HStack>
            <HStack>
              <Box w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
                Broker Port
              </Box>
              <Box flex="1" padding="2" borderWidth="1" borderColor="coolGray.500">
                {brokerConfig.brokerPort}
              </Box>
            </HStack>
          </VStack>
        ) : (
          <Box paddingY="5">
            <Text color="#A0A0A0">You haven't configured any MQTT Broker yet!</Text>
          </Box>
        )
      }
    </VStack>
  )
}

export default BrokerConfigDisplay;
