
import React, { useState } from "react";

const SweetCard = ({ sweet, role, onPurchase, onEdit, onDelete }) => {
  const [purchaseQty, setPurchaseQty] = useState(1);

  const handlePurchase = (curQuantity) => {
    if (purchaseQty > 0) {
      console.log("Purchasing", purchaseQty, "of", sweet.name);
      onPurchase(sweet.id, purchaseQty,curQuantity);
      setPurchaseQty(1);
    }
  };

  return (
    <div className="border rounded-2xl shadow-md p-5 m-3 w-72 bg-gradient-to-b from-white to-gray-50 hover:shadow-xl transition-all duration-300 flex flex-col">

      <div className="w-full h-40 bg-pink-100 rounded-xl mb-3 flex items-center justify-center overflow-hidden">

        <span className="text-pink-600 text-4xl">🍬</span>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-1">{sweet.name}</h3>
      <p className="text-sm text-gray-600">
        Category: <span className="font-medium">{sweet.category}</span>
      </p>
      <p className="text-sm text-gray-600">
        Price: <span className="font-semibold text-green-700">₹{sweet.price}</span>
      </p>

      {role === "ADMIN" && (
        <p className="text-sm text-gray-600">
          Stock Available:{" "}
          <span
            className={
              sweet.quantity > 0
                ? "text-green-600 font-semibold"
                : "text-red-600 font-semibold"
            }
          >
            {sweet.quantity}
          </span>
        </p>
      )}

      {/* Quantity Input + Purchase */}
      <div className="flex items-center gap-2 mt-3">
        <input
          type="number"
          min="1"
          max={sweet.quantity}
          value={purchaseQty}
          onChange={(e) => {setPurchaseQty(Number(e.target.value))}}
          disabled={sweet.quantity <= 0}
          className="w-16 border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:bg-gray-100"
        />
        <button
          onClick={()=>handlePurchase(sweet.quantity)}
          disabled={sweet.quantity <= 0}
          className="flex-1 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sweet.quantity > 0 ? "Purchase" : "Out of Stock"}
        </button>
      </div>

      {/* Admin Actions */}
      {role === "ADMIN" && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onEdit(sweet)}
      className="flex-1 bg-[#9810FA] text-white px-4 py-2 rounded-lg hover:bg-[#9810FA] transition-colors"
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
