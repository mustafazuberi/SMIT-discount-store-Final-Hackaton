import adminPic from "../../images/admin-avatar.png";
import mango from "../../images/mango.png";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import {
  setDoc,
  db,
  doc,
  ref,
  storage,
  uploadBytes,
  getDownloadURL,
  getDocs,
  auth,
  collection,
} from "./../../config/firebase";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


import { useDispatch, } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "./../../store/index";



const AccountSettings = () => {
  const authInfo = useSelector((state) => state.myAuth);
  const navigate = useNavigate()
  const dispatch = useDispatch();



  const { authData, admintExists, isAuthenticatedData } =
    bindActionCreators(actionCreators, dispatch);




  const updateFullname = async () => {
    const fullName = document.getElementById("fullName").value;
    if (!fullName) {
      swal("Please enter name to update!")
      return
    }
    const docRef = doc(db, "admins", `${authInfo.user.uid}`);
    const updatedData = { email: authInfo.user.email, fullName: fullName };
    await setDoc(docRef, updatedData);
    authData({ ...authInfo, adminName: fullName })
    swal("Updated", `Congrats ${fullName} your name updated Successfully!`, "success");
  };




  const uploadImage = async (image) => {
    const storageRef = ref(storage, `images/${image.name}`);
    const snapshot = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };




  const [added, setAdded] = useState("");
  const addCategory = async () => {
    if (!document.getElementById("categoryImage").files[0]) {
      swal("Select Image to Create category.");
      return;
    }
    const categoryImage = await uploadImage(
      document.getElementById("categoryImage").files[0]
    );
    const categoryName = document.getElementById("categoryName").value;

    const categoryObjInfo = {
      categoryImgUrl: categoryImage,
      categoryName: categoryName,
    };
    const categoryId = authInfo.user.uid + Date.now();
    const myCategoryRef = doc(db, "categories", `${categoryId}`);
    await setDoc(myCategoryRef, categoryObjInfo);
    Swal.fire({
      title: "Category Added successfully.",
      width: 600,
    });
    setAdded("added");
  };





  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const myCategories = [];
      querySnapshot.forEach((doc) => {
        myCategories.push({ id: doc.id, ...doc.data() });
      });
      setCategories(myCategories);
    };
    getCategories();
  }, [added]);






  const logout = async () => {
    await auth.signOut();
    const user = auth.currentUser;
    authData({})
    admintExists(false)

    swal("Incomplete Form", "Congrats! Logged Out Successfully", "error");


    // setLoginOptionDisplay("Cart-and-Login d-none")
    navigate("/")
  }




  return (
    <>
      <div className="container">
        <div className="admin-head d-flex flex-column align-items-center">
          <p className="text-center mt-2 fs-5 text-primary">Settings</p>
          <img src={adminPic} width="100" alt="" />
          <div className="input-group w-75 mt-2">
            <input
              className="form-control border-end-0"
              type="text"
              placeholder="Update Fullname"
              id="fullName"
            />
            <span className="input-group-append d-flex align-items-center px-2" style={{ backgroundColor: "#198754" }}>
              <CheckIcon onClick={updateFullname} style={{ cursor: "pointer", color: "white" }} />
            </span>
          </div>
        </div>
        <div className="category-add d-flex flex-column align-items-center mt-3">
          <div className="mb-3 w-75" style={{ border: "1px solid grey" }}>
            <input className="form-control" type="file" id="categoryImage" />
          </div>
          <div className="input-group w-75">
            <input
              className="form-control "
              type="text"
              placeholder="Category Name"
              id="categoryName"
            />
            <button className="btn btn-success" onClick={addCategory}>
              Add
            </button>
          </div>
        </div>
        <div className="all-categories mt-4 d-flex flex-column align-items-center fw-bold blue-text">
          <p>All Categories</p>

          <div className="overflow-y w-75">
            {categories.map((item, index) => {
              return (
                <div
                  className="hp-card d-flex align-items-center mb-3 justify-content-between"
                  key={index}
                >
                  <div className="p-img">
                    <img
                      src={item.categoryImgUrl}
                      className="img-fluid"
                      width="50px"
                      alt=""
                    />
                  </div>
                  <div className="p-info d-flex">
                    <p className="green-text fw-bold mt-2">
                      {item.categoryName}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>


      <button onClick={logout} className="loginBtn mt-1 fw-bold px-4">
        Log out
      </button>

      <br /><br /><br />
      <br /><br />



      <Footer />


    </>
  );
};

export default AccountSettings;
