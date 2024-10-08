import { AlertDialog, Button } from "native-base";
import { useRef } from "react";
import { useRouter } from "expo-router";
import { View, Text } from "native-base";
import Icons from "../assets/Icons/Icons";

const WSDisconnectDialogBox = ({
  title,
  message,
  dialogVisible,
  setDialogVisible,
}: {
  title: string;
  message: string;
  dialogVisible: boolean;
  setDialogVisible: (val: boolean) => void;
}) => {
  const cancelRef = useRef(null);
  const router = useRouter();
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={dialogVisible}
      onClose={() => {
        setDialogVisible(false);
      }}
    >
      <AlertDialog.Content>
        <AlertDialog.Header
          style={{
            backgroundColor: "green",
          }}
        >
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
            <Text>
              {title}
            </Text>
            <Icons.disconnectSession color="black" />
          </View>
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
              backgroundColor: "green",
            }}
            onPress={() => {
              router.replace("/tabs/Home"); setDialogVisible(false);
            }}
          >
            OK
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog >
  );
};

export default WSDisconnectDialogBox;
