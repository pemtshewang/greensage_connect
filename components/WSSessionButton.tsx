import Icons from "../assets/Icons/Icons";
import { Pressable } from "react-native";
export default function WSSessionButton({
  setShowDialog,
}: {
  showDialog: boolean;
  setShowDialog: (val: boolean) => void;
  ws: any;
}) {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => {
        setShowDialog(true);
      }}
    >
      <Icons.disconnectSession color="black" size={32} />
    </Pressable>
  );
}
