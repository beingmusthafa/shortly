import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../config/axios.config";
import { useDispatch } from "react-redux";
import { signIn } from "../state/slices/user.slice";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const SignIn: React.FC<Props> = ({ setShow }) => {
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignIn = async (data: { email: string; password: string }) => {
    setLoading(true);
    setFormError({ email: "", password: "" });
    try {
      const res = (await axiosInstance.post("/auth/sign-in", data)).data;
      if (!res.success) {
        setFormError(res.data.formError);
        throw new Error(res.message);
      }
      localStorage.setItem("token", res.data.token);
      dispatch(signIn(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return loading ? (
    <Loading />
  ) : (
    <div
      style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
      className="w-full h-full _screen-center"
    >
      <motion.form
        initial={{ x: -200, opacity: 0.2 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className=" w-fit border-2 border-sky-500 flex flex-col p-8 bg-sky-100 rounded-3xl h-fit relative"
        onSubmit={handleSubmit((data) =>
          handleSignIn(data as { email: string; password: string })
        )}
      >
        <button
          onClick={() => setShow(false)}
          className="bx bxs-x-circle absolute text-2xl top-4 right-4 text-orange-500"
        ></button>

        <h1 className="_font-tilt-warp text-2xl mx-auto text-sky-500 mb-6">
          Sign in
        </h1>
        <p className="text-red-500 mb-2">
          {(errors.email?.message as string) || formError.email}
        </p>
        <input
          {...register("email", {
            required: "Enter email",
            pattern: {
              value: /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/,
              message: "Enter a valid email",
            },
          })}
          type="text"
          placeholder="Email"
          name="email"
          className="w-72 mb-6"
        />
        <p className="text-red-500 mb-2">
          {(errors.password?.message as string) || formError.password}
        </p>
        <input
          {...register("password", {
            required: "Enter password",
            pattern: {
              value: /^\S*$/,
              message: "Invalid password",
            },
          })}
          type="password"
          name="password"
          placeholder="Password"
          className="w-72 mb-6"
        />
        <div className="flex flex-col items-center mx-auto gap-2">
          <button className="rounded-full bg-orange-500 p-2 px-4 font-bold text-white  w-fit">
            Sign in
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default SignIn;
