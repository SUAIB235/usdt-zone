import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="font-mon mt-5 transition-all duration-300 
      hover:scale-105 hover:border-[#C9A44C]
      border border-[#00C389] rounded-2xl 
      bg-[#111916] shadow-lg cursor-pointer h-60 md:h-70"
      onClick={async () => {
        try {
          const snap = await getDocs(collection(db, "PaymentMethods"));
          const paymentMethods = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          if (paymentMethods.length === 0) {
            toast.error("No payment method available!");
            return;
          }

          const payment = paymentMethods[0];

          navigate("/checkout", {
            state: { product, payment },
          });
        } catch (err) {
          console.log(err);
          toast.error("Failed to load payment method!");
        }
      }}
    >
      {/* Product Image */}
      <img
        src={product.product_picture}
        alt={product.title}
        className="h-[120px] w-[120px] lg:h-[65%] mx-auto lg:w-[65%] object-cover rounded-lg"
      />

      {/* Product Details */}
      <div className="p-3">
        <h3 className="text-[#00C389] font-semibold text-md mb-1">
          {product.title}
        </h3>

        {/* Stars */}
        <div className="flex text-[#C9A44C] mb-1">
          <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaRegStarHalfStroke />
        </div>

        {/* Price */}
        <div className="flex gap-2 text-[#E5FFF5]">
          <p className="line-through opacity-70 mb-2">{product.oldprice}</p>
          <strong className="text-[#C9A44C]">{product.newprice}</strong> BDT
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
