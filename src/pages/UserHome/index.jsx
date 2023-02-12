import React from 'react'
import meat from "../../images/meet.png"
import UserFooter from '../../components/UserFooter'

export default function UserHome() {


    return (
        <>
        <div className="user-shop-page">
            <div className="container mt-3">
                <div className="shop-header d-flex justify-content-between align-items-center">
                    <div className="shop-title">
                        <h1 className='green-text'>SAYLANI WELFARE</h1>
                        <h4 className='blue-text'>DISCOUNT STORE</h4>
                    </div>
                    <div className="cart">
                        <i className="fa fa-shopping-cart fs-3" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="image mt-2 mb-4">
                    <img src={meat} className="img-fluid d-block mx-auto w-m-50" alt="" />
                </div>
                <div className="products d-flex flex-column" style={{ marginBottom: "5em" }}>
                    <div className="product d-flex justify-content-between w-100 align-items-center">
                        <div className="product-image">
                            <img src={meat} alt="" />
                        </div>
                        <div className="product-details">
                            <div className="product-title">Meat</div>
                            <div className="product-description">This is Product Description</div>
                        </div>
                        <div className="cart-price">
                            <p>Rs.800 - per Kg</p>
                            <button className="btn btn-success"><i className="fa fa-plus" aria-hidden="true"></i></button>
                        </div>
                    </div>
                    <div className="product d-flex justify-content-between w-100 align-items-center">
                        <div className="product-image">
                            <img src={meat} alt="" />
                        </div>
                        <div className="product-details">
                            <div className="product-title">Meat</div>
                            <div className="product-description">This is Product Description</div>
                        </div>
                        <div className="cart-price">
                            <p>Rs.800 - per Kg</p>
                            <button className="btn btn-success"><i className="fa fa-plus" aria-hidden="true"></i></button>
                        </div>
                    </div>
                    <div className="product d-flex justify-content-between w-100 align-items-center">
                        <div className="product-image">
                            <img src={meat} alt="" />
                        </div>
                        <div className="product-details">
                            <div className="product-title">Meat</div>
                            <div className="product-description">This is Product Description</div>
                        </div>
                        <div className="cart-price">
                            <p>Rs.800 - per Kg</p>
                            <button className="btn btn-success"><i className="fa fa-plus" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
            </div>

            <UserFooter />
        </>
    )
}