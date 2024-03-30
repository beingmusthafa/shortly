import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GetStarted = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { currentUser } = useSelector(
    (state: { user: { currentUser: object } }) => state.user
  );
  if (currentUser) {
    return <Navigate to={"/dashboard"} />;
  } else
    return (
      <>
        {showSignIn && <SignIn setShow={setShowSignIn} />}
        {showSignUp && <SignUp setShow={setShowSignUp} />}
        <div
          className="w-full flex flex-col md:flex-row h-screen md:h-fit md:py-20 justify-evenly p-12"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/abstract-watercolor-pastel-background_87374-139.jpg?t=st=1711703161~exp=1711706761~hmac=3e6a0b97a3f07172853b1300914adbcc6e4024499f3d792d0a31e56a9d2167fb&w=826')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="_font-tilt-warp text-5xl w-80 text-orange-500 text-center">
              Shorten your URLs the easy way
            </p>
            <p className="_font-tilt-warp text-2xl text-slate-400 w-80 text-center">
              Free URL shortener for all your needs
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              onClick={() => setShowSignUp(true)}
              className="bg-orange-500 text-white text-2xl font-semibold p-3 hover:bg-orange-600  _trans-0-3 rounded-full"
            >
              Get started
            </button>
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setShowSignIn(true)}
                className="cursor-pointer _font-tilt-warp text-orange-500"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </>
    );
};

export default GetStarted;
