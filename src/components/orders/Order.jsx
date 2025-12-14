import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ScaleLoader } from "react-spinners";
import './order.css'
function Order() {
  const [orders, setOrders] =useState([])
  const [error, setError]=useState(null)

  const [loading, setLoading]=useState(true)

  useEffect(()=>{
    const fetchOrder = async()=>{
      try {
        setError('')
        setLoading(true)
        const url = ` https://abhotel.josephteka.com/api/order`
        const res = await axios.get(url)
        setOrders(res.data.orders)
        setLoading(false)
      } catch (error) {
        setError('Something went wrong while fetching orders : ' + error.message)
        
        setLoading(false)
      }
    }
    fetchOrder()
  }, [])

  const timeAgo = (datestring)=>{
    const now = new Date()
    const postdate = new Date(datestring)

    const milisecond = now-postdate;

    //1000ms = 1s
    //60s = 1min=60000ms
    const minute = Math.floor(milisecond/60000)
    const hours = Math.floor(minute/60)
    const day = Math.floor(hours/24)

    if(minute<1) return "just now"

    if(minute<60) return `${minute}min${minute > 1 ? "s" : ""} ago`;

    if(hours<24) return `${hours}hour${hours>1?'s':''} ago `

    if(day===1) return `yesterday`
    return `${day}days ago`
  }

  return (
    <div className="orders-container">
      <h2>All Orders</h2>

      {error && <div className="error-message">{error}</div>}


      {loading ? (
        <div className="loading">
          <ScaleLoader color="#36d7b7" />
        </div>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>UserName</th>
              <th>Phone</th>
              <th>Menu Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Ordered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.order_id}>
                <td>{o.user_name}</td>
                <td>{o.user_phone}</td>
                <td>{o.menu_title}</td>
                <td>${Number(o.menu_price).toFixed(2)}</td>
                <td>{o.quantity}</td>
                <td>${Number(o.total_price).toFixed(2)}</td>
                <td>{timeAgo(o.order_date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Order
