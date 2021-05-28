import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/register.css";
import validator from "validator";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [isPassSame, setIsPassSame] = useState(true);
  const [isValidMobile, setValidMobile] = useState(true);
  const [isPassStrong, setPassStrong] = useState(true);
  const [isValidEmail, setValidEmail] = useState(true);
  const [isEmailUsed, setEmailUsed] = useState(false);
  const [isUserAdded, setUserAdded] = useState(false);

  const submitUser = (
    email,
    password,
    password1,
    firstName,
    lastName,
    mobileNo
  ) => {
    let intNum = parseInt(mobileNo);
    // console.log(intNum);
    // console.log(isNaN(intNum));
    if (isNaN(intNum) || 6000000000 >= intNum || 10000000000 <= intNum) {
      setPassStrong(true);
      setIsPassSame(true);
      setValidEmail(true);
      setValidMobile(false);
      return;
    } else if (!validator.isEmail(email)) {
      setPassStrong(true);
      setIsPassSame(true);
      setValidMobile(true);
      setValidEmail(false);
      return;
    } else if (password.length < 6) {
      setPassStrong(false);
      setIsPassSame(true);
      setValidMobile(true);
      setValidEmail(true);
      return;
    } else if (password !== password1) {
      setPassStrong(true);
      setIsPassSame(false);
      setValidEmail(true);
      setValidMobile(true);
      return;
    } else {
      setPassStrong(true);
      setIsPassSame(true);
      setValidEmail(true);
      setValidMobile(true);
    }

    fetch(
      `http://localhost:5000/user/register/${email}/${password}/${firstName}/${lastName}/${mobileNo}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
        },
        mode: "cors",
      }
    )
      .then((res) => {
        if (res.status === 201) {
          setEmailUsed(true);
          setPassStrong(true);
          setIsPassSame(true);
          setValidEmail(true);
          setValidMobile(true);
          return;
        } else if (res.status === 200) {
          setUserAdded(true);
          setPassStrong(true);
          setIsPassSame(true);
          setValidEmail(true);
          setValidMobile(true);
          setEmailUsed(false);
          document.getElementById("form").reset();
        } else {
          throw new Error("An error occurred");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <header className="showcase">
        <div className="container form-container">
          <div className="row formm">
            <div className="offset-sm-3 col-sm-6">
              <form className="signup" id="form">
                <h1>Sign Up</h1>
                {isUserAdded && (
                  <p className="__success">
                    User added Successfully, Now login using the link below
                  </p>
                )}
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="First name"
                        id="firstName"
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Last name"
                        id="firstName"
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <input
                  className="form-control"
                  type="tel"
                  pattern="[6789][0-9]{9}"
                  placeholder="Mobile Number"
                  id="mobileNo"
                  required
                  onChange={(e) => {
                    setMobileNo(e.target.value);
                  }}
                />
                {!isValidMobile && (
                  <p className="__warning">Enter valid Mobile Number</p>
                )}
                <br />
                <input
                  className="form-control input-lg input-block"
                  type="email"
                  placeholder="Email Address"
                  required
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {!isValidEmail && (
                  <p className="__warning">Enter valid Email</p>
                )}
                {isEmailUsed && (
                  <p className="__warning">Email already in use</p>
                )}
                <br />
                <input
                  className="form-control input-lg"
                  type="password"
                  placeholder="Password"
                  id="password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {!isPassStrong && (
                  <p className="__warning">
                    Password should be least 6 characters long
                  </p>
                )}
                <br />
                <input
                  className="form-control input-lg"
                  type="password"
                  placeholder="Confirm Password"
                  id="password1"
                  required
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
                {!isPassSame && (
                  <p className="__warning">Passwords should be same</p>
                )}
                <button
                  type="button"
                  className="btn sub-color btn-lg btn-block"
                  onClick={() =>
                    submitUser(
                      email,
                      password,
                      confirmPass,
                      firstName,
                      lastName,
                      mobileNo
                    )
                  }
                >
                  Sign Up
                </button>
                <div className="help">
                  <Link to="/sign-in">
                    <h6 className="anchr">already have an Account, Sign in</h6>{" "}
                  </Link>
                  <br />
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Register;
