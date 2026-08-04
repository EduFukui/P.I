import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="terms" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />

      <Stack.Screen
        name="(tabs)"
        options={{
          gestureEnabled: false,
        }}
      />

      <Stack.Screen name="profile" />
      <Stack.Screen name="report/[id]" />
      <Stack.Screen name="report/edit" />
    </Stack>
  );
}