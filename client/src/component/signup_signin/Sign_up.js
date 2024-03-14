import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signUp.css";

const Sign_up = () => {
  const [udata, setUdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  // console.log(udata);

  const addData = (e) => {
    const { name, value } = e.target;
    setUdata({ ...udata, [name]: value });
  };

  // sign_form

  const sendData = async (e) => {
    e.preventDefault();
    const { fname, email, mobile, password, cpassword } = udata;

    if (fname === "") {
      toast.warn("Please Provide Name", {
        position: "top-center",
      });
    } else if (email === "") {
      toast.warn("Please Provide Email", {
        position: "top-center",
      });
    } else if (mobile === "") {
      toast.warn("Please Provide Mobile Number", {
        position: "top-center",
      });
    } else if (mobile.length !== 10) {
      toast.warn("Please Enter 10 digite Mobile Number", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.warn("Please Provide Password", {
        position: "top-center",
      });
    } else if (cpassword === "") {
      toast.warn("Please Provide Confirm Password", {
        position: "top-center",
      });
    } else {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          email,
          mobile,
          password,
          cpassword,
        }),
      });

      const data = await res.json();

      if (res.status === 422 || !data) {
        toast.error("Invalid user Details", {
          position: "top-center",
        });
      } else {
        toast.success("User added Successfully", {
          position: "top-center",
        });
        setUdata({
          ...udata,
          fname: "",
          email: "",
          mobile: "",
          password: "",
          cpassword: "",
        });
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
              <h1>Sign Up</h1>
              <div className="form_data">
                <label htmlFor="fname"> Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  id="fname"
                  name="fname"
                  value={udata.fname}
                  onChange={addData}
                />
              </div>

              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email..."
                  name="email"
                  value={udata.email}
                  onChange={addData}
                />
              </div>

              <div className="form_data">
                <label htmlFor="number">Mobile</label>
                <input
                  type="text"
                  id="mobile"
                  placeholder="Enter your mobile Number..."
                  name="mobile"
                  value={udata.mobile}
                  onChange={addData}
                />
              </div>

              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="At least 6 char..."
                  name="password"
                  value={udata.password}
                  onChange={addData}
                />
              </div>

              <div className="form_data">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  id="cpassword"
                  placeholder="Confirm password..."
                  name="cpassword"
                  value={udata.cpassword}
                  onChange={addData}
                />
              </div>
              <button className="signin_btn" onClick={sendData}>
                Register
              </button>
              <div className="signin_info">
                <p>Already have an Account? </p>
                <NavLink to="/login">sign in</NavLink>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default Sign_up;
