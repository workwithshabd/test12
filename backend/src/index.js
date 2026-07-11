import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";



dotenv.config();
const PORT= process.env.PORT ;

app.listen(PORT,()=>{
    console.log(`server is running at port :${PORT}`)
})

connectDB();

