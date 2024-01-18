import { useClipboard, Center, Button, AlertDialog } from 'native-base';
import { useRef, useState } from 'react';

const IDAlertDialog = ({
  id,
  isOpen,
  setIsOpen
}: {
  id: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const {
    value,
    onCopy
  } = useClipboard();
  return <Center>
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header bg="green">Topic ID generated for greenhouse</AlertDialog.Header>
        <AlertDialog.Body>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
              Cancel
            </Button>
            <Button colorScheme="danger" onPress={onClose}>
              Delete
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  </Center>;
};
export default IDAlertDialog;
