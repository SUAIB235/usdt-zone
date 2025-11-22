import React from "react";
import Allproducts from "../components/Allproducts";
import Navbar from "../components/Navbar";

const Products = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-20">
        <Allproducts></Allproducts>
      </div>
    </div>
  );
};

export default Products;
