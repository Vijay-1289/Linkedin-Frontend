
import { useState } from "react";
import { Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  content: string;
  sender: string;
  timestamp: string;
  isMe: boolean;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  unread: number;
}

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const chats: Chat[] = [
    {
      id: 1,
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      lastMessage: "Sure, let's catch up soon!",
      unread: 2,
    },
    {
      id: 2,
      name: "Emily Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      lastMessage: "The project looks amazing! 🎨",
      unread: 0,
    },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedChat) {
      const newMessage: Message = {
        id: messages.length + 1,
        content: messageInput,
        sender: "You",
        timestamp: new Date().toLocaleTimeString(),
        isMe: true,
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20 px-4 max-w-6xl mx-auto">
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-120px)]">
            {/* Chat List */}
            <div className="border-r">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold">Messages</h2>
              </div>
              <div className="overflow-y-auto h-[calc(100%-70px)]">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer ${
                      selectedChat?.id === chat.id ? "bg-gray-50" : ""
                    }`}
                  >
                    <Avatar>
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">{chat.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <span className="bg-rose-500 text-white text-xs px-2 py-1 rounded-full">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            <div className="col-span-2 flex flex-col">
              {selectedChat ? (
                <>
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                        <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
                      </Avatar>
                      <h2 className="font-medium">{selectedChat.name}</h2>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.isMe
                              ? "bg-rose-500 text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p>{message.content}</p>
                          <span className="text-xs opacity-75 mt-1 block">
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Type a message..."
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a chat to start messaging
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
