import React, { useEffect, useState } from 'react'
import adminPic from '../../images/admin-avatar.png'
import UserFooter from '../../components/UserFooter'
import { auth } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import { doc, db, setDoc, getDocs, collection } from "./../../config/firebase"

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "./../../store/index";
import CheckIcon from "@mui/icons-material/Check";



export default function UserSetting() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticatedData, authData } =
        bindActionCreators(actionCreators, dispatch);

    const authInfo = useSelector(state => state.myAuth)

    const logout = async () => {
        auth.signOut();
        authData({})
        isAuthenticatedData(false)
        swal("Congrats!", `Congrats! Logged Out Successfully.!`, "success");
        navigate("/")
    }


    const [fullName, setfullName] = useState('')
    const [userData, setUserData] = useState({})
    const [userOrders, setUserOrders] = useState([])
    useEffect(() => {
        const getUserData = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                if (authInfo.user.email === doc.data().email) {
                    setUserData(doc.data())
                    setfullName(doc.data().fullName)
                }
            });
        }
        getUserData()

        const getUserOrders = async () => {
            const querySnapshot = await getDocs(collection(db, "users", `${authInfo.user.uid}`, "userOrders"))
            const orders = []
            querySnapshot.forEach((doc) => {
                orders.push({ id: doc.id, ...doc.data() })
            })
            setUserOrders(orders)
        }
        getUserOrders()
    }, [])





    const updateFullName = async () => {
        if (!fullName) {
            swal("Please enter name to update!")
            return
        }
        const docRef = doc(db, "users", `${authInfo.user.uid}`);
        await setDoc(docRef, { ...userData, fullName: fullName });
        swal("Congrats!", `Congrats ${fullName} your name updated Successfully!`, "success");
    }

    return (
        <>
            <div className="container">
                <div className="admin-head d-flex flex-column align-items-center">
                    <p className='text-center mt-2 fs-5 text-primary'>Settings</p>
                    <img src={adminPic} width="100" alt="" />
                    <div className="input-group w-75 mt-2">
                        <input className="form-control border-end-0" type="text" value={fullName} placeholder="Update Fullname" id="update-fullname" onChange={((e) => setfullName(e.target.value))} />
                        <span className="input-group-append d-flex align-items-center px-2" style={{ backgroundColor: "#198754" }}>
                            <CheckIcon onClick={updateFullName} style={{ cursor: "pointer", color: "white" }} />
                        </span>
                    </div>
                </div>
                <div className="order-sec container" style={{ marginBottom: "6em" }}>
                    <h6 className='my-2 blue-text fw-bold'>Orders</h6>



                    {
                        userOrders.map((item, index) => {
                            return <div className="orders d-flex justify-content-between" key={index}>
                                <div className="user-bio">
                                    <p className='m-0 fw-bold'>{item.fullName}</p>
                                    <small>Just Now - {item.status}</small>
                                    <div className="p-items mt-3">

                                        {
                                            item.orderItems.map((e, index) => {
                                                return <small key={index}>1 x {e.productName} <br /></small>
                                            })
                                        }

                                    </div>
                                    <p>Total</p>
                                </div>
                                <div className="userdata" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                    <p className="number fw-bold">{item.contact}</p>
                                    <p className="price green-text fw-bold">{item.orderPrice}</p>
                                </div>
                            </div>
                        })
                    }






                    <div className="signup-btn text-center">
                        <button onClick={logout} className="loginBtn mt-1 fw-bold px-4">
                            Log out
                        </button>  </div>
                </div>
            </div>
            <UserFooter />
        </>
    )
}