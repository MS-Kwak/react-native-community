import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/api/queryClient';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as Notifications from 'expo-notifications';
import useNotificationObserver from '@/hooks/useNotificationObserver';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { getLocales } from 'expo-localization';
import { resources } from '@/i18n/resources';
import { getSecureStore } from '@/utils/secureStore';
import Constants from 'expo-constants';

SplashScreen.preventAutoHideAsync();

// Expo Go에서는 expo-notifications가 작동하지 않으므로 조건부로 설정
if (Constants.appOwnership !== 'expo') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ActionSheetProvider>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
        <Toast />
      </QueryClientProvider>
    </ActionSheetProvider>
  );
}

const deviceLanguage = getLocales()[0].languageCode ?? 'ko';

i18n.use(initReactI18next).init({
  resources: resources,
  lng: deviceLanguage,
  fallbackLng: 'ko-Kr',
});

function RootNavigator() {
  const { t } = useTranslation();
  const { auth } = useAuth();

  // Expo Go가 아닐 때만 notification observer 활성화
  const isNotExpoGo = Constants.appOwnership !== 'expo';
  useNotificationObserver(isNotExpoGo);

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage =
        (await getSecureStore('language')) ?? deviceLanguage;
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  useEffect(() => {
    auth.id &&
      Toast.show({
        type: 'success',
        text1: t('Welcome Message', {
          nickname: auth.nickname ?? '회원',
        }),
      });
  }, [auth.id]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="post" options={{ headerShown: false }} />
      <Stack.Screen name="image" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
