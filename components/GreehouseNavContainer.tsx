import { Pressable } from "react-native";
import { View, Image, Text } from "native-base";
import { Divider } from "native-base";
import Icons from "../assets/Icons/Icons";
import { useDisclose } from "native-base";
import CustomActionSheet from "./ui/ActionSheet";
import { Actionsheet } from "native-base";
import { useEffect, useState } from "react";
import CustomAlertDialog from "./ui/AlertDialog";
import { useRouter } from "expo-router";

const GreenhouseNavContainer = ({
  id,
  name,
  imageUrl,
  removeGreenhouse,
}: {
  id: string;
  name: string;
  imageUrl: string;
  removeGreenhouse: (id: string) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [alertDialog, setAlertDialogOpen] = useState(false);
  const [removeGreenhouseConfirm, setRemoveGreenhouseConfirm] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (removeGreenhouseConfirm) {
      removeGreenhouse(id);
    }
  }, [removeGreenhouseConfirm]);
  return (
    <>
      <View
        style={{
          width: "100%",
          height: 150,
          borderRadius: 9,
        }}
      >
        <Image
          alt="Selected Image"
          source={{ uri: imageUrl }}
          style={{
            width: "100%",
            height: 150,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      </View>
      <Pressable
        style={{
          position: "absolute",
          right: 0,
          backgroundColor: "green",
          padding: 3,
          borderRadius: 50,
          marginTop: 3,
          marginRight: 3,
        }}
        onPress={onOpen}
      >
        <Icons.action size={32} color="black" />
      </Pressable>
      <Divider height="px" backgroundColor={"black"} />
      <View
        style={{
          alignContent: "center",
          backgroundColor: "green",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 5,
          }}
        >
          <View
            style={{
              backgroundColor: "darkgreen",
              flexDirection: "column",
              justifyContent: "center",
              padding: 5,
              borderRadius: 99,
            }}
          >
            <Text color="white" backgroundColor="white">
              {name}
            </Text>
          </View>
          <Pressable
            style={{
              borderWidth: 2,
              padding: 5,
              borderRadius: 99,
            }}
            onPress={() => {
              router.push(`/tabs/Home/Greenhouse/${id}`)
            }}
          >
            <Icons.enter color="black" />
          </Pressable>
        </View>
        <CustomActionSheet
          onClose={onClose}
          onOpen={onOpen}
          isOpen={isOpen}
          title={name}
        >
          <Actionsheet.Item startIcon={<Icons.edit color="black" size={32} />}>
            Edit
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              setAlertDialogOpen(true);
              onClose();
            }}
            startIcon={<Icons.trash color="black" size={32} />}
          >
            Remove
          </Actionsheet.Item>
        </CustomActionSheet>
        <CustomAlertDialog
          title={"Remove Greenhouse"}
          isOpen={alertDialog}
          message={`Are you sure you want to remove ${name}?`}
          setIsOpen={setAlertDialogOpen}
          setDeleteGreenhouse={setRemoveGreenhouseConfirm}
        />
      </View>
    </>
  );
};
export default GreenhouseNavContainer;
