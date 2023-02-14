import React from 'react'
import "./style.css"
import userbg from "../../images/userbg.png"
import UserFooter from '../../components/UserFooter'
import { db, collection, getDocs } from '../../config/firebase'
import { useState, useEffect } from 'react'


import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "./../../store/index";
import { useNavigate } from 'react-router-dom'



export default function UserHome() {

    const userٰInfo = useSelector((state) => state.myAuth);

    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const myProducts = [];
            querySnapshot.forEach((doc) => {
                myProducts.push({ id: doc.id, ...doc.data() });
            });
            setAllProducts(myProducts);
        };
        getProducts();





        const getCategories = async () => {
            const querySnapshot = await getDocs(collection(db, "categories"));
            const myCategories = [];
            querySnapshot.forEach((doc) => {
                myCategories.push({ id: doc.id, ...doc.data() });
            });
            setCategories(myCategories);
        }
        getCategories()


    }, []);


    const filterByCategory = async () => {


        const querySnapshot = await getDocs(collection(db, "products"));
        const myProducts = [];
        querySnapshot.forEach((doc) => {
            myProducts.push({ id: doc.id, ...doc.data() });
        });
        if (document.getElementById("productCategory").value === "all") {
            setAllProducts(myProducts)
            return
        }


        const categoryToFilter = document.getElementById("productCategory").value
        const filteredCategories = myProducts.filter(item => item.productCategory === categoryToFilter)
        setAllProducts(filteredCategories)

    }



    const dispatch = useDispatch();
    const { addToCart } =
        bindActionCreators(actionCreators, dispatch);

    const addProductInCart = (item) => {
        addToCart(item)
    }

    const navigate = useNavigate()
    const cartItems = useSelector(state => state.cartItems)




    return (
        <>
            <div className="user-shop-page">
                <div className="container mt-3">
                    <div className="shop-header d-flex justify-content-between align-items-center">
                        <div className="shop-title">
                            <h1 className='green-text'>SAYLANI WELFARE</h1>
                            <h4 className='blue-text discHeading'>DISCOUNT STORE</h4>
                        </div>
                        <div className="cart">
                            <i className="fa fa-shopping-cart fs-3 c-pointer" aria-hidden="true" onClick={() => navigate('/userCart')}></i>
                            <span className={cartItems.length ? 'cartQty' : 'cartQty d-none'}>{cartItems.length}</span>
                        </div>
                    </div>


                    <div className="mt-2 mb-5 userBg">
                        <img src={userbg} className="img-fluid d-block mx-auto w-m-50" alt="" />
                    </div>





                    <div className="categories">
                        <h6 className='green-text filterHead'>filter by category</h6>
                        <select id="productCategory" onChange={() => filterByCategory()} className='form-control mb-2 border-1'>
                            <option className='filterOpt' value={'all'}>{'All'}</option>
                            {categories.map((item, index) => {
                                return <option key={index} className='filterOpt' value={item.categoryName}>{item.categoryName}</option>;
                            })}
                        </select>
                    </div>







                    <div className="products d-flex flex-column" style={{ marginBottom: "5em" }}>




                        {allProducts.length ? allProducts.map((item, index) => {
                            return (
                                <div className="product d-flex justify-content-between w-100 align-items-center mb-5" key={index}>
                                    <div className="product-image">
                                        <img src={item.productImage} width={'80px'} alt="" />
                                    </div>
                                    <div className="product-details w-25 mx-auto">
                                        <div className="product-title fw-bold">{item.productName}</div>
                                        <div className="product-description">{item.productDesc}</div>
                                    </div>
                                    <div className="cart-price">
                                        <p className='m-0'>{item.unitPrice}</p>
                                        <p>{item.unitName}</p>
                                        <button className="btn btn-success" onClick={() => addProductInCart(item)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            );
                        }) : <h3>No Products</h3>}


                    </div>
                    <div>
                    </div>
                </div>
            </div>

            <UserFooter />
        </>
    )
}