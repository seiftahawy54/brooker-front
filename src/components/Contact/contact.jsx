import "../../styles/pages/contact.css";
import { Link } from "react-router-dom";

const Contact = () => {
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
          <form className="contact" action="" method="post">
            <input
              type="text"
              name="name"
              className="text-box"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              className="text-box"
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
            ></textarea>
            <input
              type="submit"
              name="submit"
              className="send-btn"
              value="Send"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
