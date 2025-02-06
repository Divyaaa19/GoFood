import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});

    // Fetch the order data from the backend
    const fetchMyOrder = async () => {
        let userEmail = localStorage.getItem("userEmail");
        try {
            let response = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail })
            });

            if (response.ok) {
                let json = await response.json();
                setOrderData(json.orderData);  // Update the state with the fetched data
                console.log("Orders fetched:", json);
            } else {
                console.error('Failed to fetch orders. Status:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Fetch order data when the component is mounted
    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {/* Check if there is order data */}
                    {orderData.order_data && orderData.order_data.length > 0 ? 
                        orderData.order_data.map((order, index) => (
                            <div key={index}>
                                {order.map((arrayData, idx) => (
                                    <div key={idx}>
                                        {/* If it's the order date, display it separately */}
                                        {arrayData.Order_data ? (
                                            <div className='m-auto mt-5'>
                                                <h4>Order Date: {arrayData.Order_data}</h4>
                                                <hr />
                                            </div>
                                        ) : (
                                            <div className='col-12 col-md-6 col-lg-3'>
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                            <span className='m-1'>Quantity: {arrayData.qty}</span>
                                                            <span className='m-1'>Size: {arrayData.size}</span>
                                                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                ₹{arrayData.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))
                    : (
                        <div className='m-5 w-100 text-center fs-3'>No Orders Found!</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
