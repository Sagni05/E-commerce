import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./buynow.css";
import Option from "./Option";
import Right from "./Right";
import SubTotal from "./SubTotal";

const BuyNow = () => {
  const [cartData, setCartData] = useState("");
  console.log(cartData, "cartData BuyNow");

  const getDataToBuy = async () => {
    const res = await fetch("/cartDetails", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    if (res.status !== 201) {
      console.log("error to get datails");
    } else {
      setCartData(data.carts);
    }
  };

  useEffect(() => {
    getDataToBuy();
  }, []);

  return (
    <>
      {cartData.length ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <p>Select all items</p>
              <span className="leftbuyprice">Price</span>
              <Divider />
              {cartData.map((e, k) => {
                return (
                  <>
                    <div className="item_containert" key={k}>
                      <img src={e.url} alt="img" />
                      <div className="item_details">
                        <h3>{e.title.longTitle}</h3>
                        <h3>{e.title.shortTitle}</h3>
                        <h3 className="diffrentprice">
                          ₹{e.price.mrp - e.price.cost}
                        </h3>
                        <p className="unusuall">Usually dispatch in 8 days.</p>
                        <p>Eligible for Free Shipping</p>
                        <img
                          src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                          alt=""
                        />
                        <Option deleteData={e.id} getData={getDataToBuy} />
                      </div>
                      <h3 className="item_price"> ₹{e.price.cost}.00</h3>
                    </div>
                    <Divider />
                  </>
                );
              })}

              <SubTotal item={cartData} />
            </div>
            <Right item={cartData} />
          </div>
        </div>
      ) : (
        "Your Cart is empty"
      )}
    </>
  );
};

export default BuyNow;
