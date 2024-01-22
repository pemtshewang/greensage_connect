import { useEffect, useState } from "react";
import NotificationContainer from "../../../components/NotificationContainer";
import { Button, ScrollView, Spinner } from "native-base";
import { useNotificationStore } from "../../../zustand/store";

const Notifications = () => {
  const store = useNotificationStore();
  const [notifications, setNotifications] = useState(store.notifications);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching notifications)
    const fetchData = async () => {
      setNotifications(store.notifications);
      setLoading(false);
    };
    // Mark all notifications as seen after 5 seconds
    const markAsSeenTimer = setTimeout(() => {
      store.markAllUnseenNotificationsAsSeen();
    }, 5000);
    fetchData();
    // Clear the timer if the component unmounts or the dependencies change
    return () => clearTimeout(markAsSeenTimer);
  }, [store.notifications]);


  if (loading) {
    return <Spinner color="blue" />;
  }

  return (
    <ScrollView>
      {notifications.map((notification) => (
        <NotificationContainer
          key={notification.id}
          id={notification.id}
          name={notification.name}
          title={notification.title}
          message={notification.message}
          dateTime={notification.dateTime}
          type={notification.type}
          seen={notification.seen}
        />
      ))}
    </ScrollView>
  );
};

export default Notifications;
