const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app=express();

app.set("port",process.env.port || 8000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/",function (req,res){
    res.send("Hey!! I'm just a chatbot web app.");
});




app.listen(app.get("port"),function(){
    console.log("server is runing on port : "+app.get("port"));
});