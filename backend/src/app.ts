import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/auth.ts";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials:true,
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());



app.use((req, res, next) => {
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("Body:", req.body);
  next();
});
app.use("/api", router);


app.get("/", (req, res) => {
  res.json({ message: "App is running" });
});

export default app;