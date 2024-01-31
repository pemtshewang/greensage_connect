import CustomModal from "./ui/Modal";
import { Text, HStack, Button, View } from "native-base";
import { removeValueFor } from "../securestore";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";

const LogoutDialog = (
  {
    modalOpen,
    setModalOpen,
  }: {
    modalOpen: boolean,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  }
) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    setLoading(prevState => !prevState)
    try {
      const removed = removeValueFor("token");
      router.replace("/")
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(prevState => !prevState)
    }
  }
  return (
    <CustomModal
      modalVisible={modalOpen}
      setModalVisible={setModalOpen}
      modalTitle="Logout Session"
    >
      {
        loading ? (
          <View>
            <ActivityIndicator size="large" color="green" />
            <Text color="#A0A0A0">Logging out...</Text>
          </View>
        ) : (
          <>
            <Text>Are you sure you want to logout?</Text>
            <HStack flexDirection="row-reverse" space={5} marginTop="5">
              <Button bg="green.600" onPress={handleLogout}>
                Logout
              </Button>
              <Button bg="red.500" onPress={() => setModalOpen(false)}>
                Cancel
              </Button>
            </HStack>
          </>
        )
      }
    </CustomModal>
  )
}
export default LogoutDialog;
