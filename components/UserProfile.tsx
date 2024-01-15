import { Avatar, Box, Button, Center, HStack, Text, VStack, useToast } from "native-base"
import Icons from "../assets/Icons/Icons";
import * as Clipboard from 'expo-clipboard';
import { useState } from "react";

const UserProfile = ({
  userName,
  userId,
}: {
  userName: string
  userId: string
}) => {
  const toast = useToast();
  const [copiedIcon, setCopiedIcon] = useState(<Icons.clipboard color="black" size={20} />);
  const [clipboardBorderColor, setClipboardBorderColor] = useState("coolGray.500");

  const handleCopy = async () => {
    await Clipboard.setStringAsync(userId);

    setCopiedIcon(<Icons.checkCheck color="black" size={20} />);
    setClipboardBorderColor("green.500");

    setTimeout(() => {
      setClipboardBorderColor("coolGray.500");
      setCopiedIcon(<Icons.clipboard color="black" size={20} />);
    }, 2000); // Show the check check icon for 2 seconds

    toast.show({
      render: () => (
        <Box bg="green.500" px={4} py={3} rounded="md">
          <Text color="white" fontSize="md" textAlign="center">
            Copied to Clipboard
          </Text>
        </Box>
      ),
      placement: "top",
      duration: 1500,
    });
  };
  return (
    <VStack>
      <Center>
        <Avatar bg="amber.500" source={{
          uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        }} size="md">
          {userName.split(" ").map((name) => name[0]).join("")}
          <Avatar.Badge bg="green.500" />
        </Avatar>
      </Center>
      <Box>
        <Text fontSize="lg" fontWeight="bold" textAlign="center">
          {userName}
        </Text>
      </Box>
      <VStack space={4} padding="3">
        <HStack>
          <Box w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
            User-ID
          </Box>
          <Box flex="1" flexDirection="row" padding="2" borderWidth="1" borderColor="coolGray.500">
            <Box flex="1">
              <Text fontWeight="bold">{userId}</Text>
            </Box>
            <Button
              _pressed={{
                bg: "green.500"
              }}
              onPress={handleCopy} bg="transparent" padding="1" borderWidth="1" alignSelf="flex-end" borderColor={clipboardBorderColor}>
              {copiedIcon}
            </Button>
          </Box>
        </HStack>
        <HStack>
          <Box w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
            Phone Number
          </Box>
          <Box flex="1" padding="2" borderWidth="1" borderColor="coolGray.500">
            +975 17 123 456
          </Box>
        </HStack>
        <HStack>
          <Box w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
            Current Location
          </Box>
          <Box flex="1" padding="2" borderWidth="1" borderColor="coolGray.500">
            Paro, Bhutan
          </Box>
        </HStack>
        <HStack>
          <Box w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
            Greenhouses owned
          </Box>
          <Box flex="1" padding="2" borderWidth="1" borderColor="coolGray.500">
            2
          </Box>
        </HStack>
        <HStack>
          <Box w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
            Irrigation Systems
          </Box>
          <Box flex="1" padding="2" borderWidth="1" borderColor="coolGray.500">
            2
          </Box>
        </HStack>
      </VStack>
    </VStack >
  )
}
export default UserProfile;
