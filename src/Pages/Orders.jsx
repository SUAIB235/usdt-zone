import React from "react";
import Navbar from "../components/Navbar";
import OrderHistory from "../components/Orderhistory";

const Orders = () => {
  return (
    <div className="min-h-screen bg-[#0A0F0D]">
      <Navbar></Navbar>
      <div className="py-20">
        <OrderHistory></OrderHistory>
      </div>
    </div>
  );
};

export default Orders;
