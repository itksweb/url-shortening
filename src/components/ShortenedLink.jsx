import React, { useState } from "react";

const ShortenedLink = ({ data }) => {
    const [copied, setCopied] = useState("");
    const { link, shortened } = data;

    const handleCopy = () => {
      setCopied(shortened);
      navigator.clipboard.writeText(shortened);
      setTimeout(() => setCopied(""), 3000);
    };

  
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between shadow-sm gap-3 items-center bg-white p-3 rounded-sm">
      <p className="max-md:border-b max-md:w-full md:w-[40%] ">{link}</p>
      <div className="shortened-link flex items-center max-md:w-full md:w-[60%] flex-col sm:flex-row sm:justify-between md:justify-end gap-3 ">
        <p className="input-link text-Cyan sm:w-[80%] md:w-2/3 md:text-right">
          {shortened}
        </p>
        <button
          onClick={handleCopy}
          type="button"
          className={` ${
            copied !== shortened ? "bg-Cyan" : "bg-Very-dark-vio"
          } cursor-pointer px-3 py-2 w-full sm:w-[20%] md:w-1/3 rounded-sm text-sm text-white`}
        >
          {copied === shortened ? "copied" : "copy"}
        </button>
      </div>
    </div>
  );
};

export default ShortenedLink;
