import { Input, VStack, Button } from "native-base"
import { useState } from "react";
import createToast from "../../hooks/toast";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useContext } from "react";
import OTPContext from "../../context/OTPContext";

const verifyUser = async ({ id, code, phoneNumber }: {
  id: string;
  code: string;
  phoneNumber: string;
}) => {
  const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/user/verify-user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      code,
      phoneNumber
    }),
  });
  if (res.ok) {
    return true;
  }
  return false;
}
const OTPForm = ({
  mobile,
  setModalVisible
}: {
  mobile: string;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOTP] = useState("");
  const { toastMessage } = createToast();
  const router = useRouter();
  const { id } = useContext(OTPContext);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await verifyUser({
        id,
        code: otp,
        phoneNumber: mobile
      });
      setModalVisible(false);
      toastMessage({
        type: "success",
        message: "Account Verification Successfully, you may login"
      });
      router.push("/Auth/login");
    } catch (err) {
      toastMessage({
        type: "error",
        message: "Account Verification Failed"
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <VStack padding="2" space="2">
      <Input w="full" onChangeText={(text) => setOTP(text)} placeholder="Enter the OTP Code" />
      <Button disabled={loading} bg="green.600" onPress={handleSubmit}>
        {
          loading ? <ActivityIndicator color="white" /> : "Verify"
        }
      </Button>
    </VStack>
  )
}
export default OTPForm;
