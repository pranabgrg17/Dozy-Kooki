import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';
import './Orders.css';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });

      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]); // Added url as dependency

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel icon" />
            <div>
              <div className="order-item-food">
                {order.items.map((item, index) => (
                  <span key={item._id}>
                    {item.name} × {item.quantity}
                    {index < order.items.length - 1 && ", "}
                  </span>
                ))}
              </div>
              <p className="order-item-name">
                {order.address?.firstName} {order.address?.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address?.email}</p>
                <p>{order.address?.phone}</p>
                <p>Table: {order.tableNo}</p>
              </div>
            </div>
            <p>Items: {order.items.length}</p>
            <p>Rs {order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;