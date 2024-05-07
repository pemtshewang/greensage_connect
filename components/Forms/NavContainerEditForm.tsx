import CustomModal from "../ui/Modal";
import { BaseStore } from "../../zustand/store";
import {
  GreenhouseState,
  IrrigationControllerState,
} from "../../zustand/state";
import { VStack, Text, HStack } from "native-base";
import { useState } from "react";
import { Input } from "native-base";
import { z } from "zod";
import { Button } from "native-base";
import createToast from "../../hooks/toast";

const nameSchema = z.string().min(5, "Name must be at least 5 characters long");
const ipAddressSchema = z
  .string()
  .regex(
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    "Invalid IP address format",
  );

interface NavContainerEditFormProps {
  modalVisible: boolean;
  setModalVisible: (bool: boolean) => void;
  modalTitle: string;
  id: string;
  store: BaseStore<GreenhouseState> | BaseStore<IrrigationControllerState>;
  name: string;
  controller: GreenhouseState | IrrigationControllerState;
}

export default function NavContainerEditForm({
  modalVisible,
  setModalVisible,
  modalTitle,
  store,
  controller,
}: NavContainerEditFormProps) {
  const handleChange = () => {
    if (error.nameError || error.ipAddressError) {
      // Do not update the state if there are errors
      return;
    }
    // Update the state with the new data
    store.updateItem(controller.id, {
      name: data.controllerName,
      ipAddress: data.ipAddress,
    });
    // Optionally, you can log or display a success message
    setModalVisible(false);
    toastMessage({
      message: "Changes successful",
      type: "success",
    });
  };

  const [data, setData] = useState<{
    controllerName: string;
    ipAddress: string;
  }>({ controllerName: controller.name, ipAddress: controller.ipAddress });

  const { toastMessage } = createToast();

  const [error, setError] = useState<{
    nameError: string | null;
    ipAddressError: string | null;
  }>({ nameError: null, ipAddressError: null });

  const handleNameChange = (text: string) => {
    setData((prevData) => ({ ...prevData, controllerName: text }));
    const nameResult = nameSchema.safeParse(text);
    setError((prevError) => ({
      ...prevError,
      nameError: nameResult.success ? null : nameResult.error.issues[0].message,
    }));
  };

  const handleIpAddressChange = (text: string) => {
    setData((prevData) => ({ ...prevData, ipAddress: text }));
    const ipAddressResult = ipAddressSchema.safeParse(text);
    setError((prevError) => ({
      ...prevError,
      ipAddressError: ipAddressResult.success
        ? null
        : ipAddressResult.error.issues[0].message,
    }));
  };

  return (
    <CustomModal
      modalTitle={modalTitle}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    >
      <VStack space={4}>
        <VStack space={2}>
          <Text
            color="coolGray.700"
            style={{
              fontFamily: "OpenSans",
            }}
            role="heading"
          >
            Change controller's name
          </Text>
          <Input
            inputMode="text"
            placeholder="Enter new name for the controller"
            defaultValue={controller.name}
            style={{
              fontFamily: "OpenSans",
            }}
            borderColor={error.nameError ? "red.500" : "black"}
            borderWidth="2"
            onChangeText={handleNameChange}
            isInvalid={!!error.nameError}
          />
          {error.nameError && (
            <Text color="red.500" fontSize="sm">
              {error.nameError}
            </Text>
          )}
        </VStack>
        <VStack space={2}>
          <Text
            style={{
              fontFamily: "OpenSans",
            }}
            role="heading"
          >
            Change controller's IP Address
          </Text>
          <Input
            inputMode="text"
            defaultValue={controller.ipAddress}
            placeholder="Enter new ip address for the controller"
            style={{
              fontFamily: "OpenSans",
            }}
            borderColor={error.ipAddressError ? "red.500" : "black"}
            borderWidth="2"
            onChangeText={handleIpAddressChange}
            isInvalid={!!error.ipAddressError}
          />
          {error.ipAddressError && (
            <Text color="red.500" fontSize="sm">
              {error.ipAddressError}
            </Text>
          )}
        </VStack>
        <HStack justifyContent="center">
          <Button onPress={handleChange} bg="green.700">
            Change
          </Button>
        </HStack>
      </VStack>
    </CustomModal>
  );
}
