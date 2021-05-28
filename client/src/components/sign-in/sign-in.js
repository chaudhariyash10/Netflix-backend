import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/signin.css";

function Signin() {
  const token = window.localStorage.getItem("token");
  const history = useHistory();
  const [isValid, setValid] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [running, setRunning] = useState(true);

  const submitUser = (email, password) => {
    fetch(`http://localhost:5000/user/login/${email}/${password}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
      },
      mode: "cors",
    })
      .then((res) => {
        if (res.status === 200) {
          setValid(true);
          return res.json();
        }
        setValid(false);
      })
      .then((resJson) => {
        if (resJson) return resJson.token;
      })
      .then((jwtToken) => {
        if (jwtToken) {
          window.localStorage.setItem("token", jwtToken);
          history.push("/homepage");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifyToken = (token) => {
    fetch(`http://localhost:5000/user/verifyToken/${token}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
      },
      mode: "cors",
    }).then((res) => {
      setVerified(true);
      setRunning(false);
      // console.log("Status: ", res.status);
      if (res.status === 200) {
        setVerified(true);
      } else {
        token = "";
        window.localStorage.setItem("token", "");
      }
    });
  };

  if (token && verified) {
    return <Redirect to="/homepage" />;
  } else if (token && !verified) {
    if (running) {
      verifyToken(token);
      return <h1>Verifying Token...</h1>;
    } else {
      if (token && verified) {
        return <Redirect to="/homepage" />;
      } else {
        return <Redirect to="/sign-in" />;
      }
    }
  }
  if (!token)
    return (
      <div>
        <header className="showcase">
          <div className="container form-container">
            <div className="row formm">
              <div className="offset-sm-3 col-sm-6">
                <form className="signin">
                  <h1>Sign In</h1>
                  <input
                    className="form-control input-lg input-block"
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setValid(true);
                    }}
                  />
                  <br />
                  <input
                    className="form-control input-lg"
                    type="password"
                    required
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setValid(true);
                    }}
                  />
                  {!isValid && (
                    <p className="__warning">Wrong User credentials</p>
                  )}
                  <button
                    type="button"
                    className="btn  btn-lg btn-block sub-color"
                    onClick={() => submitUser(email, password)}
                  >
                    Sign In
                  </button>

                  <div className="help">
                    <div className="remember">
                      <input value="true" type="checkbox" />
                      <label>Remember me</label>
                    </div>
                    <Link to="/register">
                      <button className="btn-anchor">
                        Don't have an Account, Register
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
}

export default Signin;
