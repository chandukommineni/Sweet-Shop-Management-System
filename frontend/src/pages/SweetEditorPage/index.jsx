// src/pages/SweetEditorPage.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import SweetForm from "../../components/SweetForm";
import { addSweet, updateSweet } from "../../store/slice/SweetSlice";
import { toast } from "react-toastify";

const SweetEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.sweets);

  const sweet = id ? items.find((s) => String(s.id) === String(id)) : null;

  const handleSubmit = async (data) => {
    try {
      console.log(data);
      if (sweet) {
        await dispatch(updateSweet({ id: sweet.id, data })).unwrap();
        toast.success("Sweet updated successfully 🎉");
      } else {
        await dispatch(addSweet(data)).unwrap();
        toast.success("Sweet added successfully 🎉");
      }
      navigate("/");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return <SweetForm sweet={sweet} onSubmit={handleSubmit} />;
};

export default SweetEditorPage;
