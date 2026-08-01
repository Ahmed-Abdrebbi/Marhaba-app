import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import useAuthStore from '../store/useAuthStore';

export default function RootLayout() {
  const { isAuthenticated, isLoading, restoreSession } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  
  useEffect(() => {
    restoreSession();
  }, []);

  
  useEffect(() => {
    if (isLoading) return; 

    
    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      
      router.replace('/(auth)/welcome');
    } else if (isAuthenticated && inAuthGroup) {
    
      router.replace('/(app)/home');
    }
  }, [isAuthenticated, isLoading, segments]);


  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        { }
        <ActivityIndicator size="large" color="#A855F7" />
      </View>
    );
  }


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
    backgroundColor: '#0B0F19', 
    justifyContent: 'center',
    alignItems: 'center',
  },
});