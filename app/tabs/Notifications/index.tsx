import { useEffect, useState } from "react";
import NotificationContainer from "../../../components/NotificationContainer";
import { useNotificationStore } from "../../../zustand/store";
import NotificationSkeletonContainer from "../../../components/NotificationSkeletonContainer";
import { View, Text } from "native-base";
import Icons from "../../../assets/Icons/Icons";

const Notifications = () => {
  const store = useNotificationStore();
  // revesre the notifications array so that the latest notifications are shown first
  const [notifications, setNotifications] = useState([...store.notifications.reverse()]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNotifications(store.notifications);
    setLoading(false);
  }, [store.notifications]);

  return (
    <>
      {
        loading ?
          (
            <>
              <NotificationSkeletonContainer />
              <NotificationSkeletonContainer />
              <NotificationSkeletonContainer />
              <NotificationSkeletonContainer />
              <NotificationSkeletonContainer />
              <NotificationSkeletonContainer />
            </>
          ) :
          notifications.length > 0 ? (
            notifications.map((notification) => {
              return (
                <NotificationContainer
                  key={notification.id}
                  id={notification.id}
                  title={notification.title}
                  message={notification.message}
                  dateTime={notification.dateTime}
                  type={notification.type as string}
                  seen={notification.seen}
                  footer={notification.footer}
                />
              );
            })
          ) : (
            <View flex="1" alignItems="center" justifyContent="center" mt="48" style={{
              gap: 4
            }}>
              <Icons.notification color="#a0a0a0" />
              <Text color="#a0a0a0" fontFamily="OpenSans">No notifications have been recieved</Text>
            </View>
          )
      }
    </>
  );
};

export default Notifications;
