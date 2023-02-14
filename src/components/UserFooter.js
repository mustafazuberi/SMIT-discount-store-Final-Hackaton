import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./footer.css"
export default function UserFooter() {
    const navigate = useNavigate()
    const cartItems = useSelector(state => state.cartItems)

    return (
        <div className="container footer-container">
            <div className="footer-sec d-flex text-center justify-content-between align-items-center">
                <div className="footer-item" onClick={() => navigate("/userHome")} style={{ cursor: "pointer" }}>
                    <i className="fa fa-home" aria-hidden="true"></i><br />
                    <h6 className='text-secondary fw-bold'>Home</h6>
                </div>
                <div className="footer-item" style={{ cursor: "pointer" }} onClick={() => navigate("/userCart")} >
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    <span className={cartItems.length ? 'cartQtyF' : 'cartQtyF d-none'}>{cartItems.length}</span>
                    <br />
                    <h6 className='text-secondary fw-bold'>Cart</h6>
                </div>
                <div className="footer-item" style={{ cursor: "pointer" }} onClick={() => navigate("/userSetting")}>
                    <i className="fa fa-user" aria-hidden="true"></i><br />
                    <h6 className='text-secondary fw-bold'>Account</h6>
                </div>
            </div>
        </div>
    )
}