import React from 'react'
import AdminNavbar from '../../components/AdminNavbar'

export default function Order() {
    return (
        <div>
            <AdminNavbar />

            <div className="order-sec container" style={{height:"70vh",overflow:"scroll",zIndex: '-1'}}>
                <h6 className='my-2 blue-text fw-bold'>Orders</h6>
                <div className="orders d-flex justify-content-between align-items-center">
                    <div className="user-bio">
                        <p className='m-0 fw-bold'>Inzmam Malik</p>
                        <small>Just Now - Pending</small>
                        <div className="p-items mt-3">
                            <small className='text-secondary'>2 x ITEM NAME</small><br />
                            <small className='text-secondary'>3 x ITEM NAME</small>
                        </div>
                        <p>Total</p>
                    </div>
                    <div className="userdata">
                        <p className="number fw-bold">03022004480</p>
                        <p className="price green-text fw-bold">$2.1</p>
                    </div>
                </div>
                <div className="input-group">
                    <select className="form-control mb-2 border-0 bg-secondary text-light" id="class-schedule">
                        <option className="hidden" selected disabled>Change status
                        </option>
                        <option value="fruit">Fruits</option>
                    </select>
                </div>
            </div>

            <div className="order-sec container">
                <h6 className='my-2 blue-text fw-bold'>Orders</h6>
                <div className="orders d-flex justify-content-between align-items-center">
                    <div className="user-bio">
                        <p className='m-0 fw-bold'>Inzmam Malik</p>
                        <small>Just Now - Pending</small>
                        <div className="p-items mt-3">
                            <small className='text-secondary'>2 x ITEM NAME</small><br />
                            <small className='text-secondary'>3 x ITEM NAME</small>
                        </div>
                        <p>Total</p>
                    </div>
                    <div className="userdata">
                        <p className="number fw-bold">03022004480</p>
                        <p className="price green-text fw-bold">$2.1</p>
                    </div>
                </div>
                <div className="input-group">
                    <select className="form-control mb-2 border-0 bg-secondary text-light" id="class-schedule">
                        <option className="hidden" selected disabled>Change status
                        </option>
                        <option value="fruit">Fruits</option>
                    </select>
                </div>
            </div>

        </div>
    )
}