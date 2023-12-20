import { Slot } from "expo-router";
import { ScrollView, View } from "native-base";

const NotificationLayout = () => {
  return (
    <ScrollView
      scrollEnabled={true}
      style={{
        marginTop: 10,
      }}
    >
      <Slot />
    </ScrollView>
  );
};

export default NotificationLayout;
