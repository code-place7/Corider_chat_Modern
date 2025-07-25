import React from "react";
import { Image, Text, View } from "react-native";

//wrapping the component with React.memo to prevent unnecessary re-renders
// This is useful because component receives props that don't change often
const ChatBubble = React.memo(({ message, isMe, image }: any) => {
  return (
    // Outer container with vertical margin and horizontal alignment
    <View className={`my-1 flex-row ${isMe ? "justify-end" : "justify-start"}`}>
      {/* Show avatar only if the message is NOT from me */}
      {!isMe && (
        <Image
          source={{ uri: image }}
          // Fake avatar image
          className="w-8 h-8 rounded-full mr-2 self-end"
        />
      )}

      {/* Message bubble container */}
      <View
        className={`
          rounded-xl px-4 py-2 max-w-[75%]
          ${isMe ? "bg-blue-500 self-end" : "bg-gray-100"}
        `}
      >
        {/* Message text */}
        <Text className={`${isMe ? "text-white" : "text-black"}`}>
          {message}
        </Text>
      </View>
    </View>
  );
});

export default ChatBubble;
