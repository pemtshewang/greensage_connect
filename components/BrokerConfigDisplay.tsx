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
          <Box>
            <Text>Lets go</Text>
          </Box>
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
