import React from "react";

interface Props {
  text: string;
  onCancel: () => void;
  onConfirm: () => void;
}
const Confirmation: React.FC<Props> = ({ text, onCancel, onConfirm }) => {
  return (
    <div
      style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      className="w-full h-full _screen-center"
    >
      <div className="w-fit border-2 border-sky-500 flex flex-col p-8 gap-6 bg-white rounded-3xl h-fit mt-[20vh]">
        <p className=" mb-6 text-center">{text}</p>

        <div className="flex gap-16 items-center">
          <button
            onClick={onCancel}
            type="submit"
            className="rounded-full bg-orange-500 p-2 font-bold text-white text-sm w-fit mx-auto"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            type="submit"
            className="rounded-full bg-orange-500 p-2 px-4 font-bold text-white text-sm  w-fit mx-auto"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
