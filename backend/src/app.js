//using express
import express from "express";
import router from "./routes/index.js"; 

const app = express();
const port = 3000 ;

//this will convert a req from the body from json to object
app.use(express.json());

//this will alowed to use all the routes u'll put at the index
app.use(router);


app.listen(port,()=>{
    console.log("THE SERVER IS WORKING !!")
});


