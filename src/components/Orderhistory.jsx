import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "Orders"),
          where("userEmail", "==", user.email)
        );

        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(data);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load orders");
      }

      setLoading(false);
    };

    fetchOrders();
  }, [navigate]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="w-11/12 mx-auto mt-5 max-w-3xl font-pop">
      <h2 className="text-3xl font-bold text-center mb-6 text-[#ff8f9c]">
        Your Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-4xl font-bold text-center text-[#ff8f9c] mt-10">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded-xl shadow-sm bg-white"
            >
              <p className="font-semibold text-lg">{order.productTitle}</p>

              <div className="flex justify-between mt-2">
                <span>Quantity:</span>
                <span>{order.quantity}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Price:</span>
                <span>{order.totalPrice} BDT</span>
              </div>

              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-semibold text-[#ff8f9c]">
                  {order.status}
                </span>
              </div>

              {order.date && (
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(order.date.seconds * 1000).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
