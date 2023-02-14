import React, { useEffect, useState } from 'react'
import UserFooter from '../../components/UserFooter'
import avatar from '../../images/admin-avatar.png'
import DeleteIcon from '@mui/icons-material/Delete';


import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "./../../store/index";
import swal from 'sweetalert';
import { doc, db, setDoc } from "./../../config/firebase"


export default function Cart() {

    const cartItems = useSelector(state => state.cartItems)
    const authInfo = useSelector(state => state.myAuth)


    const dispatch = useDispatch();
    const { removeFromCart } =
        bindActionCreators(actionCreators, dispatch);

    const emptyCart = () => {
        removeFromCart()
        setTotal(0)
    }

    const [total, setTotal] = useState(0)
    useEffect(() => {
        for (let i = 0; i < cartItems.length; i++) {
            setTotal((prevState) => prevState + (+cartItems[i].unitPrice))
        }
    }, [])

    const qtyHandler = (item) => {

        setTotal((prevState) => prevState - item.unitPrice)
        setTotal((prevState) => prevState + (+item.unitPrice) * (+document.getElementById('qty').value))
    }






    const placeOrder = async () => {
        const email = document.getElementById("email").value
        const contact = document.getElementById("contact").value
        const shippingAdress = document.getElementById("shippingAdress").value
        const fullName = document.getElementById("fullName").value

        if (cartItems.length === 0) {
            swal("Empty Cart!", "You need to add items to your cart before you can place an order.", "error");
            return
        }

        if (!email || !contact || !shippingAdress || !fullName) {
            swal("Incomplete form fields!", "Please fill in all of the required fields.", "error");
            return
        }
        if (contact.length < 11) {
            swal("Invalid Phone No!", "The number must be at least 11 digits long.", "error");
            return
        }


        const userOrderObj = {
            email: email,
            contact: contact,
            shippingAdress: shippingAdress,
            fullName: fullName,
            orderItems: [...cartItems],
            time: Date.now(),
            status: "pending",
            orderPrice: total,
            userId: authInfo.user.uid,
        }

        const itemId = authInfo.user.uid + Date.now()

        // saving in admin dashboard
        const adminOrderRef = doc(db, "Orders", `${itemId}`);
        await setDoc(adminOrderRef, userOrderObj);

        // saving in user dashboard
        const userOrderRef = doc(db, "users", `${authInfo.user.uid}`, "userOrders", `${itemId}`);
        await setDoc(userOrderRef, userOrderObj);

        swal("Thanks!", "Order Placed Successfully!", "success");

        document.getElementById("email").value = ""
        document.getElementById("contact").value = ""
        document.getElementById("shippingAdress").value = ""
        document.getElementById("fullName").value = ""
        removeFromCart()
        setTotal(0)

    }




    return (
        <div>
            <div className="container mt-3 cart-page">
                <div className="d-flex justify-content-end">
                    <img src={avatar} alt="" width={50} />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="info">
                        <h5 className='blue-text m-0'>Shopping</h5>
                        <p className='fw-bold green-text'>Cart</p>
                    </div>
                    <div className="del-icon">
                        <DeleteIcon className='green-text c-pointer' onClick={emptyCart} />
                    </div>
                </div>

                <div className="cart-product">
                    {
                        cartItems.map((item, index) => {
                            return <div className="hp-card d-flex border-0 justify-content-between align-items-center mb-4" key={index}>
                                <div className="p-img">
                                    <img src={item.productImage} className="img-fluid" alt="" width={100} />
                                </div>
                                <div className="p-info">
                                    <p className='green-text fw-bold'>{item.productName}</p>
                                    <p className='text-secondary fw-bold'>1 {item.unitName}</p>
                                </div>

                                <div className="p-price">
                                    <p className="text-secondary fw-bold">{item.unitPrice}</p>
                                </div>
                            </div>
                        })
                    }


                    <div className="d-flex justify-content-between align-items-center mt-5 px-5">
                        <p className='fw-bold'>Total</p>
                        <p className='fw-bold green-text'>{total}</p>
                    </div>

                    <div className="cart-form px-5 mx-auto mt-5">
                        <div className="input-fields">
                            <div className="input-group">
                                <input className="form-control border-end-0 border rounded-pill" type="text" placeholder="Full Name" id="fullName" />
                            </div>
                            <div className="input-group">
                                <input className="form-control border-end-0 border rounded-pill" type="number" placeholder="Contact" id="contact" />
                            </div>
                            <div className="input-group">
                                <input className="form-control border-end-0 border rounded-pill" type="email" placeholder="Email" id="email" />
                            </div>
                            <div className="input-group">
                                <input className="form-control border-end-0 border rounded-pill" type="text" placeholder="Shipping Address" id="shippingAdress" />
                            </div>
                        </div>
                        <div className="signup-btn text-center mb-5">
                            <button className="loginBtn mt-1 fw-bold px-4" onClick={placeOrder}>
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <UserFooter />

        </div>
    )
}
