import React from "react";
import Sidebar from "../../components/sidebar/sidebar.tsx";
import ChatLists from "../../components/chatsList/ChatLists.jsx";
import ChatWindow from "../../components/chatWindow/ChatWindow.jsx";
import MobileChatlist from "../../components/chatsList/mobileChatlist.jsx";

function Home() {
  return (
    <div className="h-screen w-full flex flex-col lg:flex-row">
      {/* Desktop & large tablet layout */}
      <div className="hidden lg:flex w-full">
        <div className="w-1/18">
          <Sidebar />
        </div>
        <div className="w-5/18 border-r border-gray-200">
          <ChatLists />
        </div>
        <div className="w-12/18">
          <ChatWindow />
        </div>
      </div>

      {/* Tablet layout */}
      <div className="hidden md:flex lg:hidden w-full">
        <div className="w-1/12">
          <Sidebar />
        </div>
        <div className="w-11/12">
          <MobileChatlist />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex sm:flex md:hidden w-full gap-5">
        <div className="flex-none w-1/12">
          <Sidebar />
        </div>
        <div className="flex-1">
          <MobileChatlist />
        </div>
      </div>
    </div>
  );
}

export default Home;
