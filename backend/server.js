const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const FRONTEND_DEV = process.env.FRONTEND_DEV;
const FRONTEND_PROD = process.env.FRONTEND_PROD;
const prod = process.env.FRONTEND === FRONTEND_PROD;
const FRONTEND_URL = !prod ? FRONTEND_DEV : FRONTEND_PROD;
const corOpt = {
  origin: [FRONTEND_DEV, FRONTEND_PROD],
  methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
  httpequivs: {
    "Access-Control-Allow-Origin": FRONTEND_URL,
  },
};

app.use(cors(corOpt));
app.get("/", (req, res) => {
  res.send("MY URL SHORTENNING BACKEND IS WORKING");
});
app.options("/api/shorten", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // Or specific origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allowed methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
  res.sendStatus(200); // Or 204
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
