import "../../styles/pages/contact.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Contact = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const messageInputRef = useRef();
  const [serverMessage, setSeverMessage] = useState("");

  const sendMessageHandler = (e) => {
    e.preventDefault();
    console.log(
      nameInputRef.current.value,
      emailInputRef.current.value,
      messageInputRef.current.value
    );

    // Here if we have validation we apply validation here

    // Send message to backend
    const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/contact`;
    axios
      .post(backendUrl, {
        name: nameInputRef.current.value,
        email: emailInputRef.current.value,
        message: messageInputRef.current.value,
      })
      .then((result) => {
        setSeverMessage("Well done message sent successfully!");
      })
      .catch((error) => {
        setSeverMessage("Sorry something went wrong!");
      });
  };

  return (
    <section className="contact-section-container">
      <div>
        <div id="logo" className="logo">
          <map name="home">
            <area alt="home" title="home" coords="41,39,38" shape="circle" />
          </map>
        </div>
        <ul className="nav-area">
          <li>
            <Link to="/homepage">Home</Link>
          </li>
        </ul>
      </div>
      <div className="contact-section">
        <div className="contact-info">
          <div>
            <i className="fas fa-map-marker-alt"></i>broker, Cairo, Egybt
          </div>
          <div>
            <i className="fas fa-envelope"></i>broker@gmail.com
          </div>
          <div>
            <i className="fas fa-phone"></i>01100000000
          </div>
          <div>
            <i className="fas fa-clock"></i>Sat - Fri 8:00 AM to 5:00 PM
          </div>
        </div>
        <div className="contact-form">
          <h2>Contact Us</h2>
          <div style={{ backgroundColor: "white" }}>
            {serverMessage?.length > 0 ? serverMessage : ""}
          </div>
          <form className="contact" action="" method="post">
            <input
              type="text"
              name="name"
              className="text-box"
              placeholder="Your Name"
              required
              ref={nameInputRef}
            />
            <input
              type="email"
              name="email"
              className="text-box"
              placeholder="Your Email"
              required
              ref={emailInputRef}
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              ref={messageInputRef}
            ></textarea>
            <button
              onClick={sendMessageHandler}
              type="submit"
              name="submit"
              className="send-btn"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
