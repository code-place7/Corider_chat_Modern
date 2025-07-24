import ChatInput from "@/components/ChatInput";
import Header from "@/components/Header";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 ">
      <Header />
      <ChatInput />
    </View>
  );
}
