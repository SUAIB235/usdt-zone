import React from "react";

import Navbar from "../components/Navbar";
import AllCoins from "../components/AllCoins";

const Products = () => {
  return (
    <div className="min-h-screen bg-[#00180d]">
      <Navbar />

      <div className="py-20">
        <AllCoins />
      </div>
    </div>
  );
};

export default Products;
