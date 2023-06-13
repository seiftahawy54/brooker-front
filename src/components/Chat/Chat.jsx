import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import authState from "../../store/auth-state.jsx";
import axios from "axios";
import { useParams } from "react-router";
import "../../styles/pages/chatpage.css";

const Chat = (props) => {
  const authContext = useContext(authState);
  const otherUser = props.otherUserId;
  console.log(otherUser)
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketConnection, setSocketConnection] = useState({});
  const messageInputRef = useRef();

  useEffect(() => {
    if (authContext.isLoggedIn) {
      const socketToken = `${authContext?.userData?.token}`;
      const socket = io(`${import.meta.env.VITE_SOCKETS_URL}/chats`, {
        extraHeaders: {
          auth: socketToken,
        },
      });

      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/chats/${otherUser}`)
        .then((result) => {
          if (result.status === 200) {
            setSocketConnection(socket);
            setMessages(result.data.chat.messages);
            setChatId(result.data.chat._id);
            console.log(socket);

            socket.emit("joinChat", {
              chatId: result.data.chat._id,
            });
          }
        })
        .catch(console.error);

      socket.on("connect", () => {
        console.log("connected");
      });
    }
  }, [otherUser]);

  useEffect(() => {
    if (Object.keys(socketConnection).length > 0) {
      socketConnection?.on("sendMessage", ({ content }) => {
        const receivedMsgObj = {
          receiver: content.otherUserId,
          text: content.message,
          sender: authContext.userData.data.id,
        };

        console.log(`newMsgObj`, receivedMsgObj);
        setMessages([...messages, { ...receivedMsgObj }]);
        console.log(`new messages ===> `, content);
      });
    }
  }, [socketConnection, messages]);

  const sendMessageHandler = () => {
    const message = messageInputRef.current.value;
    socketConnection.emit("sendMessage", {
      to: otherUser,
      content: {
        chatId,
        otherUserId: otherUser,
        message,
      },
    });
    setMessages([
      ...messages,
      {
        sender: authContext?.userData?.data?.id,
        receiver: otherUser,
        text: message,
      },
    ]);
    messageInputRef.current.value = "";
  };

  return (
    <>
      <ol className="chat w-100">
        {messages.length === 0 ? (
          <div>You can start chatting by sending a message to other user!</div>
        ) : (
          messages.map((msg, index) => (
            <li
              className={
                msg.sender === authContext?.userData?.data?.id
                  ? "other"
                  : "self"
              }
            >
              <div className="msg">{msg.text}</div>
            </li>
          ))
        )}
      </ol>
      <div className="typezone">
        <form>
          <textarea
            type="text"
            placeholder="Say something"
            ref={messageInputRef}
          ></textarea>
          <button type="submit" className="send" onClick={sendMessageHandler}>
            Send Message
          </button>
        </form>
        <div className="emojis"></div>
      </div>
    </>
  );

};

export default Chat;
