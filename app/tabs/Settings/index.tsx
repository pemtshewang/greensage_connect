import { Box, Text, View, Divider } from "native-base";
import UserProfile from "../../../components/UserProfile";
import BrokerConfigDisplay from "../../../components/BrokerConfigDisplay";
import Icons from "../../../assets/Icons/Icons";
import AboutPage from "../../../components/About";
import { useState } from "react";

const SettingsIndex = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <UserProfile
        userId="323423423ffa2"
        userName="John Doe" />
      <Divider />
      <BrokerConfigDisplay brokerConfig={null} />
      <Divider />
      <Box flex="1" marginX="3" marginY="5">
        <Text borderRadius={7} padding="2" w="40" bg="coolGray.300" fontSize="md">About the application</Text>
      </Box>
      <AboutPage />
    </View>
  )
}

export default SettingsIndex;
