import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password. Try again.");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid email format.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F0D] font-pop">
      <Toaster position="top-right" />

      <div className="w-11/12 max-w-sm bg-[#111916] p-8 rounded-2xl border border-[#00C389] shadow-xl shadow-black/40">
        <h2 className="text-3xl text-[#00C389] font-bold text-center mb-8">
          Login
        </h2>

        {/* EMAIL INPUT */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full mb-5 p-3 rounded-xl bg-[#0D1512] text-[#E5FFF5] border border-[#00C389] focus:outline-none focus:ring-2 focus:ring-[#00C389]"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD INPUT */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-5 p-3 rounded-xl bg-[#0D1512] text-[#E5FFF5] border border-[#00C389] focus:outline-none focus:ring-2 focus:ring-[#00C389]"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* SIGNUP LINK */}
        <div
          className="text-sm mb-6 text-center cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          <p className="text-[#E5FFF5]">Don't have an account?</p>
          <p className="text-[#C9A44C] font-semibold">Register now</p>
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full bg-[#00C389] text-[#0A0F0D] py-3 rounded-xl text-lg font-semibold
          hover:bg-[#C9A44C] hover:text-[#0A0F0D] transition shadow-md"
        >
          Login
        </button>
      </div>
    </div>
  );
}
