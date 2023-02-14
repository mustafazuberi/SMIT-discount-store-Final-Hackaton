import React, { useState } from "react";
import "./style.css";
import swal from "sweetalert";
import Swal from "sweetalert2";

import VisibilityIcon from '@mui/icons-material/Visibility';


import {
  createUserWithEmailAndPassword,
  addUserToDBSignup,
  auth,
} from "./../../config/firebase";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "./../../store/index";

import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sendAdminData, isAuthenticatedData, admintExists, authData } =
    bindActionCreators(actionCreators, dispatch);

  const admins = useSelector((state) => state.myAdmins);
  const [adminNameToSend, setAdminNameToSend] = useState('')
  let [whereToNavigate, setWhereToNavigate] = useState("");

  const isAdminHandler = (e) => {
    // console.log(e.target.value)
    for (let item of admins) {
      if (item.email === e.target.value) {
        setAdminNameToSend(item.fullName)
        admintExists(true);
        setWhereToNavigate("/adminHome");
      } else {
        setAdminNameToSend("")
        setWhereToNavigate("/userHome");
      }
    }
  };

  const login = async () => {
    try {
      const email = document.getElementById("email").value;
      const password = document.getElementById("psw").value;
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      swal("Congrats!", "Loggined Successfully!", "success");


      // authData(userCred);
      if (whereToNavigate === '/adminHome') {
        admintExists(true)
        authData({ ...userCred, adminName: adminNameToSend })
      } else {
        authData({ ...userCred })

        isAuthenticatedData(true)

      }


      navigate(whereToNavigate);
      window.scrollTo(0, 0);
    } catch (e) {

      swal("error!", e.message, "error");


    }
  };

  const test = useSelector(state => state.isAuthLoggined)
  // console.log(test)

  return (
    <>
      <div className="signMain">
        <h1 className="green-text mt-5 " style={{ color: "#61b846" }}>
          SAYLANI WELFARE
        </h1>
        <p className="blue-text fw-bold mt-3">ONLINE DISCOUNT STORE</p>

        <div className="signupInpsDiv">
          <TextField
            className="signupInp"
            label="Email"
            id="email"
            variant="standard"
            onChange={isAdminHandler}
          />
        </div>
        <div className="signupInpsDiv">
          <TextField
            id="psw"
            className="signupInp"
            label="Password"
            variant="standard"
            type={'password'}
          />
        </div>

        <button onClick={login} className="loginBtn">
          Login
        </button>

        <div>
          <p className="text-center mt-4 blue-text fw-bold c-pointer ">
            Dont have an account ?
            <span onClick={() => navigate("/Signup")} className="c-pointer">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Index;
