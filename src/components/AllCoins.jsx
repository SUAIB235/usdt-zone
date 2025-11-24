import React, { useEffect, useState } from "react";
import CatagoriesNav from "./CatagoriesNav";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useLocation } from "react-router-dom";

const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectCategory, setSelectCategory] = useState("All");
  const [showAll, setShowall] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "Products"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load product data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter by category and search
  useEffect(() => {
    let filtered = products;

    if (selectCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectCategory, searchQuery]);

  const categories = ["All", ...new Set(products.map((m) => m.category))];
  const visibleProducts = showAll ? filteredProducts : filteredProducts.slice(0, 8);

  return (
    <div className="bg-[#0A0F0D]">
      <div className="w-11/12 mx-auto">
        
        {/* Categories */}
        <CatagoriesNav
          cetgories={categories}
          selectCategory={selectCategory}
          setSelectCategory={setSelectCategory}
        />

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-dots loading-lg text-[#00C389]"></span>
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Show More Button */}
            {filteredProducts.length > 8 && (
              <div className="flex justify-center mt-8">
                <button
                  className="px-6 py-2 rounded-full font-medium transition-all duration-300 
                    border border-[#00C389] text-[#00C389] 
                    hover:bg-[#C9A44C] hover:border-[#C9A44C] hover:text-[#0A0F0D]"
                  onClick={() => setShowall(!showAll)}
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-3xl font-bold text-center text-[#C9A44C] font-pop">
            No Products Found
          </p>
        )}
      </div>
    </div>
  );
};

export default Allproducts;
