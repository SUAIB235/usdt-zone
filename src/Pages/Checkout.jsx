import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";


export default function Checkout() {
    
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (!user) {
      navigate("/login");
    } 
  });

  return unsubscribe;
}, [navigate]);


  const [quantity, setQuantity] = useState(1);
  const DELIVERY_CHARGE = 80;

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQty = () => {
    setQuantity(quantity + 1);
  };

  const totalProductPrice = quantity * Number(product?.newprice || 0);
  const subTotal = totalProductPrice + DELIVERY_CHARGE;

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    trxId: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleOrder = async () => {
  if (!form.name || !form.email || !form.address || !form.trxId) {
    return toast.error("Please fill all fields");
  }

  setLoading(true);

  try {
    await addDoc(collection(db, "Orders"), {
      productId: product.id,
      productTitle: product.title,
      price: product.newprice,
      quantity,
      totalPrice: subTotal,
      name: form.name,
      email: form.email,
      address: form.address,
      trxId: form.trxId,
      status: "pending",
      date: serverTimestamp(),
    });

    toast.success("Order Confirmed!");

    setTimeout(() => {
      navigate("/");
    }, 10000);

  } catch (error) {
    console.log(error);
    toast.error("Order failed!");
  }

  setLoading(false);
};

  if (!product) {
    return <h2 className="text-center text-[#ad191b] mt-10">No product selected</h2>;
  }

  return (
    <div className="w-11/12 mx-auto mt-6 max-w-xl font-pop">
        <Toaster position='top-right'></Toaster>
      <h2 className="text-3xl font-bold text-center mb-6 text-[#ff8f9c]">
        Checkout
      </h2>

      <div className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#202020]">
        <img
          src={product.product_picture}
          alt={product.title}
          className="w-40 mx-auto rounded-lg"
        />
        <h3 className="text-xl text-center mt-3">
          {product.title}
        </h3>
        <p className="text-center text-lg font-semibold text-black">
          {product.newprice} BDT
        </p>

        <div className="w-25 flex items-center justify-center gap-4 mt-4 border border-gray-300">
          <button
            onClick={decreaseQty}
            className="px-2 text-xl"
          >
            -
          </button>

          <span className="text-2xl">{quantity}</span>

          <button
            onClick={increaseQty}
            className="px-2 text-xl"
          >
            +
          </button>
        </div>

        <div className="mt-5 w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#202020]">
          <p className="flex justify-between text-lg">
            <span>Product Total</span>
            <span className=" text-lg font-semibold text-black">{totalProductPrice} BDT</span>
          </p>
          <p className="flex justify-between text-lg mt-2">
            <span>Delivery Charge</span>
            <span className=" text-lg font-semibold text-black">{DELIVERY_CHARGE} BDT</span>
          </p>
          <hr className="my-3" />
          <p className="flex justify-between text-xl font-bold text-black">
            <span>Subtotal</span>
            <span>{subTotal} BDT</span>
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <input
          name="name"
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#202020]"
        />

        <input
          name="email"
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#202020]"
        />

        <textarea
          name="address"
          onChange={handleChange}
          placeholder="Full Address"
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#202020]"
        ></textarea>

        <div className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#202020]">
          <p className="text-sm text-gray-700 leading-6">
            <strong>Payment Number:</strong> 01XXXXXXXXX  
            <br />
            Send payment first, then enter the transaction ID below.
          </p>
        </div>

        <input
          name="trxId"
          onChange={handleChange}
          placeholder="Transaction ID"
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#202020]"
        />

        <button
          onClick={handleOrder}
          disabled={loading}
          className="bg-black text-white text-lg px-4 py-3 w-full rounded-lg shadow mb-5 hover:bg-[#ff8f9c] transition"
        >
          {loading ? "Confirming..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
}
