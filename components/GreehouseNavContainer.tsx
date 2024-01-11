import { Pressable } from "react-native";
import { View, Image, Text } from "native-base";
import { Divider } from "native-base";
import Icons from "../assets/Icons/Icons";
import { useDisclose } from "native-base";
import CustomActionSheet from "./ui/ActionSheet";
import { Actionsheet } from "native-base";
import { useEffect, useState } from "react";
import CustomAlertDialog from "./ui/AlertDialog";
import WSTestConnectionForm from "./Forms/WebSocketConnectionTest";
import { useGreenhouseStore } from "../zustand/store";
import { useRouter } from "expo-router";
import IrrigationWSTestConnectionForm from "./Forms/WSConnectionIrrigationTest";

const GreenhouseNavContainer = ({
  id,
  name,
  imageUrl,
  removeGreenhouse,
  type
}: {
  id: string;
  name: string;
  type: "greenhouse" | "irrigation";
  imageUrl: string;
  removeGreenhouse: (id: string) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [alertDialog, setAlertDialogOpen] = useState<boolean>(false);
  const [removeGreenhouseConfirm, setRemoveGreenhouseConfirm] = useState<boolean>(false);
  const [showWSForm, setShowWSForm] = useState<boolean>(false);

  useEffect(() => {
    if (removeGreenhouseConfirm) {
      removeGreenhouse(id);
    }
  }, [removeGreenhouseConfirm]);
  return (
    <View
      style={{
        width: "100%",
        borderRadius: 9,
        backgroundColor: "white", // Card background color
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,
        marginVertical: 10,
      }}
    >
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
            padding: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "darkgreen",
              flexDirection: "column",
              justifyContent: "center",
              padding: 5,
              borderRadius: 99,
              borderEndEndRadius: 999,
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
              // if (greenhouse?.isConnected) {
              // router.replace(`/tabs/Home/Greenhouse/${id}`);
              // } else {
              setShowWSForm(true);
              // }
            }}
          >
            <Icons.enter color="black" />
          </Pressable>
        </View>
        {
          type === "greenhouse" ? (
            <WSTestConnectionForm
              id={id}
              showForm={showWSForm}
              setShowForm={setShowWSForm}
            />) : (
            <IrrigationWSTestConnectionForm
              id={id}
              showForm={showWSForm}
              setShowForm={setShowWSForm}
            />
          )
        }
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
          title={`Remove ${type}`}
          isOpen={alertDialog}
          message={`Are you sure you want to remove ${name}?`}
          setIsOpen={setAlertDialogOpen}
          setDeleteGreenhouse={setRemoveGreenhouseConfirm}
        />
      </View>
    </View>
  );
};
export default GreenhouseNavContainer;
