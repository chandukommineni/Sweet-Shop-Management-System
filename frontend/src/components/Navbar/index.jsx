import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slice/AuthSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
 const handleLogout = () => {
  dispatch(logout());
  
};

  return (
    <nav className="flex justify-between items-center px-6 py-3 shadow-lg md:rounded-[25px] md:mx-5">
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="SweetShop Logo"
          className="h-15 w-15 object-cover"
        />
        <h1 className="text-2xl font-extrabold tracking-wide">
          Sweet<span className="text-pink-400">Shop</span>
        </h1>
      </div>

      {user && (
        <div className="flex items-center gap-5">
          <span className="text-sm ">
            Welcome, <span className="font-semibold">{user.userName}</span>
          </span>
          <button
            onClick={handleLogout}
            className="bg-pink-500 text-white hover:bg-pink-600 transition-colors px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
