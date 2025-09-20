import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">SweetShop</h1>
      {user && (
        <div className="flex items-center gap-4">
          <span>Welcome, {user.userName}</span>
          <button
            onClick={() => dispatch(logout())}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
