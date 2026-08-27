import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* index just redirects -> hide from tab bar, keep as the default "/(tabs)" route */}
      <Tabs.Screen name="index" options={{ href: null }} />

      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="gallery" options={{ title: "Gallery" }} />
      <Tabs.Screen name="about" options={{ title: "About Me" }} />

      {/* auth screens exist as routes but shouldn't show up as tabs */}
      <Tabs.Screen name="login" options={{ href: null }} />
      <Tabs.Screen name="signin" options={{ href: null }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}