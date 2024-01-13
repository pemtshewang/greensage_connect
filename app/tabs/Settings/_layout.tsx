import { ScrollView } from "native-base";
import { Slot } from "expo-router";

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
