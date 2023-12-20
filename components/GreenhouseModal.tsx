import CustomModal from "./ui/Modal";
import Icons from "../assets/Icons/Icons";
import { Text, VStack } from "native-base";
import { Pressable } from "react-native";

const GreenhouseModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) => {
  return (
    <CustomModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      modalTitle={"Greenhouse Options"}
    >
      <VStack space={2}>
        <Pressable>
          <Text>Edit</Text>
          <Icons.edit size={32} color="black" />
        </Pressable>
        <Pressable>
          <Text>Delete</Text>
          <Icons.trash size={32} color="black" />
        </Pressable>
      </VStack>
    </CustomModal>
  );
};

export default GreenhouseModal;
