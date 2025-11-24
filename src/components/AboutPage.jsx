import React from "react";

export default function About() {
  return (
    <div className="bg-[#0A0F0D] min-h-screen flex justify-center items-center">
      <div className="w-11/12 max-w-4xl mx-auto py-25 font-pop">
        
        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center text-[#2dcd84] mb-8">
          About Us
        </h1>

        {/* MAIN ABOUT TEXT */}
        <div className="space-y-6 text-white text-lg leading-8 bg-[#111916] p-6 rounded-xl border border-[#2dcd84] shadow">
          <p>
            Welcome to <strong className="text-[#2dcd84]">TrendZone</strong>! We are committed 
            to bringing you high-quality products with a smooth and enjoyable shopping experience.
          </p>

          <p>
            Our team carefully selects every product to ensure top-notch quality, reliability, 
            and value. We believe in honesty, customer care, and providing the best service possible.
          </p>

          <p>
            Whether you're here to explore, shop, or discover new trends, we aim to make your 
            journey easy and exciting. Customer happiness is our biggest priority.
          </p>

          <p>
            Thank you for choosing <strong className="text-[#2dcd84]">TrendZone</strong>. 
            We appreciate your support and hope to serve you again!
          </p>
        </div>

        {/* THREE CARDS SECTION */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* MISSION */}
          <div className="p-6 border border-[#2dcd84] rounded-xl text-center bg-[#111916] shadow hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-[#2dcd84] mb-2">Our Mission</h3>
            <p className="text-white">
              Deliver top-quality products and guarantee customer satisfaction.
            </p>
          </div>

          {/* VISION */}
          <div className="p-6 border border-[#2dcd84] rounded-xl text-center bg-[#111916] shadow hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-[#2dcd84] mb-2">Our Vision</h3>
            <p className="text-white">
              Become a trusted online shopping destination globally.
            </p>
          </div>

          {/* VALUES */}
          <div className="p-6 border border-[#2dcd84] rounded-xl text-center bg-[#111916] shadow hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-[#2dcd84] mb-2">Our Values</h3>
            <p className="text-white">
              Quality, transparency, trust, and customer happiness.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
