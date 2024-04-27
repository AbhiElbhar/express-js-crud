const express= require('express');
const connectDb =require("./config/db")
const dotenv= require("dotenv").config();

connectDb();
const app =express();
const errorHandler =require("./middlware/errorHandler")


app.use(express.json())
app.use('/api/contact', require("./routes/contactRoutes"));
app.use('/api/users', require("./routes/userRoutes"));
app.use(errorHandler)

const port =process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server Running On Port ${port}`)
})