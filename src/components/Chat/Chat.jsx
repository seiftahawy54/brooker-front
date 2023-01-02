import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import authState from "../../store/auth-state.jsx";
import axios from "axios";
import { useParams } from "react-router";

const Chat = () => {
  const authContext = useContext(authState);
  const { otherUser } = useParams();
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketConnection, setSocketConnection] = useState({});
  const messageInputRef = useRef();

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_SOCKETS_URL}/chats`, {
      extraHeaders: {
        auth: `Bearer ${authContext.userData.token}`,
      },
    });

    console.log(socket);

    socket.on("connect", (e) => {
      console.log(e);
      console.log("connected");
    });

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/chats/${otherUser}`)
      .then((result) => {
        if (result.status === 200) {
          setMessages(result.data.chat.messages);
          setChatId(result.data.chat._id);
          console.log(`Chat id ===> `, result.data.chat._id);
          console.log(
            `Users IDs ===> `,
            otherUser,
            authContext.userData.data.id
          );
        }
      })
      .catch(console.error);
  }, []);

  const sendMessageHandler = () => {
    console.log(socketConnection);
    /*const message = messageInputRef.current.value;
    socketConnection.emit("sendMessage", {
      chatId,
      otherUser,
      text: message,
    });*/
  };

  return (
    <div className={"container-fluid"}>
      <h2 className="h1">Messages</h2>
      <hr />
      <div className={"messages-container"}>
        {messages.length === 0 ? (
          <div>You can start with chat</div>
        ) : (
          messages?.map((msg) => (
            <div
              className={
                msg.sender === authContext.userData.data.id ? "right" : "left"
              }
            >
              {msg.text}
            </div>
          ))
        )}
      </div>
      <div>
        <input
          type="text"
          placeholder={"Write message"}
          ref={messageInputRef}
        />{" "}
        <button className={"btn"} onClick={sendMessageHandler}>
          send message
        </button>
      </div>
    </div>
  );
};

export default Chat;
