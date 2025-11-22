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
      className="font-mon transition-transform duration-300 hover:scale-105 border border-[#E5E7EB] rounded-2xl bg-[#ffffff]"
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

          const payment = paymentMethods[0]; // choose first payment method

          navigate("/checkout", {
            state: { product, payment },
          });
        } catch (err) {
          console.log(err);
          toast.error("Failed to load payment method!");
        }
      }}
    >
      <img
        src={product.product_picture}
        alt={product.title}
        className=" mx-auto object-cover rounded-lg"
      />
      <div className="flex p-2">
        <div>
          <h3 className="text-[#21214c] font-mon">{product.title}</h3>
          <div className="flex text-[#f6a355]">
            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaRegStarHalfStroke />
          </div>
          <div className="flex gap-2 mb-3">
            <p className="line-through">{product.oldprice}</p>{" "}
            <strong>{product.newprice}</strong> BDT
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
