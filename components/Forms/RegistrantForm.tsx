import React, { useState } from "react";
import { View, Text, Input, Button, Image, HStack, Spinner } from "native-base";
import StepIndicator from "react-native-step-indicator";
import Icons from "../../assets/Icons/Icons";
import createToast from "../../hooks/toast";
import { useContext } from "react";
import RegistrantIdContext from "../../context/RegistrantIdContext";

const stepLabels = ["Welcome", "Registrant Number", "Check Registrant"];

const stepStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#4CAF50",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#4CAF50",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#4CAF50",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#4CAF50",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#4CAF50",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#fff",
};

const RegistrantForm = ({
  setIsRegistered,
}: {
  setIsRegistered: (bool: boolean) => void;
}) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const { toastMessage } = createToast();
  const [loadingMessage, setLoadingMessage] = useState("");
  const { setRegistrantId } = useContext(RegistrantIdContext);

  const handleVerification = async () => {
    setLoading(true);
    setButtonDisabled(true);
    setInputDisabled(true);
    try {
      setLoadingMessage("Verifying number...");
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/user/registrant/token`,
        {
          method: "PATCH",
          body: JSON.stringify({
            tokenId: inputValue.trim(),
          }),
          cache: "no-store",
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.status == 200) {
        setButtonDisabled(true);
        setInputDisabled(true);
        setLoadingMessage("Verified");
        toastMessage({
          message: data.message,
          type: "success",
          duration: 2000,
        });
        setTimeout(() => {
          setRegistrantId(inputValue.trim());
          setIsRegistered(true);
        }, 500);
      } else {
        setButtonDisabled(false);
        setInputDisabled(false);
        setLoadingMessage("Failed");
        toastMessage({
          message: data.message,
          type: "error",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error(error);
      setLoadingMessage("Verification Failed");
      setButtonDisabled(false);
      setInputDisabled(false);
      toastMessage({
        message: "Reg no verification failed. Please try again.",
        type: "error",
        duration: 2000,
      });
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  const renderStepContent = () => {
    switch (currentPosition) {
      case 0:
        return (
          <View>
            <Text fontSize="xl" textAlign="center" color="white" bold>
              Welcome to Greensage Connect!
            </Text>
            <Button
              bg="green.500"
              onPress={() => setCurrentPosition(1)}
              mt={10}
            >
              Next
            </Button>
          </View>
        );
      case 1:
        return (
          <View>
            <Text fontSize="xl" bold color="white" textAlign="center">
              Get Your Registrant Number
            </Text>
            <Text fontSize="md" color="white" mt={3}>
              1. To get your registrant number, please contact the Greensage
              admin.
            </Text>
            <Text fontSize="md" color="white" mt={2}>
              2. After obtaining registrant number, avoid sharing it with
              anyone.
            </Text>
            <Text fontSize="md" color="white" mt={2}>
              3. If you need support during registration, use contact details
              below:
            </Text>
            <Text fontSize="md" mt={2} color="white" ml={5}>
              Email: admin@greensage.bt
              {"\n"}
              Phone: (975) 1753-1019
            </Text>
            <Button onPress={() => setCurrentPosition(2)} mt={5} bg="green.500">
              Next
            </Button>
          </View>
        );
      case 2:
        return (
          <View>
            <Text fontSize="xl" bold color="white">
              Enter your Registrant number
            </Text>
            <Input
              mt={3}
              placeholder="Registrant Number"
              value={inputValue}
              onChangeText={setInputValue}
              isDisabled={inputDisabled}
            />
            <Button
              onPress={handleVerification}
              bg="green.500"
              mt={5}
              isDisabled={buttonDisabled}
            >
              {loading ? (
                <HStack space={2} justifyContent="center">
                  <Spinner accessibilityLabel="Loading" />
                  <Text color="white" fontSize="md">
                    {loadingMessage}
                  </Text>
                </HStack>
              ) : (
                "Check"
              )}
            </Button>
            <HStack mt={5}>
              <View mt={5} mr={2}>
                <Icons.customerSupport width={23} height={23} color="white" />
              </View>
              <View>
                <Text fontSize="md" color="white" mt={2}>
                  If you need support during registration, use contact details
                  below:
                </Text>
                <Text fontSize="md" mt={2} color="white" ml={5}>
                  Email: admin@greensage.bt
                  {"\n"}
                  Phone: (975) 1753-1019
                </Text>
              </View>
            </HStack>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View flex={1} padding={5}>
      <View
        bg="white"
        padding="3"
        flexDirection="row-reverse"
        justifyContent="center"
        borderBottomRadius={99}
      >
        <Image
          marginLeft="6"
          alt="logo"
          width={280}
          height={280}
          source={require("../../assets/logo.png")}
        />
      </View>
      <StepIndicator
        customStyles={stepStyles}
        currentPosition={currentPosition}
        labels={stepLabels}
        stepCount={3}
      />
      <View mt={10}>{renderStepContent()}</View>
    </View>
  );
};

export default RegistrantForm;
