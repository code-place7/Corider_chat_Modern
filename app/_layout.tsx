import SafeScreen from "@/components/SafeScreen";
import { Slot } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeScreen>
      <Slot />
    </SafeScreen>
  );
}
