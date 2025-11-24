import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // ✅ ADD THIS
import { db } from "../firebase"; // ✅ ADD THIS
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // 🔥 Create auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 🔥 Update display name
      await updateProfile(user, { displayName: name });

      // 🔥 Save user to Firestore → Users collection
      await setDoc(doc(db, "Users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        role: "user", // <— default role
        createdAt: new Date().toISOString(),
      });

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered.");
      } else if (err.code === "auth/weak-password") {
        toast.error("Password must be at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid email format.");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00180d] font-pop">
      <Toaster position="top-right" />
      <div className="w-11/12 max-w-sm bg-[#00180d] p-8 rounded-2xl border border-[#2dcd84] shadow">
        <h2 className="text-2xl text-[#2dcd84] font-semibold text-center mb-6">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-3 border text-[#2dcd84] border-[#2dcd84] rounded-xl focus:outline-none"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-5 p-3 border text-[#2dcd84] border-[#2dcd84] rounded-xl focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-5 p-3 border text-[#2dcd84] border-[#2dcd84] rounded-xl focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-2 p-3 border text-[#2dcd84] border-[#2dcd84] rounded-xl focus:outline-none"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div
          className="text-sm mb-5 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          <p className="text-[#2dcd84]">Already have an account?</p>
          <p className="text-white">Login instead</p>
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-[#2dcd84] text-[#00180d] py-3 rounded-xl hover:text-[#2dcd84] hover:bg-[#000000] transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}