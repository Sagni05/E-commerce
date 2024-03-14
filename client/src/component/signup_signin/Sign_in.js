import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LonginContex } from "../context/ContexApi";

const Sign_in = () => {
  const navigate = useNavigate();

  const [logdata, setData] = useState({
    email: "",
    password: "",
  });
  // console.log(logdata);

  const { account, setAccount } = useContext(LonginContex);

  const addData = (e) => {
    const { name, value } = e.target;
    setData({ ...logdata, [name]: value });
  };

  //login user  =============================================================================

  const sendData = async (e) => {
    e.preventDefault();

    const { email, password } = logdata;

    if (email === "") {
      toast.warn("Please Enter your Email", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.warn("Please Enter your Password", {
        position: "top-center",
      });
    } else {
      try {
        const res = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 400 || !data) {
          toast.error("Invalid user Details", {
            position: "top-center",
          });
        } else {
          setAccount(data);
          toast.success("Login  Successfully 😃!", {
            position: "top-center",
          });

          setData({
            ...logdata,
            email: "",
            password: "",
          });
        }
      } catch (err) {
        console.log("login page ka error" + err.message);
      }
    }
  };

  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="amazonlogo" />
          </div>
          <div className="sign_form">
            <form method="POST">
              <h1>Sign In</h1>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email..."
                  name="email"
                  value={logdata.email}
                  onChange={addData}
                />
              </div>

              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password..."
                  name="password"
                  value={logdata.password}
                  onChange={addData}
                />
              </div>
              <button className="signin_btn" onClick={sendData}>
                Sign in
              </button>
            </form>
          </div>
          <div className="create_accountinfo">
            <p>New to Amazon?</p>
            <button
              onClick={() => navigate("/register")}
              style={{ cursor: "pointer" }}
            >
              Create Your Amazon Account
            </button>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Sign_in;
