import React, { useState, useEffect } from 'react';
import { getOrders } from "../services/orderApi";
import './BoardGames.css'


const OrdersList = () => {

    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    // Fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchOrders();
    }, []);


    return (
        <div className="container">
            <h2>Recent Orders</h2>
            {error && <div>Error: {error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Board Game Name</th>
                        <th>Warehouse Name</th>
                        <th>Quantity Ordered</th>
                        <th>Date Submitted</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            <td>{order.boardgame.name}</td>
                            <td>{order.warehouse.name}</td>
                            <td>{order.quantity}</td>
                            <td>{order.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}



export default OrdersList