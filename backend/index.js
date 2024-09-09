const express=require("express");
const app=express()
const mongoDB=require("./db")
mongoDB()
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type,Accept"
    );
    next();
})
app.use(express.json())
app.use("/api",require("./routes/CreateUser"));
app.use("/api",require("./routes/DisplayData"));
app.use("/api",require("./routes/OrderData"));
app.get("/",(req,res)=>{
    res.send("Hello world");
})
app.listen(5000,()=>{console.log("Server has started")});