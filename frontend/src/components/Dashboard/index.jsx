import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSweets,
  searchSweets,
  purchaseSweet,
} from "../../store/slice/SweetSlice";
import SweetCard from "../SweetCard";
import { toast } from "react-toastify";

const categories = [
  { value: "", label: "All Categories" },
  { value: "TRADITIONAL", label: "Traditional" },
  { value: "DRY_FRUIT", label: "Dry Fruit" },
  { value: "MILK_BASED", label: "Milk Based" },
  { value: "CHOCOLATE", label: "Chocolate" },
  { value: "FESTIVAL_SPECIAL", label: "Festival Special" },
  { value: "BENGALI", label: "Bengali" },
  { value: "SUGAR_FREE", label: "Sugar Free" },
];

const DashBoard = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.sweets);

  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    dispatch(fetchSweets());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(
      searchSweets({
        ...filters,
        minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
      })
    );
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      category: "",
      minPrice: "",
      maxPrice: "",
    });
    dispatch(fetchSweets());
  };

  const handlePurchase = (id, quantity = 1) => {
    dispatch(purchaseSweet({ id, quantity }));
    toast.success("Sweet purchased successfully 🎉");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
   
        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-xl p-6 mb-10 border border-pink-200">
          <h2 className="text-2xl font-extrabold text-purple-700 mb-5">
            Find Your Sweet
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <input
              type="text"
              placeholder="Search by Name"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              className="border border-purple-300 rounded-lg px-3 py-2 w-48 focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />

            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="border border-purple-300 rounded-lg px-3 py-2 w-48 focus:ring-2 focus:ring-pink-400 focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
              className="border border-purple-300 rounded-lg px-3 py-2 w-32 focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
              className="border border-purple-300 rounded-lg px-3 py-2 w-32 focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />

            <button
              onClick={handleSearch}
              className="bg-pink-500 text-white px-5 py-2 rounded-lg shadow hover:bg-pink-600 transition"
            >
              Search
            </button>
            <button
              onClick={handleClearFilters}
              className="bg-purple-500 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-600 transition"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Sweet List */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
          </div>
        )}

        {!loading && error && (
          <p className="text-red-600 text-center py-6 text-lg font-medium">
            {error}
          </p>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="text-gray-600 text-center py-6 text-lg">
            No sweets found 🍬
          </p>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((sweet) => (
              <SweetCard
                key={sweet.id}
                sweet={sweet}
                role="USER"
                onPurchase={(id) => handlePurchase(id, 1)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
