import { ScrollView } from "native-base";
import { Slot } from "expo-router";

const NotificationLayout = () => {
  return (
    <ScrollView
      style={{
        marginTop: 10,
      }}
    >
      <Slot />
    </ScrollView>
  );
};

export default NotificationLayout;
