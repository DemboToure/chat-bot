import { ChatBot } from "@/components/chatbot/ChatBot";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex ">
      <Sidebar />
      <ChatBot />
    </div>
  );
}
