const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const corOpt = {
  origin: [
    "http://localhost:5173",
    "https://url-shortening-api-puce.vercel.app/",
  ],
  methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
  httpequivs: {
    "Access-Control-Allow-Origin": "http://localhost:5173",
  },
};

app.use(cors(corOpt));
app.get("/", (req, res) => {
  res.send("Expressed on Vercel");
});
app.post("/api/shorten", async (req, res) => {
  const { url } = await req.body;
  console.log("Received data:", url);
  if (url) {
    try {
      const response = await fetch("https://cleanuri.com/api/v1/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ url }),
      });
      if (!response.ok) {
        throw new Error("Failed to shorten the link");
      }
      const data = await response.json();
      res.status(201).json({ ...data });
      //   console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
