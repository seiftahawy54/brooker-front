import { useLocation } from "react-router";

const Footer = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname.includes("chat") ? (
        ""
      ) : (
        <footer className={"footer"}>
          <div className="footer_containar">
            <div className="footer_top">
              <div className="company_info">
                <h2 className="fa fa-home company_logo  ">Broker</h2>
                <p className="company_description">
                  Find your home or find a buyer for your home and if you want
                  to rent, the choice will be easy for you
                </p>
                <ul className="footer_list">
                  <li className="footer_list-link">
                    <a href="#" className="footer_list-link">
                      <i className="uil uil-facebook"></i>
                    </a>
                  </li>
                </ul>
                <span className="copyright">000000000000</span>
              </div>
              <div>
                <h6 className="footer_title">BROKER.APP</h6>
                <ul className="footer_list">
                  <li className="footer_list-item">
                    <a href="" className="footer_list-link"></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
