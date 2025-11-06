import React from "react";
import "../../index.css";
import AddCommentIcon from "@mui/icons-material/AddCommentOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Tooltip from "@mui/material/Tooltip";
import SearchBar from "./SearchBar";
import ChatItem from "./ChatItem";
import { Link } from "react-router-dom";

function MobileChatlist() {
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex justify-between mt-5 ">
        <div className="ml-5">
          <h1 className="text-2xl font-SourceCode text-green-800">UniChat</h1>
        </div>
        <div className="flex gap-10 px-5">
          <div>
            <Tooltip title="New Chat" placement="top" arrow>
              <button>
                <AddCommentIcon className=" transform rotate-180" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Menu" placement="top" arrow>
              <button>
                <MoreVertIcon />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3">
        <SearchBar />
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-start gap-3 px-3 py-1">
        <button className=" text-gray-800 font-light border border-gray-300  rounded-2xl px-4 py-1 hover:bg-gray-100 transition duration-200">
          All
        </button>
        <button className=" text-gray-800 font-light border border-gray-300  rounded-2xl px-4 py-1 hover:bg-gray-100 transition duration-200">
          Unread
        </button>
        <button className=" text-gray-800 font-light border border-gray-300  rounded-2xl px-4 py-1 hover:bg-gray-100 transition duration-200">
          Favourite
        </button>
        <button className=" text-gray-800 font-light border border-gray-300   rounded-2xl px-4 py-1 hover:bg-gray-100 transition duration-200">
          Groups
        </button>
      </div>

      {/* Scrollable Chat List */}
      <div className="flex-1 overflow-y-auto" >
        <Link to="/chatwindow">
          <ChatItem />
        </Link>
      </div>
    </div>
  );
}

export default MobileChatlist;
