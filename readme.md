# 💬 MERN Chat App (Real-time Messaging with Socket.io)

A full-stack **real-time chat application** built using the **MERN stack (MongoDB, Express, React, Node.js)** with **Socket.io** for live messaging.  
Users can **register**, **log in**, and **chat in a global chat room** with messages stored in the database and updated in real-time.

---

## 🚀 Features

- 🔐 User authentication (login/register using cookies)
- 💬 Real-time global chat using **Socket.io**
- 🗨️ Messages are persisted in **MongoDB**
- 👥 Live count of **active users online**
- 🕒 Automatic timestamp for each message
- 📱 Responsive UI for **mobile and desktop**
- ⚡ Instant message delivery (no page reload)
- 🌈 Built with modern **React + Redux Toolkit**

---

## 🛠️ Tech Stack

### **Frontend**
- React.js
- Redux Toolkit
- Tailwind CSS
- Socket.io-client
- Material UI Icons

### **Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io
- Cookie-parser
- CORS
- dotenv

---

## 📂 Project Structure
```bash
Message-App/
│
├── Backend/
│ ├── app.js
│ ├── server.js
│ ├── model/
│ │ ├── messageModel.js
│ │ └── userModel.js
│ ├── routes/
│ └── controllers/
│ │    ├── authController.js
│ │    └── messageController.js
│ └── config
│ │   └── db.js
│ └── middleware/
|
├── Frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── ChatWindow.jsx
│ │ │ ├── Sidebar.jsx
│ │ │ └── MobileChatList.jsx
│ │ ├── redux/
│ │ │ ├── authSlice.js
│ │ │ ├── messageSlice.js
│ │ │ └── store.js
│ │ ├── pages/
│ │ │ ├── Login.jsx
│ │ │ ├── Register.jsx
│ │ │ └── Home.jsx
│ │ ├── assets/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
│
├── .env
└── README.md
```
---

## ⚙️ Setup and Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/mern-chat-app.git
cd Message-App
```
### 2️⃣ Backend Setup
```bash
cd Backend
npm install
```

create a `.env` file in the `Backend` folder with the following variables:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

### 3️⃣ Frontend Setup
```bash
cd ../Frontend
npm install
```
### 4️⃣ Running the Application
#### Start the Backend server
```bash
cd ../Backend
npm run dev
```
#### Start the Frontend development server
```bash
cd ../Frontend
npm run dev
```
The frontend will be available at `http://localhost:5173` and the backend server at `http://localhost:5000`.

Realtime socket connection will be established between frontend and backend for live chat functionality.
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

frontend connects via:

const socket = io("http://localhost:5000", { transports: ["websocket"] });

How it works:
1. The frontend establishes a connection to the backend Socket.io server.
2. The backend listens for incoming socket connections and emits events to connected clients.
3. When a user sends a message, the frontend emits a socket event to the backend.
4. The backend receives the message, saves it to the database, and broadcasts it to all connected clients.
5. The frontend listens for incoming messages and updates the chat UI in real-time.

### 🧠 Common Issues
-❌ Active user count not updating correctly?


### 📸 UI Overview:
 - 💬 Chat Window: Real-time message list with scroll
 - 👤 Sidebar: Displays chatrooms or user info
 - 📱 Mobile Layout: Responsive with hidden sidebar and smooth transitions


### 🧾 License

- This project is open-source and available under the MIT License.

- Happy Coding! 🚀
