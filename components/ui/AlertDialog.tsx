import { AlertDialog, Button } from "native-base";
import { useRef } from "react";

const CustomAlertDialog = ({
  isOpen,
  setIsOpen,
  title,
  message,
  setDeleteGreenhouse,
}: {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  title: string;
  message: string;
  setDeleteGreenhouse: (state: boolean) => void;
}) => {
  const cancelRef = useRef(null);
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header
          style={{
            backgroundColor: "green",
          }}
        >
          {title}
        </AlertDialog.Header>
        <AlertDialog.Body>{message}</AlertDialog.Body>
        <AlertDialog.Footer
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Button
            style={{
              backgroundColor: "red",
            }}
            onPress={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onPress={() => {
              setDeleteGreenhouse(true);
              setIsOpen(false);
            }}
            style={{
              backgroundColor: "green",
            }}
          >
            Delete
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
