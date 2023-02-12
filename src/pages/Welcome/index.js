import React, { useEffect } from "react";
import "./style.css";
import logo from "./../../images/logo.png";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getDocs, db, collection } from "./../../config/firebase";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "./../../store/index";
// import { useLocation } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sendAdminData } =
    bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "admins"));
      const admins = [];
      querySnapshot.forEach((doc) => {
        admins.push({ id: doc.id, ...doc.data() });
      });
      console.log(admins);

    //   dispatching action
      sendAdminData(admins);
    })();
  }, []);

  return (
    <div>
      <div>
        <div className="container welcome-screen mt-5">
          <div className="img-sec text-center">
            <img src={logo} alt="" className="img-fluid" />
            <h1 className="green-text mt-5 " style={{ color: "#61b846" }}>
              SAYLANI WELFARE
            </h1>
            <p className="blue-text fw-bold mt-3">ONLINE DISCOUNT STORE</p>
            <Button
              style={{
                backgroundColor: "#61b846",
                color: "white",
                padding: "7px 25px 7px 25px",
              }}
              onClick={() => {
                navigate("/Signup");
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
