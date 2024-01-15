import { Modal, VStack, useToast } from "native-base";
import TextInputIcon from "../../components/TextInputIcon";
import { Icons } from "../../assets/Icons/Icons";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import zodResolver from "@hookform/resolvers/zod";
import { Text, Box } from "native-base";
import { LoginStyles } from "../../styles/styles";
import { MQTTBrokerSchema } from "../../validations/MQTTBroker";
import { BrokerConfigType } from "../../types";
import { useMQTTBrokerStore } from "../../zustand/store";
import { TouchableOpacity } from "react-native";

const BrokerConfigForm = ({
  setModalState,
  modalVisible,
}: {
  setModalState: (state: boolean) => void;
  modalVisible: boolean;
}) => {
  const toast = useToast();
  const [data, setData] = useState({
    brokerURL: "",
    brokerPort: 0,
    brokerUsername: "",
    brokerPassword: "",
  });
  const brokerStore = useMQTTBrokerStore();
  const handleSubmitData = (data: BrokerConfigType) => {
    brokerStore.setBrokerConfig(data);
    toast.show({
      render: () => {
        return (
          <Box bg="green.500" px={4} py={3} rounded="md" mb={5}>
            <Text color="white">Broker configuration saved!</Text>
          </Box>
        );
      },
      placement: "bottom",
    });
    setModalState(false);
    console.log("config ip: ", brokerStore.brokerURL);
  }
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<BrokerConfigType>({
    resolver: zodResolver.zodResolver(MQTTBrokerSchema),
    defaultValues: { ...data },
    values: { ...data },
  });
  const initalRef = useRef(null);
  const finalRef = useRef(null);
  return (
    <Modal isOpen={modalVisible} initialFocusRef={initalRef} finalFocusRef={finalRef} onClose={() => setModalState(false)}>
      <Modal.Content>
        <Modal.Header bg="green.600">
          Add a new MQTT Broker
        </Modal.Header>
        <Modal.CloseButton bg="white" />
        <Modal.Body>
          <VStack space={2} alignItems="start" h="full">
            <Box>
              <TextInputIcon
                type="text"
                placeholder={`Enter your broker username`}
                value={data.brokerUsername}
                onChangeText={(text: string) => {
                  setData({ ...data, brokerUsername: text });
                }}
                InputLeftElement={
                  <Box style={LoginStyles.icon}>
                    <Icons.loginUser color="black" />
                  </Box>
                }
              />
              <Text color="#f00">{errors.brokerUsername && String(errors.brokerUsername.message)}</Text>
            </Box>
            <Box>
              <TextInputIcon
                type="password"
                placeholder="Enter your broker password"
                value={data.brokerPassword}
                onChangeText={(text: string): void => {
                  setData({ ...data, brokerPassword: text });
                }}
                InputLeftElement={
                  <Box style={LoginStyles.icon}>
                    <Icons.keyRound color="black" />
                  </Box>
                }
              />
              <Text color="#f00">
                {errors.brokerPassword && String(errors.brokerPassword.message)}
              </Text>
            </Box>
            <Box>
              <TextInputIcon
                type="text"
                placeholder="Enter your broker url or ip"
                value={data.brokerURL}
                onChangeText={(text: string): void => {
                  setData({ ...data, brokerURL: text });
                }}
                InputLeftElement={
                  <Box style={LoginStyles.icon}>
                    <Icons.link color="black" />
                  </Box>
                }
              />
              <Text color="#f00">
                {errors.brokerURL && String(errors.brokerURL.message)}
              </Text>
            </Box>
            <Box>
              <TextInputIcon
                type="text"
                placeholder="Broker port number (1-65535)"
                keyboardType="numeric"
                value={data.brokerPort}
                onChangeText={(text: string): void => {
                  setData({ ...data, brokerPort: Number(text) });
                }}
                InputLeftElement={
                  <Box style={LoginStyles.icon}>
                    <Icons.portNumber color="black" />
                  </Box>
                }
              />
              <Text color="#f00">
                {errors.brokerPort && String(errors.brokerPort.message)}
              </Text>
            </Box>
            <Box>
              <TouchableOpacity
                onPress={handleSubmit(handleSubmitData)}
                style={{
                  width: "100%",
                  borderWidth: 2,
                  borderRadius: 5,
                  padding: 11,
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: "#228B29",
                }}
              >
                <Text>Configure Broker</Text>
              </TouchableOpacity>
            </Box>
          </VStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>);
}

export default BrokerConfigForm;
