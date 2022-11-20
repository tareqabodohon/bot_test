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


app.get("/setup", function (req, res) {
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







app.listen(app.get("port"), function () {
    console.log("server is runing on port : " + app.get("port"));
});