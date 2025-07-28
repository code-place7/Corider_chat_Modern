import React from "react";
import { Image, Text, View } from "react-native";

// Define the ChatMessage type
type ChatMessage = {
  id: string;
  message: string;
  sender: {
    self: boolean;
    image: string;
    name: string;
  };
};

// Define props type that matches what the component actually uses
type ChatBubbleProps = Pick<ChatMessage, "message" | "sender">;

// React.memo for performance (prevents unnecessary re-renders)
const ChatBubble = React.memo(
  ({
    message,
    isMe,
    image,
  }: {
    message: string;
    isMe: boolean;
    image: string;
  }) => {
    return (
      <View
        className={`my-1 flex-row ${isMe ? "justify-end" : "justify-start"}`}
      >
        {!isMe && (
          <Image
            source={{ uri: image }}
            className="w-8 h-8 rounded-full mr-2 self-end"
          />
        )}
        <View
          className={`rounded-xl px-4 py-2 max-w-[75%] ${
            isMe ? "bg-blue-500 self-end" : "bg-gray-100"
          }`}
        >
          <Text className={`${isMe ? "text-white" : "text-black"}`}>
            {message}
          </Text>
        </View>
      </View>
    );
  }
);

// Optional: improve React DevTools readability
ChatBubble.displayName = "ChatBubble";

export default ChatBubble;
