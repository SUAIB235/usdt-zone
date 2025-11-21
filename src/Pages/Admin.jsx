import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    product_picture: "",
    oldprice: "",
    newprice: "",
    category: "",
  });

  const [productsList, setProductsList] = useState([]);

  // INPUT HANDLER
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // ADD PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Products"), product);
      toast.success("Product added!");

      setProduct({
        title: "",
        product_picture: "",
        withoutdis: "",
        price: "",
        category: "",
      });

      fetchProducts(); // refresh list
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    }
  };

  // FETCH ALL PRODUCTS
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "Products"));
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProductsList(items);
  };

  // LOAD PRODUCTS ON PAGE OPEN
  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "Products", id));
    toast.success("Product deleted!");
    setProductsList(productsList.filter((item) => item.id !== id));
  };

  return (
    <div className="w-11/12 mx-auto font-mon mt-10">
      <h2 className="text-2xl font-bold mb-5">Add Product</h2>

      {/* ADD PRODUCT FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#202020]"
          required
        />

        <input
          name="product_picture"
          value={product.product_picture}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#202020]"
          required
        />

        <input
          name="oldprice"
          value={product.oldprice}
          onChange={handleChange}
          placeholder="Old Price"
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#202020]"
          required
        />

        <input
          name="newprice"
          value={product.newprice}
          onChange={handleChange}
          placeholder="New Price"
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#202020]"
          required
        />

        <input
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#202020]"
          required
        />

        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Add Product
        </button>
      </form>

      {/* PRODUCT LIST */}
      <h2 className="text-xl font-bold mt-10 mb-4">All Products</h2>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-6 ">
        {productsList.map((item) => (
          <div className="px-3 border border-gray-300 rounded-xl" key={item.id}>
            <img
              src={item.product_picture}
              alt={item.title}
              className="w-auto h-auto object-cover rounded"
            />

            <h3 className="font-bold mt-2">{item.title}</h3>
            <p>New Price: {item.newprice}</p>
            <p>Old Price: {item.oldprice}</p>
            <p>Category: {item.category}</p>

            {/* DELETE BUTTON ONLY */}
            <button
              onClick={() => deleteProduct(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-3 mb-3 w-25"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProduct;
