const express = require("express");
const https = require("https");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

const indexFile = fs.readFileSync(path.join(__dirname, "dist/prod.html"), "utf8");

const pagesfn = (req,res) => res.sendFile(path.join(__dirname, "dist/prod.html"));

app.get("/", pagesfn);
app.get("/movies", pagesfn);
app.get("/drag-drop-test", pagesfn);
app.get("/about", pagesfn);
app.get("/contact", pagesfn);

app.get("/dist/:file", (req,res) => res.sendFile(path.join(__dirname, "dist/", req.params.file)));

getCert = options => {
    switch(options) {
        case "self": return {
            key: fs.readFileSync(path.join(__dirname, 'cert/server.key')),
            cert: fs.readFileSync(path.join(__dirname, 'cert/server.crt')),
            requestCert: false,
            rejectUnauthorized: false,
        };
        case "iisexpress": return {
            pfx: fs.readFileSync(path.join(__dirname, 'cert/iis_express.pfx')),
            passphrase: 'test'
        };
    }
};

https.createServer(getCert("self"), app).listen(443, function() {
    console.log("Listening on https://localhost:443/");
});