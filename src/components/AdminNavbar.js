import React from "react";
import { useNavigate } from "react-router-dom";
import adminAvatar from "../images/admin-avatar.png";
import orderIcon from "../images/order-icon.png";
import Footer from "./Footer";

export default function AdminNavbar() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container" style={{overflow:"scroll"}}>
        <div className="header mt-4 mx-auto border-bottom-1 admin-top-bar">
          <div className="admin-header d-flex justify-content-between align-items-center">
            <div className="admin-info-sec d-flex align-items-center">
              <div className="admin-img">
                <img src={adminAvatar} className="img-fluid" alt="" />
              </div>
              <div className="admin info ms-3">
                <h3 className="blue-text fw-bold m-0">Mr.Ahmed</h3>
                <h4 className="green-text fw-bold m-0">Admin</h4>
              </div>
            </div>
            <div className="order-img">
              <img
                src={orderIcon}
                onClick={() => navigate("/adminOrders")}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}
