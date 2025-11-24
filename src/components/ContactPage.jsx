import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "ContactMessages"), {
        ...form,
        date: serverTimestamp(),
      });

      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message!");
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#0A0F0D] min-h-screen flex justify-center items-center">
      <div className="w-11/12 max-w-2xl mx-auto py-25 font-pop">
        <Toaster position="top-right" />

        <h1 className="text-4xl font-bold text-center text-[#2dcd84] mb-4">
          Contact Us
        </h1>

        <p className="text-center text-white mb-10 leading-relaxed">
          Feel free to reach out to us anytime.  
          Our support team is here to help you.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full mb-5 p-3 rounded-xl bg-[#0D1512] text-[#E5FFF5] border border-[#00C389] focus:outline-none focus:ring-2 focus:ring-[#00C389]"
            required
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            type="email"
            className="w-full mb-5 p-3 rounded-xl bg-[#0D1512] text-[#E5FFF5] border border-[#00C389] focus:outline-none focus:ring-2 focus:ring-[#00C389]"
            required
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            className="w-full mb-5 p-3 rounded-xl bg-[#0D1512] text-[#E5FFF5] border border-[#00C389] focus:outline-none focus:ring-2 focus:ring-[#00C389]"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00C389] text-[#0A0F0D] py-3 rounded-xl text-lg font-semibold
          hover:bg-[#C9A44C] hover:text-[#0A0F0D] transition shadow-md"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* CONTACT INFO */}
        <div className="mt-12 text-center text-white space-y-1">
          <p>Email: support@trendzone.com</p>
          <p>Phone: +8801940686844</p>
          <p>Address: Sherpur Sadar, Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>
  );
}
