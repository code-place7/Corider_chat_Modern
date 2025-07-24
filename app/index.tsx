import { FlatList, SafeAreaView } from "react-native";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import Header from "../components/Header";

export default function App() {
  const messages = [
    {
      id: "1",
      sender: "Rohit Yadav",
      message: "Connect with fellow travelers...",
      isMe: false,
    },
    {
      id: "2",
      sender: "You",
      message: "Connect with fellow travelers...",
      isMe: true,
    },
    {
      id: "3",
      sender: "Aliya",
      message: "Connect with fellow travelers...",
      isMe: false,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <FlatList
        className="px-4"
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatBubble {...item} />}
      />
      <ChatInput />
    </SafeAreaView>
  );
}
