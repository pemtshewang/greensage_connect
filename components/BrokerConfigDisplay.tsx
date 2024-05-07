import { TouchableOpacity } from "react-native";
import { BrokerConfigType } from "../types";
import { Box, Text, VStack, HStack } from "native-base";
import { useEffect, useState } from "react";
import Icons from "../assets/Icons/Icons";
import BrokerConfigForm from "./Forms/BrokerConfigForm";
import { getValueFor } from "../securestore";
import { Skeleton } from "native-base";
const getBrokerConfig = async () => {
  const brokerConfig = await getValueFor("token");
  return brokerConfig;
};
const BrokerConfigDisplay = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [brokerConfig, setBrokerConfig] = useState<BrokerConfigType | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getBrokerConfig().then((brokerConfig) => {
      const token = JSON.parse(brokerConfig as string);
      setBrokerConfig({
        brokerUsername: token.username,
        brokerPassword: token.password,
        brokerURL: token.brokerIp,
        brokerPort: token.brokerPort,
      });
      setLoading(false);
    });
  }, []);

  return (
    <VStack padding="3">
      <HStack paddingBottom="2">
        <Box flex="1">
          <Text
            style={{
              fontFamily: "OpenSans",
            }}
            borderRadius={7}
            fontWeight="bold"
            padding="2"
            fontSize="md"
          >
            Broker Configuration
          </Text>
        </Box>
        {/* may need this functionality for user config */}
        {/* <TouchableOpacity */}
        {/*   style={{ */}
        {/*     padding: 8, */}
        {/*     borderWidth: 1, */}
        {/*     borderColor: "#A0A0A0", */}
        {/*     borderRadius: 30, */}
        {/*     alignSelf: "flex-end", */}
        {/*     backgroundColor: "green", */}
        {/*   }} */}
        {/*   onPress={() => setModalVisible(true)} */}
        {/* > */}
        {/*   <Icons.mqttServerAdd width={30} height={30} /> */}
        {/* </TouchableOpacity> */}
        {/* <BrokerConfigForm */}
        {/*   setModalState={setModalVisible} */}
        {/*   modalVisible={modalVisible} */}
        {/* /> */}
      </HStack>
      {loading ? (
        <VStack>
          <HStack>
            <Box w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
              Username
            </Box>
            <Box
              flex="1"
              padding="2"
              borderWidth="1"
              justifyContent="center"
              borderColor="coolGray.500"
            >
              <Skeleton w="1/2" paddingX="1" h="3" />
            </Box>
          </HStack>
          <HStack>
            <Box w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
              Password
            </Box>
            <Box
              flex="1"
              padding="2"
              flexDirection="row"
              borderWidth="1"
              borderColor="coolGray.500"
            >
              <Text
                style={{
                  fontFamily: "OpenSans",
                }}
                flex="1"
                italic
                fontSize="sm"
              >
                Password hidden for security reasons
              </Text>
            </Box>
          </HStack>
          <HStack>
            <Box w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
              Broker URL
            </Box>
            <Box
              flex="1"
              padding="2"
              borderWidth="1"
              borderColor="coolGray.500"
            >
              <Skeleton w="1/2" paddingX="1" h="3" />
            </Box>
          </HStack>
          <HStack>
            <Box w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
              Broker Port
            </Box>
            <Box
              flex="1"
              padding="2"
              borderWidth="1"
              borderColor="coolGray.500"
            >
              <Skeleton w="1/2" paddingX="1" h="3" />
            </Box>
          </HStack>
        </VStack>
      ) : brokerConfig ? (
        <VStack>
          <HStack>
            <Box w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
              Username
            </Box>
            <Box
              flex="1"
              padding="2"
              borderWidth="1"
              justifyContent="center"
              borderColor="coolGray.500"
            >
              {brokerConfig.brokerUsername}
            </Box>
          </HStack>
          <HStack>
            <Box w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
              Password
            </Box>
            <Box
              flex="1"
              padding="2"
              flexDirection="row"
              borderWidth="1"
              borderColor="coolGray.500"
            >
              <Text
                style={{
                  fontFamily: "OpenSans",
                }}
                flex="1"
                italic
                fontSize="sm"
              >
                Password hidden for security reasons
              </Text>
            </Box>
          </HStack>
          <HStack>
            <Box w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
              Broker URL
            </Box>
            <Box
              flex="1"
              padding="2"
              borderWidth="1"
              borderColor="coolGray.500"
            >
              {brokerConfig.brokerURL}
            </Box>
          </HStack>
          <HStack>
            <Box w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
              Broker Port
            </Box>
            <Box
              flex="1"
              padding="2"
              borderWidth="1"
              borderColor="coolGray.500"
            >
              {brokerConfig.brokerPort}
            </Box>
          </HStack>
        </VStack>
      ) : (
        <Box paddingY="5">
          <Text
            style={{
              fontFamily: "OpenSans",
            }}
            color="#A0A0A0"
          >
            You haven't been allocated any MQTT Broker yet!
          </Text>
        </Box>
      )}
    </VStack>
  );
};

export default BrokerConfigDisplay;
