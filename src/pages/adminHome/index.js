import React, { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import appleImg from "../../images/apple-img.png";
import watermelon from "../../images/water-mellon.png";
import mango from "../../images/mango.png";
import Footer from "../../components/Footer";

import { useEffect } from "react";
import { useSelector } from "react-redux";

import { getDocs, collection, db } from "./../../config/firebase";

export default function Index() {
  const userٰInfo = useSelector((state) => state.myAuth);

  const [allProducts, setAllProducts] = useState([]);

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
  }, []);


  return (
    <>
      <AdminNavbar />
      <div className="horizontal-card-sec container" >
        <h6 className="mt-5 mb-5 blue-text fw-bold">All Products</h6>

        {allProducts.map((item, index) => {
          return (
            <div
              className="hp-card d-flex justify-content-between align-items-center mb-3"
              key={index}
            >
              <div className="p-img">
                <img
                  src={item.productImage}
                  className="img-fluid"
                  width="80px"
                  alt=""
                />
              </div>
              <div className="p-info">
                <p className="green-text fw-bold">{item.productName}</p>
                <p className="text-secondary fw-bold">
                  1 {item.unitName}
                </p>
              </div>
              <div className="p-price">
                <p className="text-secondary fw-bold">{item.unitPrice}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}
