// app/dashboard/kasir/page.js
"use client";

import { useState, useEffect } from "react";

export default function KasirPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("http://localhost:3000/orders");
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders(); // Initial fetch

    // Polling setiap 5 detik
    const interval = setInterval(fetchOrders, 5000);

    return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
  }, []);
  return (
    <div>
      <h1>Kasir Dashboard</h1>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Date</th>
              <th>Item</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.no}</td>
                <td>{order.date}</td>
                <td>{order.item}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
}
