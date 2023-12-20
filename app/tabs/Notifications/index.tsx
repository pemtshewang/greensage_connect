import { useState } from "react";
import NotificationContainer from "../../../components/NotificationContainer";
import { View } from "native-base";

const Notifications = () => {
  return (
    <View style={{
        flexDirection: "column",
        gap: 12,
        marginLeft: 5
    }}>
      <NotificationContainer
        message="Lets go"
        name="ui"
        title="lets go"
        type="humidity"
        dateTime={new Date()}
      />
      <NotificationContainer
        message="Lets go"
        name="ui"
        title="lets go"
        type="temperature"
        dateTime={new Date()}
      />
      <NotificationContainer
        message="Lets go"
        name="ui"
        title="lets go"
        type="temperature"
        dateTime={new Date()}
      />
      <NotificationContainer
        message="Lets go"
        name="ui"
        title="lets go"
        type="humidity"
        dateTime={new Date()}
      />
    </View>
  );
};

export default Notifications;
