const express=require("express");
const words = require("./data/words");
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes =require("./routes/userRoutes");
const wordRoutes = require("./routes/wordRoutes")
const {notFound,errorHandler}= require("./middlewares/errorMiddlewares");

// create an object of this imported package
const app =express();
dotenv.config(); 
connectDB();
app.use(express.json());

// app.get("/",(req,res)=>{
//   res.send("API is running..") 
// })

// app.get("/api/words",(req,res)=>{
//   res.json(words);
// })

app.use("/api/users", userRoutes);
app.use("/api/words",wordRoutes);

app.use(notFound)
app.use(errorHandler)

// app.get("/api/words/:id",(req,res)=>{

// const word=words.find((n)=> n._id === req.params.id);

//   res.send(word);
// });

const PORT=process.env.PORT || 5000;

// create web server
app.listen(5000,function()
{
  console.log(`Server is running on port ${PORT}`);
})