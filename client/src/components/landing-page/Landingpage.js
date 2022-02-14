import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/Landingpage.css";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPhoneAlt,
//   faEnvelope,
//   fas,
//   faMapMarker,
// } from "@fortawesome/free-solid-svg-icons";
// import { faFacebookF } from "@fortawesome/free-brands-svg-icons";

function Homepage() {
  return (
    <div>
      <header className="showcase">
        {/* Image and text */}
        <nav className="fixed-top">
          <div className="nav-design navbar">
            <h2 className="brand-name navbar-brand ">
              <b>Trailerly</b>
            </h2>
            <Link to="/sign-in">
              <button className="btn btn-signin navbar-btn">
                <b>Sign In</b>
              </button>
            </Link>
          </div>
        </nav>
        <div className="center">
          <h1 className="heading">
            Unlimited movies, TV <br></br> shows and more.
          </h1>
          <h4 className="sub-heading">Watch anywhere. Cancel anytime.</h4>
        </div>
      </header>

      <div className="container-fluid con-1">
        <div className="row">
          <div className="col-sm-4">
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile.png"
              width="auto"
              height="500px"
              alt="mobile img"
            />
          </div>
          <div className="col-sm-6 content">
            <h1>Download your shows to watch on the go.</h1>
            <p>Save your data and watch all your favorites offline.</p>
          </div>
        </div>
      </div>

      <div className="container-fluid con-1">
        <div className="row">
          <div className="col-sm-6 content">
            <h1>Watch everywhere.</h1>
            <p>
              Stream unlimited movies and TV shows on <br />
              your phone, tablet, laptop, and TV without paying more.
            </p>
          </div>

          <div className="col-sm-4">
            <img
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png"
              alt="device pile"
            />
          </div>
        </div>
      </div>

      <footer id="footer" className="footer-design con-1">
        <br />
        <br />

        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <h5 className="brand">TRAILERLY</h5>
              <br />
              <div>
                <p className="brand">
                  {" "}
                  {/* <i id="foot" className="fa fa-phone brand"></i> */}
                  {/* <FontAwesomeIcon icon={(fas, faPhoneAlt)} inverse /> */}
                  {"  "}(937)354-5294
                </p>
              </div>
              <div>
                <p>
                  {" "}
                  {/* <i id="foot" className=" fa fa-envelope brand"></i> */}
                  {/* <FontAwesomeIcon icon={(fas, faEnvelope)} />{" "} */}
                  <a className="brand" href="mailto:chaitanyauge1@gmail.com">
                    {" "}
                    trailerly@gmail.com
                  </a>
                </p>
              </div>
              <div>
                <p className="brand">
                  {" "}
                  {/* <i id="foot" className="fa fa-map-marker brand"></i> */}
                  {/* <FontAwesomeIcon icon={(fas, faMapMarker)} />{" "} */}
                  <span> Survey No. 2/3/4, VIM Private Rd, Kapil Nagar,</span>
                  Kondhwa, Pune, Maharashtra 411048
                </p>
              </div>
            </div>

            <div className="offset-sm-4 col-sm-4">
              <ul className="social-icons">
                <li>
                  <a className="facebook" href="www.facebook.com">
                    {/* <i className="fa fa-facebook"></i> */}
                    {/* <FontAwesomeIcon icon={(fab, faFacebookF)} /> */}
                  </a>
                </li>
                <li>
                  <a
                    className="twitter"
                    href="www.facebook.com;
"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="linkedin"
                    href="www.facebook.com;
"
                  >
                    {/* <i className="fa fa-linkedin"></i> */}
                    {/* <FontAwesomeIcon icon={(fas, faLinkedin)} />; */}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="offset-sm-4">
              <p className="copyright-text">
                Copyright &copy; 2021 All Rights Reserved by
                <a className="brand" href="home.html">
                  Trailerly
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
