import { useDisclose } from "native-base";
import { Center, Actionsheet, Box, Button, Text } from "native-base";
import { Path } from "react-native-svg";
import Icons from "../../assets/Icons/Icons";

const CustomActionSheet = ({
  isOpen,
  onOpen,
  onClose,
  title,
  children
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  title: string;
  children: React.ReactNode
}) => {
  return (
    <Center>
      <Actionsheet  isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: "gray.300",
              }}
            >
                {title}
            </Text>
          </Box>
          {children}
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};

export default CustomActionSheet;
