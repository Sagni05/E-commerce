import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { LonginContex } from "../context/ContexApi";
import { NavLink, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const RightHeader = ({ LogClose, LogoutUser }) => {
  const { account, setAccount } = useContext(LonginContex);

  // const navigate = useNavigate();

  return (
    <>
      <div className="rightheader">
        <div className="right_nav">
          {account ? (
            <Avatar className="avtar2">{account.fname[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar className="avtar"></Avatar>
          )}

          {account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""}
        </div>
        <div className="nav_btn" onClick={() => LogClose()}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Shop By Category</NavLink>

          <Divider style={{ width: "100%", marginLeft: "-20px" }} />

          <NavLink to="/">Today's Deal</NavLink>
          {account ? (
            <NavLink to="/buynow">Your orders</NavLink>
          ) : (
            <NavLink to="/login">Your orders</NavLink>
          )}

          <Divider style={{ width: "100%", marginLeft: "-20px" }} />

          <div className="flag">
            <NavLink to="/">Settings</NavLink>
            <img
              src="./india.png"
              style={{ width: 35, marginLeft: 10 }}
              alt=""
            />
          </div>

          {account ? (
            <div className="flag">
              <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
              <h3
                style={{ cursor: "pointer", fontWeight: 500 }}
                onClick={() => LogoutUser()}
              >
                Logout
              </h3>
            </div>
          ) : (
            <NavLink to="/login">Sign In</NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default RightHeader;
