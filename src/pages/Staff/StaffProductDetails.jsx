// src/pages/Dashboard/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts";

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Toys",
  "Other",
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, updateProduct } = useProducts();

  const [product, setProduct] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductById(id);
      setProduct(data);
    };
    fetchData();
  }, [id]);

  if (!product)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        <span className="ml-4 text-blue-700 text-lg">Loading product...</span>
      </div>
    );

  // ✅ FIX: handleChange with fallback for price (number)
  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    await updateProduct(id, product);
    setSaving(false);
    setEditing(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Product Details</h2>
      {editing ? (
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={product.title || ""}
            onChange={handleChange}
            placeholder="Title"
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="number"
            name="price"
            value={product.price ?? ""}
            onChange={handleChange}
            placeholder="Price"
            className="border rounded px-3 py-2 w-full"
          />
          <textarea
            name="description"
            value={product.description || ""}
            onChange={handleChange}
            placeholder="Description"
            className="border rounded px-3 py-2 w-full"
            rows={3}
          />
          <select
            name="category"
            value={product.category || ""}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full bg-white"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="image"
            value={product.image || ""}
            onChange={handleChange}
            placeholder="Image URL"
            className="border rounded px-3 py-2 w-full"
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center ${
                saving ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {saving ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <img
            src={
              product.image ||
              "https://via.placeholder.com/300x200?text=No+Image"
            }
            alt={product.title}
            className="w-full h-56 object-cover rounded mb-4"
          />
          <h3 className="text-xl font-semibold">{product.title}</h3>
          <p className="text-blue-700 font-bold text-lg">₦{product.price}</p>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-gray-600">
            Category: <span className="font-medium">{product.category}</span>
          </p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
