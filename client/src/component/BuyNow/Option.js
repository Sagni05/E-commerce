import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LonginContex } from "../context/ContexApi";

const Option = ({ deleteData, getData }) => {
  const { account, setAccount } = useContext(LonginContex);

  const removeData = async () => {
    try {
      const res = await fetch(`/remove/${deleteData}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (res.status === 400 || !data) {
        toast.error("Failed to removed product 😒", {
          position: "top-center",
        });
      } else {
        toast.success("Removed Successfully 🎉", {
          position: "top-center",
        });
        setAccount(data);
        getData();
      }
    } catch (err) {
      console.log("Error to Delete");
    }
  };

  // useEffect(() => {
  //   removeData();
  // }, []);

  return (
    <div className="add_remove_select">
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{ cursor: "pointer" }} onClick={() => removeData(deleteData)}>
        Delete
      </p>
      <span>|</span>
      <p className="forremovemedia">Save Or Later</p>
      <span>|</span>
      <p className="forremovemedia">See More like this</p>
      <ToastContainer />
    </div>
  );
};

export default Option;
