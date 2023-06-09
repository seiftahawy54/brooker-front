import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import authState from "../../store/auth-state.jsx";
import axios from "axios";
import { useParams } from "react-router";
import "../../styles/pages/chatpage.css";

const Chat = () => {
  const authContext = useContext(authState);
  const { otherUser } = useParams();
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
            console.log(`Chat id ===> `, result.data.chat._id);
            console.log(
              `Users IDs ===> `,
              otherUser,
              authContext.userData.data.id
            );

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
  }, [authContext.isLoggedIn]);

  useEffect(() => {
    if (authContext.isLoggedIn) {
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
      <ol className="chat">
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

  /* return (
    <div className={"container-fluid"}>
      <h2 className="h1">Messages</h2>
      <hr />
      <div className={"messages-container"}>
        {messages.length === 0 ? (
          <div>You can start with chat</div>
        ) : (
          messages?.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === authContext?.userData?.data?.id
                  ? "right"
                  : "left"
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
  ); */
};

export default Chat;
