import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const sendOrderNotification = async (title, body) => {
  if (Platform.OS === 'web') {
    console.log(`Notificação Web: ${title} - ${body}`);
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { data: 'goes here' },
    },
    trigger: null,
  });
};