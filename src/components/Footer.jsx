import { useNavigate } from "react-router-dom";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#0A0F0D] text-[#E5FFF5] font-pop border-t border-[#2dcd84]/20 py-5">
      <div className="w-11/12 max-w-6xl mx-auto py-5 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#00C389] mb-3">USDTZONE</h2>
          <p className="text-[#C9A44C] text-sm">
            Your trusted e-shop for USDT and crypto services. Fast, secure and always reliable.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-[#00C389] mb-3">Quick Links</h3>
          <ul className="space-y-2 text-[#E5FFF5]">
            <li
              className="hover:text-[#C9A44C] cursor-pointer transition"
              onClick={() => (window.location.href = "/")}
            >
              Home
            </li>
            <li
              className="hover:text-[#C9A44C] cursor-pointer transition"
              onClick={() => navigate("/coins")}
            >
              Products
            </li>
            <li
              className="hover:text-[#C9A44C] cursor-pointer transition"
              onClick={() => navigate("/about")}
            >
              About
            </li>
            <li
              className="hover:text-[#C9A44C] cursor-pointer transition"
              onClick={() => navigate("/contact")}
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold text-[#00C389] mb-3">Contact Us</h3>
          <p className="text-[#C9A44C] text-sm mb-3">Email: support@usdtzone.store</p>
          <p className="text-[#C9A44C] text-sm mb-3">Phone: +8801940686844</p>

          <div className="flex gap-3 mt-3">
            <a
              href="#"
              className="bg-[#00C389] hover:bg-[#C9A44C] transition p-2 rounded-full text-[#0A0F0D]"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-[#00C389] hover:bg-[#C9A44C] transition p-2 rounded-full text-[#0A0F0D]"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-[#00C389] hover:bg-[#C9A44C] transition p-2 rounded-full text-[#0A0F0D]"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-[#00C389] hover:bg-[#C9A44C] transition p-2 rounded-full text-[#0A0F0D]"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#00C389] py-4 text-center text-[#C9A44C] text-sm">
        &copy; {new Date().getFullYear()} USDTZONE. All rights reserved.
      </div>
    </footer>
  );
}
