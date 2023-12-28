import { AlertDialog, Button } from "native-base";
import { useRef } from "react";
import { useRouter } from "expo-router";

const WSDisconnectDialogBox = ({
  isOpen,
  setIsOpen,
  title,
  message,
}: {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  title: string;
  message: string;
  setDeleteGreenhouse: (state: boolean) => void;
}) => {
  const cancelRef = useRef(null);
  const router = useRouter();
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
            flexDirection: "row-reverse",
            gap: 10,
          }}
        >
          <Button
            style={{
              backgroundColor: "green",
            }}
            onPress={() => {
              setIsOpen(false);
              router.replace("/tabs/Home");
            }}
          >
            OK
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default WSDisconnectDialogBox;
