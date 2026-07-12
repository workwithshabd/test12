import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/auth.ts";

const app = express();

app.use(cors());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());



app.use((req, res, next) => {
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("Body:", req.body);
  next();
});
app.use("/api/v1/auth", router);


app.get("/", (req, res) => {
  res.json({ message: "App is running" });
});

export default app;