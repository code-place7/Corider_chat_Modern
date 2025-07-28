import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import Header from "../components/Header";

type ChatMessage = {
  id: string;
  message: string;
  sender: {
    self: boolean;
    image: string;
    name: string;
  };
};

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initial fetch (only page 0)
  useEffect(() => {
    const fetchInitialMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://qa.corider.in/assignment/chat?page=0"
        );
        setMessages(res.data.chats);
      } catch (err) {
        console.error("Initial fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialMessages();
  }, []);

  // Load more messages
  const loadMoreChats = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const res = await axios.get(
        `https://qa.corider.in/assignment/chat?page=${page + 1}`
      );
      if (res.data.chats.length > 0) {
        setMessages((prev) => [...prev, ...res.data.chats]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error loading more chats", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Renders each chat item using the ChatBubble component doing this way beacuse chat list was taking too long to render
  const renderChatItem = ({ item }: { item: ChatMessage }) => (
    <ChatBubble
      message={item.message}
      isMe={item.sender.self}
      image={item.sender.image}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          className="flex-1 justify-center items-center"
        />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          inverted
          onEndReached={loadMoreChats}
          onEndReachedThreshold={0.5}
          renderItem={renderChatItem}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={5}
          ListFooterComponent={
            isLoadingMore ? (
              <ActivityIndicator size="small" color="#999" className="my-2" />
            ) : null
          }
        />
      )}
      <ChatInput />
    </SafeAreaView>
  );
}
