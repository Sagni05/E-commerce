import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import ContexApi from "./component/context/ContexApi";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContexApi>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ContexApi>
);
