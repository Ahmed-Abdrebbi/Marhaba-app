import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import useAuthStore from '../store/useAuthStore';

export default function RootLayout() {
  const { isAuthenticated, isLoading, restoreSession } = useAuthStore();
  const segments = useSegments(); // Tells us which folder we are currently in
  const router = useRouter();

  // 1. Check for a saved session the exact moment the app opens
  useEffect(() => {
    restoreSession();
  }, []);

  // 2. The Security Guard
  useEffect(() => {
    if (isLoading) return; // Wait until session restoration is complete

    // Are we inside the "(auth)" folder (login/register)?
    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // If the user is NOT logged in and tries to access a protected page, kick them to login
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      // If the user IS logged in and tries to view the login page, send them to home
      router.replace('/(app)/home');
    }
  }, [isAuthenticated, isLoading, segments]);

  // 3. The Splash / Loading Screen
  // This prevents the user from seeing a "flash" of the login screen while the app is checking their token
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        {/* Using the L'ÉLITE purple brand color for the spinner */}
        <ActivityIndicator size="large" color="#A855F7" />
      </View>
    );
  }

  // 4. Render the App
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0B0F19', // The dark background of your app
    justifyContent: 'center',
    alignItems: 'center',
  },
});