import { Divider } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import axios from "axios";
import "./Cart.css";
import { LonginContex } from "../context/ContexApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

const Cart = () => {
  const [indData, setIndData] = useState("");
  // console.log(indData, "indData");
  const navigate = useNavigate("");

  const { id } = useParams("");
  const { account, setAccount } = useContext(LonginContex);

  const getinddata = async () => {
    const res = await fetch(`/getproducts/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    // console.log(data);

    if (res.status !== 201) {
      alert("no data available");
    } else {
      // console.log("ind mila hain");
      setIndData(data);
    }
  };

  useEffect(() => {
    setTimeout(getinddata, 1000);
  }, [id]);

  //addToCart

  const addToCart = async (id) => {
    console.log(id);
    const check = await fetch(`/addCart/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        indData,
      }),
      credentials: "include",
    });
    // console.log(check);
    const data1 = await check.json();
    console.log(data1, "data1 cart ");

    if (check.status !== 201) {
      toast.error("Somthing went wrong", {
        position: "top-center",
      });
    } else {
      toast.success("Product added", {
        position: "top-center",
      });
      setAccount(data1);
      navigate("/buynow");
    }
  };

  return (
    <div className="cart_section">
      <ToastContainer />

      {indData && Object.keys(indData).length && (
        <div className="cart_container">
          <div className="left_cart">
            <img src={indData.url} alt="cartImageee" />
            <div className="cart_btn">
              <button
                className="cart_btn1"
                onClick={() => addToCart(indData.id)}
              >
                Add to Cart
              </button>
              <button className="cart_btn2">Buy NOw</button>
            </div>
          </div>
          <div className="right_cart">
            <h3>{indData.title.shortTitle}</h3>
            <h4>{indData.title.longTitle}</h4>
            <Divider />
            <p className="mrp">M.R.P. :₹{indData.price.mrp} </p>
            <p>
              Deal of the Day :{" "}
              <span style={{ color: "#B12704" }}> ₹{indData.price.cost}</span>
            </p>
            <p>
              You Save : :{" "}
              <span style={{ color: "#B12704" }}>
                ₹{indData.price.mrp - indData.price.cost} (
                {indData.price.discount})
              </span>
            </p>

            <div className="discount_box">
              <h5>
                Discount :{" "}
                <span style={{ color: "#111" }}>{indData.discount}</span>
              </h5>
              <h4>
                Free Delivery :{" "}
                <span style={{ color: "#111", fontWeight: 600 }}>
                  Jan 22-30{" "}
                </span>
                Details
              </h4>
              <p>
                Fastest delivery :{" "}
                <span style={{ color: "#111", fontWeight: 600 }}>
                  Tommarow 11 AM
                </span>
              </p>
            </div>
            <p className="description">
              About the Item :{" "}
              <span
                style={{
                  color: "#565659",
                  fontSize: "14",
                  fontWeight: "500",
                  letterSpacing: ".4px",
                }}
              >
                {indData.description}
              </span>
            </p>
          </div>
        </div>
      )}
      {!indData ? (
        <div className="spinner">
          <CircularProgress />
          <h3>Loading...</h3>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
