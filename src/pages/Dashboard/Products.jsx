import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function Products() {
  const { products, createProduct, deleteProduct, loading, error } = useProducts();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const [actionLoading, setActionLoading] = useState(false);
  const [actionType, setActionType] = useState(""); // "create" or "delete"

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionType("create");
    setActionLoading(true);
    await createProduct(form);
    setForm({ title: "", price: "", description: "", category: "", image: "" });
    setActionLoading(false);
    setActionType("");
  };

  const handleDelete = async (id) => {
    setActionType("delete");
    setActionLoading(true);
    await deleteProduct(id);
    setActionLoading(false);
    setActionType("");
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-extrabold mb-10 text-blue-800 tracking-tight text-center">
        Products Dashboard
      </h1>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 border border-blue-100"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product Title"
          required
          className="border border-blue-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={actionLoading && actionType === "create"}
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="border border-blue-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={actionLoading && actionType === "create"}
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="border border-blue-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={actionLoading && actionType === "create"}
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="border border-blue-200 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={actionLoading && actionType === "create"}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="border border-blue-200 rounded-lg px-4 py-3 col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={3}
          disabled={actionLoading && actionType === "create"}
        />
        <button
          type="submit"
          className={`bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-500 transition col-span-1 md:col-span-2 flex items-center justify-center shadow-lg ${actionLoading && actionType === "create" ? "opacity-60 cursor-not-allowed" : ""}`}
          disabled={actionLoading && actionType === "create"}
        >
          {actionLoading && actionType === "create" ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Creating...
            </>
          ) : (
            "Add Product"
          )}
        </button>
      </form>

      {/* Error & Loading */}
      {loading && (
        <div className="flex items-center justify-center mb-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-600"></div>
          <span className="ml-3 text-blue-600 font-medium">Loading products...</span>
        </div>
      )}
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {Array.isArray(products) && products.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col border border-blue-100 hover:shadow-2xl transition"
          >
            <img
              src={p.image || "https://via.placeholder.com/300x200?text=No+Image"}
              alt={p.title}
              className="w-full h-56 object-cover bg-gray-100"
            />
            <div className="p-6 flex-1 flex flex-col">
              <h2 className="text-xl font-bold mb-2 text-blue-700">{p.title}</h2>
              <p className="text-gray-600 mb-1">Category: <span className="font-medium">{p.category}</span></p>
              <p className="text-gray-700 mb-3">{p.description}</p>
              <div className="flex items-center justify-between mt-auto gap-2">
                <span className="text-blue-700 font-bold text-2xl">₦{p.price}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/dashboard/products/${p._id}`)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition font-semibold shadow"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold shadow flex items-center justify-center ${actionLoading && actionType === "delete" ? "opacity-60 cursor-not-allowed" : ""}`}
                    disabled={actionLoading && actionType === "delete"}
                  >
                    {actionLoading && actionType === "delete" ? (
                      <>
                        <svg className="animate-spin h-4 w-4 mr-1 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {Array.isArray(products) && products.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}