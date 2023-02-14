import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import Footer from '../../components/Footer'

import swal from 'sweetalert';
import { ChakraProvider } from '@chakra-ui/react';
import {
    Box,
    Select
} from '@chakra-ui/react'

import { getDocs, collection, db, doc, setDoc } from '../../config/firebase'
import { useSelector } from 'react-redux';



export default function Order() {


    // I maked these states to pass in useEffect ,for rerendering after updating status
    const [acceptOrders, setAcceptedOrders] = useState([])





    const [adminOrders, setAdminOrders] = useState([])
    useEffect(() => {
        const getAdminOrders = async () => {
            const querySnapshot = await getDocs(collection(db, "Orders"))
            const orders = []
            querySnapshot.forEach((doc) => {
                orders.push({ id: doc.id, ...doc.data() })
            })
            setAdminOrders(orders)
        }
        getAdminOrders()
    }, [acceptOrders])
    console.log(adminOrders)




    const changeStatus = async (status, item) => {
        const docRef = doc(db, "Orders", `${item.id}`)
        await setDoc(docRef, { ...item, status: status })

        const docRefUserOrders = doc(db, "users", `${item.userId}`, "userOrders", `${item.id}`)
        await setDoc(docRefUserOrders, { ...item, status: status })

        if (status === 'delivered') {
            setAcceptedOrders("deliever")
        } else {
            setAcceptedOrders("rejcet")
        }
        swal(`${status.toLocaleUpperCase()}`, `Order ${status}! Successfully`, "success")


    }






    const convertMillisecondsToTime = (milliseconds) => {
        const date = new Date(milliseconds);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let amPm = 'AM';
        if (hours > 12) {
            hours -= 12;
            amPm = 'PM';
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        return `${hours}:${minutes} ${amPm}`;
    };


    return (
        <div>
            <AdminNavbar />

            <h6 className='my-4 blue-text fw-bold'>Orders</h6>

            <div className="order-page" style={{ height: "auto" }}>



                {
                    adminOrders.map((item, index) => {
                        return <div className="order-sec container mb-5" key={index}>

                            <div className="orders d-flex justify-content-between">
                                <div className="user-bio">
                                    <p className='m-0 fw-bold'>{item.fullName}</p>
                                    <small>{convertMillisecondsToTime(item.time)}- {item.status}</small>
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
                            <div className="input-group">
                                <ChakraProvider>

                                    <Box style={{ width: "100%" }} className='mt-2'>
                                        <button className={item.status === 'pending' ? 'btn btn-success mx-2' : 'd-none'} onClick={() => changeStatus('accepted', item)}>Accept</button>
                                        <button className={item.status === 'accepted' ? 'btn btn-info text-white' : 'd-none'} onClick={() => changeStatus('delivered', item)}>Deliver</button>
                                        <button className={item.status === 'pending' ? 'btn btn-danger mx-2' : 'd-none'} onClick={() => changeStatus('rejected', item)}>Reject</button>
                                    </Box>
                                </ChakraProvider>

                            </div>
                            <hr className='w-75 mt-4 container' />
                        </div>
                    })
                }







            </div>

            <br /><br /><br /><br />
            <br /><br /><br /><br />

            <Footer />

        </div>
    )
}