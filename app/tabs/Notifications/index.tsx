import { useEffect, useState } from "react";
import NotificationContainer from "../../../components/NotificationContainer";
import { useNotificationStore } from "../../../zustand/store";
import NotificationSkeletonContainer from "../../../components/NotificationSkeletonContainer";

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
          <NotificationSkeletonContainer /> :
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
      }
    </>
  );
};

export default Notifications;
