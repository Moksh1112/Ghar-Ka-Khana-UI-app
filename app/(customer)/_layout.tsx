import { Stack } from 'expo-router';

export default function CustomerStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="order-status" />
      <Stack.Screen name="provider/[id]" />
    </Stack>
  );
}
