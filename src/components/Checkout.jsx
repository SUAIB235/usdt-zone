import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Swal from "sweetalert2";
import { IoCashOutline } from "react-icons/io5";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) navigate("/login");
    });
    return unsubscribe;
  }, [navigate]);

  const [quantity, setQuantity] = useState(1);
  const DELIVERY_CHARGE = 0;

  const totalProductPrice = quantity * Number(product?.newprice || 0);
  const subTotal = totalProductPrice + DELIVERY_CHARGE;

  const decreaseQty = () => quantity > 1 && setQuantity(quantity - 1);
  const increaseQty = () => setQuantity(quantity + 1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    uid: "",
    clientno: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // PAYMENT METHODS
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      const snap = await getDocs(collection(db, "PaymentMethods"));
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPaymentMethods(list);
      if (list.length > 0) setSelectedPayment(list[0]);
    };

    fetchPayments();
  }, []);

  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!form.name || !form.email || !form.uid || !form.clientno)
      return toast.error("Please fill all fields");

    if (!selectedPayment) return toast.error("Please select a payment method");

    setLoading(true);

    try {
      await addDoc(collection(db, "Orders"), {
        userEmail: auth.currentUser.email,
        productId: product.id,
        productTitle: product.title,
        price: product.newprice,
        quantity,
        totalPrice: subTotal,
        name: form.name,
        email: form.email,
        uid: form.uid,
        clientno: form.clientno,
        payment_type: selectedPayment.payment_type,
        payment_no: selectedPayment.payment_no,
        status: "pending",
        date: serverTimestamp(),
      });

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Order Confirmed!",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => navigate("/orders"), 2000);
    } catch (error) {
      console.log(error);
      toast.error("Order failed!");
    }

    setLoading(false);
  };

  if (!product) {
    return (
      <h2 className="text-4xl font-bold text-center text-[#00C389] mt-10">
        No product selected
      </h2>
    );
  }

  return (
    <div className="bg-[#0A0F0D] min-h-screen text-[#E5FFF5]">
      <div className="w-11/12 mx-auto max-w-xl font-pop pb-10">
        <Toaster position="top-right" />

        <h2 className="text-3xl font-bold text-center py-10 text-[#00C389]">
          Checkout
        </h2>

        {/* PRODUCT */}
        <div className="mb-4 p-4 border border-[#00C389] rounded-xl bg-[#111916] shadow-lg shadow-black/30">
          <img
            src={product.product_picture}
            alt={product.title}
            className="w-40 mx-auto rounded-lg"
          />

          <h3 className="text-xl text-center text-[#00C389] mt-3 font-semibold">
            {product.title}
          </h3>

          <p className="text-center text-[#C9A44C] text-lg font-bold">
            {product.newprice} BDT
          </p>

          <div className="mt-4">
            <p className="text-lg font-semibold text-[#00C389]">Description</p>
            <p className="text-sm mt-1 leading-relaxed text-[#E5FFF5]">
              {product.product_description}
            </p>
          </div>

          {/* Quantity */}
          <div className="flex items-center justify-center gap-4 mt-5 border border-[#00C389] text-[#00C389] rounded-lg py-2 bg-[#0A0F0D]">
            <button onClick={decreaseQty} className="px-3 text-xl">
              -
            </button>
            <span className="text-2xl text-[#C9A44C]">{quantity}</span>
            <button onClick={increaseQty} className="px-3 text-xl">
              +
            </button>
          </div>

          {/* Price Summary */}
          <div className="mt-5 p-4 border border-[#00C389] rounded-xl bg-[#0D1512]">
            <p className="flex justify-between text-lg">
              <span>Product Total</span>
              <span>{totalProductPrice} BDT</span>
            </p>

            <p className="flex justify-between text-lg mt-2">
              <span>Platform Fee</span>
              <span>{DELIVERY_CHARGE} BDT</span>
            </p>

            <p className="flex justify-between text-lg mt-2">
              <span>Delivery In</span>
              <span>5-30 Minutes</span>
            </p>

            <hr className="my-3 border-[#17382d]" />

            <p className="flex justify-between text-xl font-bold text-[#C9A44C]">
              <span>Subtotal</span>
              <span>{subTotal} BDT</span>
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <input
            name="name"
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border border-[#00C389] rounded-xl bg-[#111916] text-[#E5FFF5]"
          />

          <input
            name="email"
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 border border-[#00C389] rounded-xl bg-[#111916] text-[#E5FFF5]"
          />

          <textarea
            name="uid"
            onChange={handleChange}
            placeholder="Binance UID"
            className="w-full p-3 border border-[#00C389] rounded-xl bg-[#111916] text-[#E5FFF5]"
          ></textarea>

          {/* PAYMENT METHODS */}
          <div className="p-4 border border-[#00C389] rounded-xl bg-[#111916]">
            <h3 className="text-lg font-bold mb-3 text-[#00C389]">
              Select Payment Method
            </h3>

            {paymentMethods.length === 0 ? (
              <p className="text-sm">No payment methods found!</p>
            ) : (
              paymentMethods.map((pm) => (
                <label
                  key={pm.id}
                  className={`flex items-center gap-3 p-3 mb-2 border rounded-xl cursor-pointer transition-all 
                  ${
                    selectedPayment?.id === pm.id
                      ? "border-[#C9A44C] bg-[#0D1512]"
                      : "border-[#1e2b25] bg-[#111916]"
                  }`}
                >
                  <input
                    type="radio"
                    checked={selectedPayment?.id === pm.id}
                    onChange={() => setSelectedPayment(pm)}
                  />
                  <div className="flex items-center gap-3">
                    <IoCashOutline className="text-xl text-[#C9A44C]" />
                    <div>
                      <p className="font-semibold text-[#E5FFF5]">
                        {pm.payment_type}
                      </p>
                      <p className="text-sm text-[#C9A44C]">{pm.payment_no}</p>
                    </div>
                  </div>
                </label>
              ))
            )}

            {selectedPayment && (
              <p className="text-sm mt-2 text-[#E5FFF5]">
                Send payment to{" "}
                <strong className="text-[#C9A44C]">
                  {selectedPayment.payment_no}
                </strong>{" "}
                and enter your number below.
              </p>
            )}
          </div>

          <input
            name="clientno"
            onChange={handleChange}
            placeholder="Enter Your Number"
            className="w-full p-3 border border-[#00C389] rounded-xl bg-[#111916] text-[#E5FFF5]"
          />

          {/* BUTTON */}
          <button
            onClick={handleOrder}
            disabled={loading}
            className="bg-[#00C389] text-[#0A0F0D] text-lg px-4 py-3 w-full rounded-lg shadow-lg hover:bg-[#C9A44C] transition font-semibold"
          >
            {loading ? "Confirming..." : "Confirm Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
