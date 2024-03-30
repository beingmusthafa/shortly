import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TCurrentUser from "../types/currentUser.type";
import { signOut } from "../state/slices/user.slice";

const Header = () => {
  const { currentUser } = useSelector(
    (state: { user: { currentUser: TCurrentUser } }) => state.user
  );
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const logout = async () => {
    localStorage.removeItem("token");
    dispatch(signOut());
    window.location.reload();
  };
  return (
    <div className="w-full border-b-4 border-sky-500 h-16 bg-white flex justify-between items-center px-6 py-3 sticky top-0">
      <Link to={"/"} className="_font-pacifico text-orange-500 text-3xl">
        shortly
      </Link>
      {currentUser && (
        <div
          onClick={() => setShowOptions((prev) => !prev)}
          className="w-10 h-10 bg-slate-500 rounded-full relative flex items-center justify-center"
        >
          <p className="text-lg font-bold text-white">
            {currentUser.name.slice(0, 1).toUpperCase()}
          </p>
          {showOptions && (
            <div className="absolute p-2 top-10 right-2 bg-white border border-black flex flex-col gap-2">
              <p className="border-b border-black">{currentUser.name}</p>
              <button onClick={logout} className="font-semibold text-red-500">
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
