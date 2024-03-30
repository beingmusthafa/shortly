import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import Loading from "./Loading";
import { useForm } from "react-hook-form";
import axiosInstance from "../config/axios.config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../state/slices/user.slice.ts";
type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
type FormValues = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type Data = {
  name: string;
  email: string;
  password: string;
  code?: number;
};

const SignUp: React.FC<Props> = ({ setShow }) => {
  const [loading, setLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formError, setFormError] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [data, setData] = useState<Data>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const codeRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startSignUp = async (formValues: FormValues) => {
    if (formValues.password !== formValues.confirmPassword) {
      setFormError({ ...formError, confirmPassword: "Passwords do not match" });
      return;
    }
    setLoading(true);
    setFormError({
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    try {
      const res = (
        await axiosInstance.post("/auth/start-sign-up", {
          email: formValues.email,
        })
      ).data;
      if (!res.success) {
        if (res.data.formError) {
          setFormError(res.data.formError);
          return;
        }
        throw new Error(res.message);
      }
      setData({
        name: formValues.displayName,
        email: formValues.email,
        password: formValues.password,
      });
      setShowOtpForm(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const finishSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const code = codeRef.current?.value
        ? Number(codeRef.current?.value)
        : null;
      if (!code) {
        setError("Code is required");
        return;
      }
      const res = (
        await axiosInstance.post("/auth/finish-sign-up", {
          ...data,
          code,
        })
      ).data;
      if (!res.success) {
        setError(res.message);
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
      {showOtpForm ? (
        <form
          action=""
          className=" w-fit border-2 border-sky-500 flex flex-col p-8 bg-sky-100 rounded-3xl  relative h-fit"
          onSubmit={finishSignUp}
        >
          <h1 className="_font-tilt-warp text-2xl mx-auto text-sky-500 mb-6">
            Sign up
          </h1>
          <p className="mb-2">Verification code has been sent to your email</p>
          <p className="text-red-500 mb-2">{error}</p>
          <input
            ref={codeRef}
            type="number"
            placeholder="Verification code"
            name="code"
            className="w-72 mb-6"
          />
          <button
            type="submit"
            className="rounded-full bg-orange-500 p-2 px-4 font-bold text-white  w-fit mx-auto"
          >
            Submit
          </button>
        </form>
      ) : (
        <motion.form
          initial={{ x: -200, opacity: 0.2 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className=" w-fit border-2 border-sky-500 flex flex-col p-8 bg-sky-100 rounded-3xl h-fit relative"
          onSubmit={handleSubmit((data) => startSignUp(data as FormValues))}
        >
          <button
            onClick={() => setShow(false)}
            className="bx bxs-x-circle absolute text-2xl top-4 right-4 text-orange-500"
          ></button>
          <h1 className="_font-tilt-warp text-2xl mx-auto text-sky-500 mb-6">
            Sign up
          </h1>

          <p className="text-red-500 mb-2">
            {(errors.displayName?.message as string) || formError.displayName}
          </p>
          <input
            {...register("displayName", {
              required: "Enter your name",
              pattern: {
                value: /^[a-zA-Z]{3,}[a-zA-Z\s]*[a-zA-Z]$/,
                message: "Invalid name",
              },
            })}
            type="text"
            placeholder="Display name"
            name="displayName"
            className="w-72 mb-6"
          />

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
                value: /^(?=.*\d{2,})[A-Za-z\d]{8,}$/,
                message: "Need to be 8 char long and min 2 numbers",
              },
            })}
            type="password"
            name="password"
            placeholder="Password"
            className="w-72 mb-6"
          />

          <p className="text-red-500 mb-2">
            {(errors.confirmPassword?.message as string) ||
              formError.confirmPassword}
          </p>
          <input
            {...register("confirmPassword", {
              required: "Confirm password",
              pattern: {
                value: /^(?=.*\d{2,})[A-Za-z\d]{8,}$/,
                message: "Need to be 8 char long and min 2 numbers",
              },
            })}
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            className="w-72 mb-6"
          />

          <button
            type="submit"
            className="rounded-full bg-orange-500 p-2 px-4 font-bold text-white  w-fit mx-auto"
          >
            Sign up
          </button>
        </motion.form>
      )}
    </div>
  );
};

export default SignUp;
