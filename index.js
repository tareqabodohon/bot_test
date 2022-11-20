const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app=express();

app.set("port",process.env.PORT || 8000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Add support for GET requests to our webhook
app.get("/webhook", (req, res) => {
   const pageToken = "test";
    // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    if(token===pageToken){

    }
    else{
        res.status(403).send();
    }
    });


app.get("/",function (req,res){
    res.send("Hey!! I'm just a chatbot web app.");
});




app.listen(app.get("port"),function(){
    console.log("server is runing on port : "+ app.get("port"));
});