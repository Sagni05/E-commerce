import React, { createContext, useState } from "react";

export const LonginContex = createContext(null);

const ContexApi = ({ children }) => {
  const [account, setAccount] = useState("");
  return (
    <>
      <LonginContex.Provider value={{ account, setAccount }}>
        {children}
      </LonginContex.Provider>
    </>
  );
};

export default ContexApi;
