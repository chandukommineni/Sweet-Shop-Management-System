// src/components/SweetForm/index.jsx
import React, { useState, useEffect } from "react";

const categories = [
  "TRADITIONAL",
  "DRY_FRUIT",
  "MILK_BASED",
  "CHOCOLATE",
  "FESTIVAL_SPECIAL",
  "BENGALI",
  "SUGAR_FREE",
];

const SweetForm = ({ sweet, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (sweet) {
      setForm({
        name: sweet.name,
        category: sweet.category,
        price: sweet.price,
        quantity: sweet.quantity,
      });
    }
  }, [sweet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto my-10 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-5 border border-pink-200"
    >
      <h2 className="text-2xl font-extrabold text-center text-purple-700 mb-6">
        {sweet ? "Edit Sweet" : " Add Sweet"}
      </h2>

      {/* Sweet Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Sweet Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-purple-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Price (₹)
        </label>
        <input
          id="price"
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
          required
        />
      </div>

      {/* Quantity */}
      <div>
        <label
          htmlFor="quantity"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Quantity
        </label>
        <input
          id="quantity"
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:outline-none transition"
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
      >
        {sweet ? "Update Sweet ✨" : "Add Sweet 🎉"}
      </button>
    </form>
  );
};

export default SweetForm;
