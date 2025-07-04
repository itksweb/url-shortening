import React, { useEffect, useState } from "react";

export const UseScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return screenWidth;
};

export const shortenLink = async (link) => {
  try {
    const response = await fetch(`http://localhost:5000/api/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: link }),
      credentials: "include",
    });
    
    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to shorten the link");
    }
    const {result_url} = await response.json();
    return result_url;
  } catch (error) {
    console.error("see error: ", error);
  }
};
export const isValidUrl = (str) => {
  try {
    const newUrl = new URL(str);
    return newUrl.protocol.startsWith("http");
  } catch (error) {
    console.error(error);
    return false;
  }
};
