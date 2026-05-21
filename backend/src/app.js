//using express
const express = require("express");

const app = express();
const port = 3000 ;

app.get("/enter", (req,res)=>{
    res.send("server working");
})

app.listen(port,()=>{
    console.log("working")
});


