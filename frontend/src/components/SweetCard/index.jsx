// src/components/SweetCard/index.jsx
import React from "react";

const SweetCard = ({ sweet, role, onPurchase, onEdit, onDelete }) => {
  return (
    <div className="border rounded-xl shadow-lg p-5 m-3 w-72 bg-white hover:shadow-xl transition-shadow duration-200">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{sweet.name}</h3>
      <p className="text-sm text-gray-600">Category: <span className="font-medium">{sweet.category}</span></p>
      <p className="text-sm text-gray-600">Price: <span className="font-medium">₹{sweet.price}</span></p>

      {role === "ADMIN" && (
        <p className="text-sm text-gray-600">
          Stock Available:{" "}
          <span className={sweet.quantity > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
            {sweet.quantity}
          </span>
        </p>
      )}

      <button
        onClick={() => onPurchase(sweet.id)}
        disabled={sweet.quantity <= 0}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-3 w-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sweet.quantity > 0 ? "Purchase" : "Out of Stock"}
      </button>

      {role === "ADMIN" && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onEdit(sweet)}
            className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(sweet.id)}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default SweetCard;
