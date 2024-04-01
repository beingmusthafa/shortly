import React, { useState } from "react";
import Link from "../types/link.type";
type Props = {
  link: Link;
  onDelete: () => void;
};
const LinkCard: React.FC<Props> = ({ link, onDelete }) => {
  const [orgCopied, setOrgCopied] = useState(false);
  const [shortCopied, setShortCopied] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const handleCopy = (text: string, type: "org" | "short") => {
    navigator.clipboard.writeText(text);
    if (type === "org") setOrgCopied(true);
    else setShortCopied(true);
    setTimeout(() => {
      if (type === "org") setOrgCopied(false);
      else setShortCopied(false);
    }, 3000);
  };
  return (
    <div className="flex flex-col md:flex-row w-fit items-start">
      <div className="flex flex-col items-start shadow-md border p-4">
        <div className="flex gap-4 mb-6">
          <p className="text-xl font-bold _link-text whitespace-nowrap text-ellipsis">
            {import.meta.env.VITE_SERVER_BASE_URL + "/" + link.shortLink}
          </p>
          <button
            onClick={() =>
              handleCopy(
                import.meta.env.VITE_SERVER_BASE_URL + "/" + link.shortLink,
                "short"
              )
            }
            className={`bx ${
              shortCopied ? "bx-check" : "bx-copy"
            } text-xl text-sky-600`}
          ></button>
        </div>
        <div className="flex gap-4 items-center justify-start">
          <p
            className={`text-slate-600 _link-text ${
              showFull ? "text-wrap" : " whitespace-nowrap"
            } `}
          >
            <span className="text-black font-semibold">Original: </span>
            {link.originalLink}
          </p>
          <button
            onClick={() => handleCopy(link.originalLink, "org")}
            className={`bx ${
              orgCopied ? "bx-check" : "bx-copy"
            } text-xl text-slate-500`}
          ></button>
          <button
            onClick={() => setShowFull((prev) => !prev)}
            className={`bx ${
              showFull ? "bx-collapse-alt" : "bx-expand-alt"
            } text-xl text-slate-500`}
          ></button>
        </div>
      </div>
      <button
        onClick={onDelete}
        className="bx bx-trash-alt text-xl bg-red-500 p-2 text-white ml-auto"
      ></button>
    </div>
  );
};

export default LinkCard;
