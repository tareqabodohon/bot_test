const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const pageAccessToken = "EAAQKnYmFbv8BACSSgOrmZCsvy3WBPAqwcHyfqhcnZAqScXlTSCiYVZCLZAz9ARCqKRcmWso7I0x0ZAAUvbQruO944mN5y0Cs8IBvqymMwQNjovJPrM37Y8BB6K1Fml04gjve5HmvqQgcKWVTMxfiEZC17WXDUZCyaSeGDUZCX7rpNkKmJK5ZAZBxnj";
const api_url = "https://graph.facebook.com/v15.0/me/messenger_profile?access_token=" + pageAccessToken;
const app = express();

app.set("port", process.env.PORT || 8000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", function (req, res) {
    res.send("Hey!! I'm just a chatbot web app.");
});

function setupGreatingButton() {
    let data = {
        "get_started": {
            "payload": "<postback_payload>"
        }
    };

    request(
        {
            url: "https://graph.facebook.com/v15.0/me/messenger_profile?access_token=" + pageAccessToken,
            method: "POST",
            header: { "content-type": "application/json" },
            form: data
        },
        function (error, response, body) {
            console.log(response);
            console.log(body);
        }
    );
};

function setupGreatingText() {
    let data = {
        "greeting": [
            {
                "locale": "default",
                "text": "مرحباً {{user_first_name}} أنا المجيب الآلي للصفحة"
            }, {
                "locale": "en_US",
                "text": "Timeless apparel for the masses."
            }
        ]
    };

    request(
        {
            url: "https://graph.facebook.com/v15.0/me/messenger_profile?access_token=" + pageAccessToken,
            method: "POST",
            header: { "content-type": "application/json" },
            form: data
        },
        function (error, response, body) {
            console.log(response);
            console.log(body);
        }
    );
};

function setPersistentMenu() {
    let data = {
        "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions": [
                    {
                        "type": "postback",
                        "title": "تواصل معنا",
                        "payload": "CONTACT_US"
                    },
                    {
                        "type": "postback",
                        "title": "حول الصفحة",
                        "payload": "ABOUT"
                    },
                    {
                        "type": "web_url",
                        "title": "عن خدمة المجيب الآلي",
                        "url": "https://www.google.com/",
                        "webview_height_ratio": "full"
                    }
                ]
            }
        ]
    };

    request(
        {
            url: "https://graph.facebook.com/v15.0/me/messenger_profile?access_token=" + pageAccessToken,
            method: "POST",
            header: { "content-type": "application/json" },
            form: data
        },
        function (error, response, body) {
            console.log(response);
            console.log(body);
        }
    );
};



app.get("/setup", function (req, res) {
    setupGreatingButton();
    setupGreatingText();
    setPersistentMenu();
    res.send("done");
});


// Add support for GET requests to our webhook
app.get("/webhook", (req, res) => {
    const pageToken = "test";
    // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    if (token === pageToken) {
        res.status(200).send(challenge);
    }
    else {
        res.status(403).send();
    }
});


app.post("/webhook", (req, res) => {
    let data = req.body;
    if (data.object === "page") {
        data.entry.forEach(function (entry) {
            let pageID = entry.id;
            let timeStamp = entry.time;

            entry.messaging.forEach(function (event) {
                if (event.message) {

                    receivedMessage(event);

                }
                else if (event.postback) {
                    receivedPostback(event);
                }
            });
        });
        res.sendStatus(200);
    }
});

function receivedMessage(event) {
    let senderID = event.sender.id;
    let msgText = event.message.text;
    let msg;
    
    switch (msgText) {
        case "hi":
            msg="أهلا بك انا المجيب الآلي كيف حالك ؟";
            sendTextMsg(senderID,msg);
            break;
        case "hi":
             msg="أهلا بك انا المجيب الآلي كيف حالك ؟";
            sendTextMsg(senderID,msg);
            break;
        default:
             msg="لم افهم";
            sendTextMsg(senderID,msg);
            break;
    }
    
};


function sendTextMsg(recipient_id,msg){
let data={
    "recipient":{
        'id':recipient_id
    }, 
    "message":{
        'text':msg
    }   
};


request(
    {
        url: "https://graph.facebook.com/v15.0/me/messages?access_token=" + pageAccessToken,
        method: "POST",
        header: { "content-type": "application/json" },
        form: data
    },
    function (error, response, body) {
        console.log(response);
        console.log(body);
    }
   
);
 
};



function receivedPostback(event) {
    let senderID = event.sender.id;
    let payload = event.postback.payload;
    let msg;
    
    switch (payload) {
        case "get_started":
            msg="مرحبا بك {{user_first_name}}";
            sendTextMsg(senderID,msg);
            msg="انا المجيب الآلي للصفحة";
            sendTextMsg(senderID,msg);
            break;
        case "CONTACT_US":
            msg="لقد ضغط على زر تواصل معنا";
            sendTextMsg(senderID,msg);
            break;
        case "ABOUT":
             msg="لقد ضغطت على حول الصفحة";
            sendTextMsg(senderID,msg);
            break;
        default:
             msg="خطأ غير معروف";
            sendTextMsg(senderID,msg);
            break;
    }
    
};


app.listen(app.get("port"), function () {
    console.log("server is runing on port : " + app.get("port"));
});