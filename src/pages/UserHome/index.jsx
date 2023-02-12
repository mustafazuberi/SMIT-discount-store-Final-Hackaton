import React from "react";
import "./style.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const index = () => {
  return (
    <div>
      <div className="navbar">
        <div className="rightHeading">
          <h3>SAYLANI WELFARE</h3>
          <h5>Discount Store</h5>
        </div>
        <div className="leftIcon">
          <ShoppingCartIcon />
        </div>
      </div>
    </div>
  );
};

export default index;
