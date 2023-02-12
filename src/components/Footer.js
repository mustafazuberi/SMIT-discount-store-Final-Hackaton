import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./footer.css"
export default function Footer() {
    const navigate = useNavigate()
    return (
        <div>
            <div className="container footer-container">
                <div className="footer-sec d-flex text-center justify-content-between align-items-center">
                    <div className="footer-item" onClick={()=> navigate("/adminHome")} style={{cursor: "pointer"}}>
                        <i className="fa fa-home" aria-hidden="true"></i><br />
                        <h6 className='text-secondary fw-bold'>Home</h6>
                    </div>
                    <div className="footer-item " style={{cursor: "pointer"}} onClick={()=> navigate("/adminProductUpload")} >
                    <i className="fa fa-plus-circle" aria-hidden="true"></i><br />
                        <h6 className='text-secondary fw-bold'>Add item</h6>
                    </div>
                    <div className="footer-item" style={{cursor: "pointer"}} onClick={()=> navigate("/adminAccountSettings")}>
                        <i className="fa fa-user" aria-hidden="true"></i><br />
                        <h6 className='text-secondary fw-bold'>Account</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}