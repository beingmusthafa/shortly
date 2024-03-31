import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../config/axios.config";
import Loading from "./Loading";

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
}
const AddLink: React.FC<Props> = ({ setShow, fetchData }) => {
  const linkRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const link = linkRef?.current?.value;
    if (linkRef.current) {
      if (!link || link.length < 7) {
        setError("Enter a valid link");
        return;
      }
    }
    setLoading(true);
    try {
      const res = (
        await axiosInstance.post("/create-link", {
          link,
        })
      ).data;
      if (!res.success) throw new Error(res.message);
      setShow(false);
      fetchData();
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
      style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      className="w-full h-full _screen-center"
    >
      <motion.form
        initial={{ x: -200, opacity: 0.2 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        action=""
        className="w-fit border-2 border-sky-500 flex flex-col p-8 gap-6 bg-sky-100 rounded-3xl h-fit relative"
        onSubmit={handleSubmit}
      >
        <button
          onClick={() => setShow(false)}
          className="bx bxs-x-circle absolute text-2xl top-4 right-4 text-orange-500"
        ></button>
        <h1 className="_font-tilt-warp text-2xl mx-auto text-sky-500 mb-6">
          Add link
        </h1>
        {<p className="text-red-500">{error}</p>}
        <input
          ref={linkRef}
          type="text"
          placeholder="Paste link here"
          name="link"
          className="w-72 mb-6"
        />
        <button
          type="submit"
          className="rounded-full bg-orange-500 p-2 px-4 font-bold text-white  w-fit mx-auto"
        >
          Submit
        </button>
      </motion.form>
    </div>
  );
};

export default AddLink;
