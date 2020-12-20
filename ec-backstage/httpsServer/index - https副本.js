let https = require("https");

let fs = require("fs");

var options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
}

https.createServer(options,(rsq,res) => {
    res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
    res.end("EC");
}).listen(8000);