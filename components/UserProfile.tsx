import { Avatar, Box, Button, Center, HStack, Text, VStack, useToast } from "native-base"
import Icons from "../assets/Icons/Icons";
import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from "react";
import { getValueFor } from "../securestore";
import { UserProfileType } from "../types";
import { Skeleton } from "native-base";

const getUserDetails = async () => {
  const user = await getValueFor("token");
  return user;
}
const UserProfile = () => {
  const toast = useToast();
  const [copiedIcon, setCopiedIcon] = useState(<Icons.clipboard color="black" size={20} />);
  const [clipboardBorderColor, setClipboardBorderColor] = useState("coolGray.500");
  const [values, setValues] = useState<UserProfileType>();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getUserDetails().then((user) => {
      setValues(JSON.parse(user as string));
      setFetching(false);
    })
  }, [fetching])

  const handleCopy = async () => {
    await Clipboard.setStringAsync(values?.id);

    setCopiedIcon(<Icons.checkCheck color="black" size={20} />);
    setClipboardBorderColor("green.500");

    setTimeout(() => {
      setClipboardBorderColor("coolGray.500");
      setCopiedIcon(<Icons.clipboard color="black" size={20} />);
    }, 1000);

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
      <Box alignItems="center" padding="1">
        {
          fetching ? (
            <Skeleton w="1/2" paddingX="1" h="3" />
          ) : (
            <Text bold>
              User: {values?.username}
            </Text>
          )
        }
      </Box>
      <VStack space={4} padding="3">
        <HStack>
          <Box w="2/5" padding="2" justifyContent="center" borderWidth="1" borderColor="coolGray.500">
            Broker-ID
          </Box>
          <Box flex="1" flexDirection="row" padding="2" borderWidth="1" borderColor="coolGray.500">
            <Box flex="1" justifyContent="center">
              {fetching ? (
                <Skeleton paddingX="1" h="3" />
              ) : (
                <Text>
                  {values?.brokerId}
                </Text>
              )
              }
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
          <Box justifyContent="center" w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
            Phone Number
          </Box>
          <Box justifyContent="center" flex="1" padding="2" borderWidth="1" borderColor="coolGray.500">
            {
              fetching ? (
                <Skeleton paddingX="1" h="3" />
              ) : (
                <Text>
                  {values?.mobile}
                </Text>
              )
            }
          </Box>
        </HStack>
        <HStack>
          <Box justifyContent="center" w="2/5" padding="2" borderWidth="1" borderColor="coolGray.500">
            Current Location
          </Box>
          <Box justifyContent="center" flex="1" padding="2" borderWidth="1" borderColor="coolGray.500">
            {
              fetching ? (
                <Skeleton paddingX="1" h="3" />
              ) : (
                <Text>
                  {values?.dzongkhag}, {values?.gewog}
                </Text>
              )
            }
          </Box>
        </HStack>
        <HStack>
          <Box w="2/5" justifyContent="center" padding="2" borderWidth="1" borderColor="coolGray.500">
            Greenhouses owned
          </Box>
          <Box flex="1" justifyContent="center" padding="2" borderWidth="1" borderColor="coolGray.500">
            {
              fetching ? (
                <Skeleton paddingX="1" h="3" />
              ) : (
                <Text>
                  {values?.greenhouseCount}
                </Text>
              )
            }
          </Box>
        </HStack>
        <HStack>
          <Box w="2/5" justifyContent="center" padding="2" borderWidth="1" borderColor="coolGray.500">
            Irrigation Systems
          </Box>
          <Box flex="1" justifyContent="center" padding="2" borderWidth="1" borderColor="coolGray.500">
            {
              fetching ? (
                <Skeleton paddingX="1" h="3" />
              ) : (
                <Text>
                  {values?.irrigationCount}
                </Text>
              )
            }
          </Box>
        </HStack>
      </VStack>
    </VStack >
  )
}
export default UserProfile;
