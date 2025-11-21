import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    product_picture: "",
    withoutdis: "",
    price: "",
    category: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

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
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="w-11/12 mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2"
          required
        />

        <input
          name="product_picture"
          value={product.product_picture}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-2"
          required
        />

        <input
          name="withoutdis"
          value={product.withoutdis}
          onChange={handleChange}
          placeholder="Old Price"
          className="w-full border p-2"
          required
        />

        <input
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="New Price"
          className="w-full border p-2"
          required
        />

        <input
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2"
          required
        />

        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;