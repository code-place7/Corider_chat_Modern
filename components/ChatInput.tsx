import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

const ChatInput = () => {
  const [showActionButtons, setShowActionButtons] = useState(false);

  return (
    <View className="bg-white border-t border-gray-100 p-3">
      <View className="flex-row items-center bg-gray-100 rounded-full px-3">
        <TextInput
          className="flex-1 py-2 px-1"
          placeholder="Reply to @Rohit Yadav"
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          className="p-2"
          onPress={() => setShowActionButtons(!showActionButtons)}
        >
          <Ionicons name="attach" size={22} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2 ml-1">
          <View className="bg-green-600 w-8 h-8 rounded-full items-center justify-center">
            <Ionicons name="send" size={16} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      {/* Action Buttons - positioned above the attach icon, only visible when triggered */}
      {showActionButtons && (
        <View className="absolute right-16 bottom-16 z-10">
          <View className="bg-green-600 rounded-full shadow-md flex-row items-center justify-center p-3">
            <TouchableOpacity className="px-2">
              <Ionicons name="camera-outline" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="px-2 mx-2">
              <Ionicons name="videocam-outline" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="px-2">
              <Ionicons name="document-text-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ChatInput;
