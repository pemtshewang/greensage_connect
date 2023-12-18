import { Modal } from "native-base";
import { Text } from "native-base";

const CustomModal = ({
  modalVisible,
  setModalVisible,
  children,
  modalTitle,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  modalTitle: string;
  children: React.ReactNode;
}) => {

  return (
    <Modal
      isOpen={modalVisible}
      onClose={() => setModalVisible(false)}
      avoidKeyboard
      justifyContent="center"
      bottom="4"
      h="full"
      w="container"
      size="lg"
      padding={0}
    >
      <Modal.Content>
        <Modal.CloseButton
          style={{
            backgroundColor: "white",
          }}
        />
        <Modal.Header
          style={{
            backgroundColor: "green",
          }}
        >
          <Text color="white" fontWeight="bold" fontSize="md">
            {modalTitle}
          </Text>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default CustomModal;
