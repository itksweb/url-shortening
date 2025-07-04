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
    const response = await fetch(
      "https://corsproxy.io/?" + "https://cleanuri.com/api/v1/shorten",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          url: link,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to shorten the link");
    }
    const data = await response.json();
    return data.result_url;
  } catch (error) {
    console.error(error);
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
