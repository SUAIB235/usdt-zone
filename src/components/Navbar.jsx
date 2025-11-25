import { useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const adminEmail = "suaibhasan00@gmail.com";
  const [isAdmin, setIsAdmin] = useState(false);

  const link = (
    <>
      <li className="text-[#2dcd84] hover:text-white transition" onClick={() => navigate("/")}>Home</li>
      <li className="text-[#2dcd84] hover:text-white transition" onClick={() => navigate("/coins")}>Coins</li>
      <li className="text-[#2dcd84] hover:text-white transition" onClick={() => navigate("/orders")}>Orders</li>
      <li className="text-[#2dcd84] hover:text-white transition" onClick={() => navigate("/about")}>About</li>
      <li className="text-[#2dcd84] hover:text-white transition" onClick={() => navigate("/contact")}>Contact</li>
    </>
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    navigate(`/coins?search=${searchTerm}`);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsAdmin(user?.email === adminEmail);
    });
    return unsubscribe;
  }, []);

  const handleIconClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setShowPopup(false);
    navigate("/");
  };

  return (
    <div className="navbar bg-[#00180d] border-b border-[#2dcd84]/20 backdrop-blur-md fixed top-0 left-0 right-0 z-50 font-mon">
      <div className="w-11/12 mx-auto flex justify-between items-center py-3">

        {/* Left Side */}
       <div className="navbar-start flex items-center gap-6">
         <div className="flex items-center gap-1">

          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost p-0">
              <CiMenuBurger className="text-[#2dcd84] text-xl" />
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content border border-[#2dcd84] bg-[#00180d] rounded-xl z-20 mt-3 w-56 p-3 shadow-lg"
            >
              {link}
            </ul>
          </div>

          {/* Logo */}
          <a
            onClick={() => navigate("/")}
            className="font-mon font-bold text-[#2dcd84] text-xl md:text-2xl lg:text-4xl cursor-pointer"
          >
            USDTZONE
          </a>
        </div>
         {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex gap-6">{link}</ul>
          </div>
       </div>

        {/* Right Side */}
        <div className="navbar-end flex items-center gap-3 md:gap-6">

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 rounded-full px-3 py-2 border border-[#2dcd84] bg-transparent"
          >
            <IoMdSearch className="text-[#2dcd84] text-2xl md:text-2xl" />
            <input
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-sm text-[#2dcd84] placeholder-[#2dcd84] w-15 md:w-40"
            />
          </form>

          {/* Profile Icon */}
          <div className="relative">
            <div
              className="cursor-pointer"
              onClick={handleIconClick}
            >
              <IoPersonOutline className="text-[#2dcd84] text-2xl" />
            </div>

            {/* Popup */}
            {user && showPopup && (
              <div className="absolute right-0 top-12 border border-[#2dcd84] bg-[#00180d] rounded-xl shadow-lg p-3 w-56 text-center z-50">
                <p className="text-sm text-[#2dcd84] break-all">{user.email}</p>

                {isAdmin && (
                  <button
                    onClick={() => navigate("/admin")}
                    className="mt-3 w-full bg-[#2dcd84] text-[#00180d] py-1.5 rounded-xl border border-[#2dcd84] hover:bg-transparent hover:text-[#2dcd84] transition"
                  >
                    Admin Panel
                  </button>
                )}

                <button
                  onClick={() => navigate("/orders")}
                  className="mt-3 w-full bg-[#2dcd84] text-[#00180d] py-1.5 rounded-xl border border-[#2dcd84] hover:bg-transparent hover:text-[#2dcd84] transition"
                >
                  Order History
                </button>

                <button
                  onClick={logout}
                  className="mt-3 w-full bg-[#2dcd84] text-[#00180d] py-1.5 rounded-xl border border-[#2dcd84] hover:bg-transparent hover:text-[#2dcd84] transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
