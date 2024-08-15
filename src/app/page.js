// app/client/page.js
"use client";

import { useState } from "react";

export default function ClientPage() {
  const [order, setOrder] = useState({
    no: "",
    date: "",
    item: "",
    total: "",
    status: "pending",
  });

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    const result = await response.json();
    console.log("Order saved:", result);

    // Reset form
    setOrder({
      no: "",
      date: "",
      item: "",
      total: "",
      status: "pending",
    });
  };

  return (
    <div>
      <h1>Client - Make an Order</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="no"
          value={order.no}
          onChange={handleChange}
          placeholder="Order No"
          required
        />
        <input
          type="date"
          name="date"
          value={order.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="item"
          value={order.item}
          onChange={handleChange}
          placeholder="Item"
          required
        />
        <input
          type="number"
          name="total"
          value={order.total}
          onChange={handleChange}
          placeholder="Total"
          required
        />
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}
