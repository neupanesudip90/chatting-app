import React from 'react'
import profile from '../../assets/profile/profile.jpeg'


function ChatItem() {
    return (
      <div className="flex flex-col">
        <div className="flex items-center gap-4 mx-2 rounded-md my-2 p-1 hover:bg-gray-100 cursor-pointer">
          <div>
            <img
              src={profile}
              alt="profile"
              className="rounded-[50%] h-14 w-14 object-cover"
            />
          </div>
          <div>
            <span className=" text-md ">Global Chat Room</span>
            <br />
            <span className="text-gray-600 ">Hey! How are you?</span>
          </div>
        </div>
      </div>
    );
}

export default ChatItem
