import { AlertDialog, Button } from "native-base";
import { useRef } from "react";
import { useRouter } from "expo-router";
import { View, Text } from "native-base";
import Icons from "../assets/Icons/Icons";

const KillSessionDialog = ({
  ws,
  message,
  dialogVisible,
  setDialogVisible,
}: {
  ws: any;
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
              Disconnect Session
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
              backgroundColor: "red",
            }}
            onPress={() => {
              setDialogVisible(false);
            }}
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "green",
            }}
            onPress={() => {
              ws.disconnect();
              router.replace("/tabs/Home"); setDialogVisible(false);
            }}
          >
            Disconnect
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog >
  );
};

export default KillSessionDialog;
