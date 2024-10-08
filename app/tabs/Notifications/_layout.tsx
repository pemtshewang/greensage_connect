import { Slot } from "expo-router";
import { ScrollView } from "native-base";

const NotificationLayout = () => {
  return (
    <ScrollView
      scrollEnabled={true}
      bg="white"
    >
      <Slot />
    </ScrollView>
  );
};

export default NotificationLayout;
