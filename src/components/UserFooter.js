import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./footer.css"
export default function UserFooter() {
    const navigate = useNavigate()
    return (
        <div className="container footer-container">
            <div className="footer-sec d-flex text-center justify-content-between align-items-center">
                <div className="footer-item" onClick={() => navigate("/shop")} style={{ cursor: "pointer" }}>
                    <i className="fa fa-home" aria-hidden="true"></i><br />
                    <h6 className='text-secondary fw-bold'>Home</h6>
                </div>
                <div className="footer-item" style={{ cursor: "pointer" }} onClick={() => navigate("/user/shopping-cart")} >
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i><br />
                    <h6 className='text-secondary fw-bold'>Cart</h6>
                </div>
                <div className="footer-item" style={{ cursor: "pointer" }} onClick={() => navigate("/user/account-settings")}>
                    <i className="fa fa-user" aria-hidden="true"></i><br />
                    <h6 className='text-secondary fw-bold'>Account</h6>
                </div>
            </div>
        </div>
    )
}