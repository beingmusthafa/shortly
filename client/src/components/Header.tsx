import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TCurrentUser from "../types/currentUser.type";
import { signOut, updateDetails } from "../state/slices/user.slice";
import { motion } from "framer-motion";
import Confirmation from "./Confirmation";
import Loading from "./Loading";
import axiosInstance from "../config/axios.config";

const Header = () => {
  const { currentUser } = useSelector(
    (state: { user: { currentUser: TCurrentUser } }) => state.user
  );
  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [editName, setEditName] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const dispatch = useDispatch();
  const logout = async () => {
    localStorage.removeItem("token");
    dispatch(signOut());
    window.location.reload();
  };
  const handleNameChange = async () => {
    setLoading(true);
    const name = nameRef.current?.value!;
    try {
      if (name.length < 3) {
        setNameError("Name must be at least 3 characters long");
        return;
      }
      setNameError("");
      const res = (await axiosInstance.patch("/update-name", { name })).data;
      if (!res.success) {
        setNameError(res.message);
        return;
      }
      dispatch(updateDetails(res.data.user));
      setEditName(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {logoutConfirm && (
        <Confirmation
          text="Do you want to logout?"
          onCancel={() => setLogoutConfirm(false)}
          onConfirm={logout}
        />
      )}
      {loading && <Loading />}
      <div className="w-full border-b-4 border-sky-500 h-16 bg-white flex justify-between items-center px-6 py-3 sticky top-0">
        <Link to={"/"} className="_font-pacifico text-orange-500 text-3xl">
          shortly
        </Link>
        {currentUser && (
          <div
            onClick={() => {
              setEditName(false);
              setShowOptions((prev) => !prev);
            }}
            className="w-10 h-10 bg-sky-500 rounded-full relative flex items-center justify-center cursor-pointer"
          >
            <div className="text-lg font-bold text-white">
              {currentUser.name.slice(0, 1).toUpperCase()}
            </div>
            {showOptions && (
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute p-2 top-10 right-2 bg-white border border-black flex flex-col gap-2 overflow-hidden"
              >
                {nameError && editName && (
                  <p className="text-red-500">{nameError}</p>
                )}
                <div className="flex border-b border-black">
                  {editName ? (
                    <div className="flex border border-black">
                      <input
                        ref={nameRef}
                        type="text"
                        className="w-36 p-2"
                        defaultValue={currentUser.name}
                      />
                      <button
                        onClick={handleNameChange}
                        className="bx bx-check text-xl text-green-500 mr-2 font-bold"
                      ></button>
                      <button
                        onClick={() => {
                          setNameError("");
                          setEditName(false);
                        }}
                        className="bx bx-x text-xl mr-2 font-bold"
                      ></button>
                    </div>
                  ) : (
                    <>
                      <p className="">{currentUser.name}</p>
                      <button
                        onClick={() => setEditName(true)}
                        className="bx bx-edit text-xl ml-4"
                      ></button>
                    </>
                  )}
                </div>
                <button
                  onClick={() => setLogoutConfirm(true)}
                  className="font-semibold text-red-500"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
