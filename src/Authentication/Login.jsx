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
      toast.success("Login successfully!");
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
    <div className="min-h-screen flex items-center justify-center bg-[#00180d] font-pop">
      <Toaster position="top-right"></Toaster>
      <div className="w-11/12 max-w-sm bg-[#00180d] p-8 rounded-2xl border border-[#2dcd84] shadow">
        <h2 className="text-2xl text-[#2dcd84] font-semibold text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 text-[#2dcd84] p-3 border border-[#2dcd84] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#202020]"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full text-[#2dcd84] mb-2 p-3 border border-[#2dcd84] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#202020]"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-sm mb-5" onClick={() => navigate("/signup")}>
          <p className="text-[#2dcd84]">Don’t have an account yet?</p>
          <p className="text-white">Register instead</p>
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-[#2dcd84] text-[#00180d] py-3 rounded-xl hover:text-[#2dcd84] hover:bg-black  transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}