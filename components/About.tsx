import React from 'react';
import { Box, VStack } from 'native-base';
import { View, TouchableOpacity, Linking } from 'react-native';
import { Text } from 'native-base';
import { CopyrightIcon } from 'lucide-react-native';
import { HStack } from 'native-base';
import Icons from '../assets/Icons/Icons';

const AboutPage = ({
}: {
  }) => {
  const handleContactPress = (contactType: string) => {
    switch (contactType) {
      case 'email':
        Linking.openURL('mailto:pemtshewang500@gmail.com');
        break;
      case 'linkedin':
        // Replace 'your-linkedin-profile' with your actual LinkedIn profile URL
        Linking.openURL('https://www.linkedin.com/in/pemtshewang');
        break;
      case 'github':
        // Replace 'your-github-profile' with your actual GitHub profile URL
        Linking.openURL('https://github.com/pemtshewang');
        break;
      case 'x':
        // Replace 'your-custom-link' with the actual URL you want to open
        Linking.openURL('https://x.com/pemtshewang_4');
        break;
      default:
        break;
    }
  };

  return (
    <VStack space={5} padding="3">
      <Text bold>
        GreenSage Connect is a cutting-edge IoT application that leverages MQTT and WebSocket technologies to provide seamless connectivity and control for smart agriculture automation.
      </Text>
      {/* Additional information */}
      <Box>
        <Text bold>Lead Developer and Tester:</Text>
        <Text>Pem Tshewang</Text>
      </Box>
      <Box>
        <Text bold>Developer and UI Designers:</Text>
        <Text>Sonam Dema</Text>
        <Text>Thinley Choden</Text>
        <Text>Deki Wangmo</Text>
      </Box>
      <Box>
        <Text bold>Collaborator:</Text>
        <Text>Agriculture Technology and Machinery Centre</Text>
        <Text>Bondey, Paro</Text>
      </Box>
      <Box>
        <Text bold>Reach Me At:</Text>
        <HStack space="5" padding="2">
          <TouchableOpacity onPress={() => handleContactPress('email')}>
            <Icons.gmail size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleContactPress('linkedin')}>
            <Icons.linkedIn size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleContactPress('github')}>
            <Icons.github size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleContactPress('x')}>
            <Icons.XIcon width={24} height={24} color="black" />
          </TouchableOpacity>
        </HStack>
      </Box>
      {/* Your existing content here... */}

      {/* Add your information */}
      <View >
        <Text bold>For support and bug reporting, please contact:</Text>
        <TouchableOpacity onPress={handleContactPress}>
          <Text underline color="blue.600">pemtshewang500@gmail.com</Text>
        </TouchableOpacity>
      </View>
      <HStack space="2">
        <CopyrightIcon color='black' />
        <Text>2023 GreenSage Connect</Text>
      </HStack>
    </VStack>
  );
};

export default AboutPage;
