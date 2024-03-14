import React, { useEffect } from "react";
import Banner from "./Banner";
import "./home.css";
import Slide from "./Slide";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, STATUES } from "../../store/productSlice";
import CircularProgress from "@mui/material/CircularProgress";

const MainComponent = () => {
  const dispatch = useDispatch();

  const { data: products, status } = useSelector(
    (state) => state.getProductData
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (status === STATUES.LOADING) {
    return (
      <div className="spinner">
        <CircularProgress />
        <h3>Loading...</h3>
      </div>
    );
  }

  if (status === STATUES.ERROR) {
    return <h2 className="home_section">Somthing Went Wrong....</h2>;
  }

  return (
    <div className="home_section">
      <div className="banner_part">
        <Banner />
      </div>

      <div className="slide_part">
        <div className="left_slide">
          <Slide title="Deal of the day" products={products} />
        </div>
        <div className="right_slide">
          <h4>Festival latest launches</h4>
          <img
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg"
            alt="RightImg"
          />
          <a href="#">See More</a>
        </div>
      </div>

      <Slide title="Toady's Deal" products={products} />

      <div className="center_img">
        <img
          src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg"
          alt=""
        />
      </div>
      <Slide title="Beast Seller" products={products} />
      <Slide title="Upto 80% off" products={products} />
    </div>
  );
};

export default MainComponent;
