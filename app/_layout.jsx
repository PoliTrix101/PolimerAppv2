import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AuthProvider, useAuth } from "../context/AuthContext";

function MainLayout() {
  const { isLogin } = useAuth();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {!isLogin ? (
          <>
            <Stack.Screen name="login" />
            <Stack.Screen name="signin" />
            <Stack.Screen name="signup" />
          </>
        ) : (
          <Stack.Screen name="(tabs)" />
        )}
      </Stack>

      <StatusBar style="auto" />
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}