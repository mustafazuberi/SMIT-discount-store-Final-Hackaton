import React from "react";
import "./style.css";
import Swal from "sweetalert2";
import {
  createUserWithEmailAndPassword,
  addUserToDBSignup,
  auth
} from "./../../config/firebase";

import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const signupFirebase = async () => {
    try {
      const fullName = document.getElementById("fullName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("psw").value;
      const contact = document.getElementById("contact").value;

      if (fullName.length === 0 || contact.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "username required",
        });
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      await addUserToDBSignup(fullName, contact);
      Swal.fire({
        title: "Congrats! Account Created Successfully.",
        width: 600,
        padding: "3em",
      });
      navigate("/");
      window.scrollTo(0, 0);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: e.message,
      });
    }
  };

  return (
    <>
      <div className="signMain">
        <h1 className="green-text mt-5 " style={{ color: "#61b846" }}>
          SAYLANI WELFARE
        </h1>
        <p className="blue-text fw-bold mt-3">ONLINE DISCOUNT STORE</p>

        <div className="signupInpsDiv">
          <TextField
            id="fullName"
            className="signupInp"
            label="FullName"
            variant="standard"
          />
        </div>
        <div className="signupInpsDiv">
          <TextField
            className="signupInp"
            label="Contact"
            id="contact"
            variant="standard"
          />
        </div>
        <div className="signupInpsDiv">
          <TextField
            className="signupInp"
            label="Email"
            id="email"
            variant="standard"
          />
        </div>
        <div className="signupInpsDiv">
          <TextField
            id="psw"
            className="signupInp"
            label="Password"
            variant="standard"
          />
        </div>

        <button onClick={signupFirebase} className="signupBtn">
          Sign Up
        </button>
        <div>
          <p className="text-center mt-4 blue-text fw-bold c-pointer ">
            Already have an account ?{" "}
            <span onClick={() => navigate("/login")} className='c-pointer'>Login</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Index;
