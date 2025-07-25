import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import Header from "../components/Header";

type ChatMessage = {
  id: number;
  message: string;
  sender: {
    name: string;
    self: boolean;
    image: string;
  };
};

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetches chat messages for the current page (initial load or when page changes)
  // Prevents multiple fetch calls by checking if already loading
  // Appends the newly fetched messages to the end of the existing messages array
  const fetchMessages = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://qa.corider.in/assignment/chat?page=${page}`
      );
      const data = await response.json();
      const newMessages = data.chats;
      setMessages((prev) => [...prev, ...newMessages]);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  // Triggered when the user scrolls to the top of the chat list
  // Loads the next page of older messages and appends them to the chat
  // Updates the page number only if new chats are received
  // Prevents overlapping requests using `isLoadingMore`
  const loadMoreChats = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const response = await fetch(
        `https://qa.corider.in/assignment/chat?page=${page + 1}`
      );
      const result = await response.json();
      if (result.chats.length > 0) {
        setMessages((prevChats) => [...prevChats, ...result.chats]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching more chats:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [page]);

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
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
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
      <ChatInput />
    </SafeAreaView>
  );
}
