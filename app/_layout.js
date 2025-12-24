import { Slot, useRouter, useSegments, useRootNavigationState } from "expo-router";
import { useEffect, useContext, useState } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { View, ActivityIndicator } from "react-native";

function InitialLayout() {
  const { userToken } = useContext(AuthContext);
  const segments = useSegments();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    if (rootNavigationState?.key) {
      setIsNavigationReady(true);
    }
  }, [rootNavigationState]);

  useEffect(() => {
    if (!isNavigationReady) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (userToken && inAuthGroup) {
      router.replace("/(tabs)");
    } else if (!userToken && !inAuthGroup) {
      router.replace("/(auth)/login");
    }
  }, [userToken, segments, isNavigationReady]);

  if (!isNavigationReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
