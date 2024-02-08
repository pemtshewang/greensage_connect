import { Box, Text, View, Divider } from "native-base";
import UserProfile from "../../../components/UserProfile";
import BrokerConfigDisplay from "../../../components/BrokerConfigDisplay";
import AboutPage from "../../../components/About";
import { useContext } from "react";
import SessionContext from "../../../context/SessionContext";
import LogoutDialog from "../../../components/LogoutProfileDialog";

const SettingsIndex = () => {
  const { modalVisible, setModalVisible } = useContext(SessionContext);
  return (
    <View>
      <LogoutDialog modalOpen={modalVisible} setModalOpen={setModalVisible} />
      <UserProfile />
      <Divider />
      <BrokerConfigDisplay />
      <Divider />
      <Box flex="1" marginX="3" marginY="5">
        <Text borderRadius={7} padding="2" fontWeight="bold" fontSize="md">About the application</Text>
      </Box>
      <AboutPage />
    </View>
  )
}

export default SettingsIndex;
