import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Menu from "@mui/material/Menu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { LonginContex } from "../context/ContexApi";
import RightHeader from "./RightHeader";
import "./RightHeader.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [draOpen, setDraOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [text, setText] = useState("");
  // console.log(text, "text");
  const [listOpen, setListOpen] = useState(true);

  const navigate = useNavigate();

  const { account, setAccount } = useContext(LonginContex);
  // console.log(account, "account navbar");

  const { data: products, status } = useSelector(
    (state) => state.getProductData
  );

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getDetaileValidateUser = async () => {
    const res = await fetch("/validUser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data, "data");

    if (res.status !== 201) {
      console.log("error to validate");
    } else {
      console.log("data valide");
      setAccount(data);
    }
  };

  useEffect(() => {
    getDetaileValidateUser();
  }, []);

  const userLogOut = async () => {
    const res2 = await fetch("/logOut", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data2 = await res2.json();
    console.log(data2, "data2");

    if (res2.status !== 201) {
      console.log("error to validate");
    } else {
      console.log("data2 valid");
      toast.success("User Logout", {
        position: "top-center",
      });
      setAccount(false);
      navigate("/");
    }
  };

  const handelOpen = () => {
    setDraOpen(true);
  };

  const handelClose = () => {
    setDraOpen(false);
  };

  const getText = (item) => {
    setText(item);
    setListOpen(false);
  };

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handelOpen}>
            <MenuIcon style={{ color: "white" }} />
          </IconButton>
          <Drawer open={draOpen}>
            <RightHeader LogClose={handelClose} LogoutUser={userLogOut} />
          </Drawer>
          <div className="navlogo">
            <img
              src="./amazon_PNG25.png"
              alt="logo"
              onClick={() => navigate("/")}
            />
          </div>
          <div className="nav_searchbaar">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search Your Products"
              onChange={(e) => getText(e.target.value)}
            />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>

            {/* Search Products filter */}

            {text && (
              <List className="extrasearch" hidden={listOpen}>
                {products
                  .filter((product) =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((item) => (
                    <ListItem>
                      <NavLink
                        to={`getproductsone/${item.id}`}
                        onClick={() => setListOpen(true)}
                      >
                        {item.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to="/login">signin</NavLink>
          </div>
          <div className="cart_btn">
            {account ? (
              <NavLink to="/buynow">
                <Badge badgeContent={account.carts.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}

            <p>cart</p>
          </div>
          {account ? (
            <Avatar
              className="avtar2"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              className="avtar"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            ></Avatar>
          )}

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {account ? (
              <MenuItem onClick={handleClose}>
                <LogoutIcon
                  style={{ fontSize: 16, marginRight: 3 }}
                  onClick={userLogOut}
                />{" "}
                Logout
              </MenuItem>
            ) : (
              ""
            )}
          </Menu>
        </div>
      </nav>
      <ToastContainer />
    </header>
  );
};

export default Navbar;
