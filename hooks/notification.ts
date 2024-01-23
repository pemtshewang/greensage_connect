import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';

export function useLocalNotification() {
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);

  useEffect(() => {
    const setupNotifications = async () => {
      // Request permission to receive notifications (iOS only)
      const { status } = await Notifications.requestPermissionsAsync();

      if (status === 'granted') {
        // Listener for incoming notifications when the app is in the foreground
        const foregroundListener = Notifications.addNotificationReceivedListener((incomingNotification) => {
          setNotification(incomingNotification);
        });

        // Listener for tapping on a notification when the app is in the background or closed
        const backgroundListener = Notifications.addNotificationResponseReceivedListener((response) => {
          // Handle the tapped notification here if needed
        });

        return () => {
          // Clean up listeners when the component unmounts
          Notifications.removeNotificationSubscription(foregroundListener);
          Notifications.removeNotificationSubscription(backgroundListener);
        };
      }
    };

    setupNotifications();
  }, []);

  // Function to schedule a local notification
  const scheduleNotification = async (notification: Notifications.NotificationRequestInput) => {
    await Notifications.scheduleNotificationAsync(notification);
  };

  const clearNotification = async ({ identifier }: {
    identifier: string
  }) => {
    await Notifications.cancelScheduledNotificationAsync(identifier);
  }

  const makeInstantNotification = async (notification: Notifications.NotificationContentInput) => {
    await Notifications.presentNotificationAsync(notification);
  }

  return {
    notification,
    scheduleNotification,
    clearNotification,
    makeInstantNotification
  };
}
