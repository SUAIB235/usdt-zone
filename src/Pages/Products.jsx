import React from "react";

import Navbar from "../components/Navbar";
import Allproducts from "../components/Allproducts";

const Products = () => {
  return (
    <div className="min-h-screen bg-[#00180d]">
      <Navbar />

      <div className="py-20">
        <Allproducts />
      </div>
    </div>
  );
};

export default Products;
