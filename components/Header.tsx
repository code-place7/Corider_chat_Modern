import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View className="border-b border-gray-200 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-white border-b border-gray-100">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-3">
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">Trip 1</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={22} color="black" />
        </TouchableOpacity>
      </View>

      {/* Trip Details */}
      <View className="bg-white px-4 py-3 border-b border-gray-100 relative">
        <View className="flex-row items-center">
          <View className="mr-3">
            <Image
              source={require("../assets/images/avatar.png")}
              className="w-10 h-10 rounded-full"
            />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text className="text-gray-500 mr-2">From</Text>
              <Text className="font-medium">IGI Airport, T3</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-gray-500 mr-2">To</Text>
              <Text className="font-medium">Sector 28</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setShowMenu(!showMenu)}
            className="p-2"
          >
            <Ionicons name="ellipsis-vertical" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Menu Dropdown */}
        {showMenu && (
          <View className="absolute top-16 right-4 bg-white rounded-lg shadow-md z-10 w-44">
            <TouchableOpacity className="flex-row items-center px-4 py-3">
              <Ionicons name="people-outline" size={18} color="black" />
              <Text className="ml-3">Members</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center px-4 py-3">
              <Ionicons name="call-outline" size={18} color="black" />
              <Text className="ml-3">Share Number</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center px-4 py-3">
              <Ionicons name="flag-outline" size={18} color="black" />
              <Text className="ml-3">Report</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
