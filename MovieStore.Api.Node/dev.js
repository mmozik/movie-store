const express = require("express");
const https = require("https");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const webpack = require("webpack");

const app = express();
app.use(cors());

const webpackConfig = require("./webpack.config.dev.js");

let envSetup;
//read environment json file for setup
const envJsonFile = path.join(__dirname, "environment.json");
let environments = {};//init setup

if(fs.existsSync(envJsonFile))
{//file exists read environments from it
    environments = JSON.parse(fs.readFileSync(envJsonFile));
} else  {
    console.log(`No "environment.json" file in application folder "${__dirname}".`);
    console.log("Please add one!");
    console.log("Exiting application...");
    process.exit();
}

//read command line parametar
if(process.argv.length > 2)
{
    let devServerEnv = process.argv[2];
    envSetup = environments[devServerEnv];
    if(envSetup === undefined)
    {
        console.error(`No environment setup found for "${devServerEnv}".`);
        process.exit(1);
    }
}  else  {
    console.log("No parameter for environment setup. Using default [express] instead.");
    envSetup = environments["express"];
}

console.log("Setting up " + envSetup.desc + " environment.");

let indexFile;
let indexFileName = "wwwroot/index.html";
//read file into string 
if(envSetup && envSetup.mainFile){
    indexFileName = "wwwroot/" + envSetup.mainFile;
} 

indexFile = fs.readFileSync(path.join(__dirname, indexFileName), "utf8");
console.log("Main file " + indexFileName);

if(envSetup && envSetup.serveStatic) {
    console.log("Serving static content from Source/Web...");
    require("./setupStaticSymlinks.js");
    app.use("/EnvirUI/Content", express.static(path.join(__dirname, "Static/Content")));
    app.use("/EnvirUI/Scripts", express.static(path.join(__dirname, "Static/Scripts")));
}

if(envSetup && envSetup.dummyApi) {
    console.log("Serving dummy api from Source/Web/DummyApi...");
    const staticPath = path.join(__dirname, "DummyApi");
    let delay = 0;
    if(!isNaN(envSetup.dummyApi.delay)) {
        console.log("Dummy api response delay " + envSetup.dummyApi.delay);
        delay = envSetup.dummyApi.delay;
    }

    app.use("/EnvirUI/api", function(req, res) {
        let sendFn = function() {
            const fileContent = fs.readFileSync(filePath);
            res.set("Content-Type", "application/json");
            res.set("X-Powered-By", "Ecos2UI");
            res.status(200).send(fileContent);
        };

        const filePath = staticPath + req.path + ".json";
        if(!fs.existsSync(filePath)) {
            console.log(`File ${filePath} not found`);
            sendFn = function(){res.status(404).send("path not found");};
        }
        setTimeout(sendFn, delay);
    });
}

const compiler = webpack(webpackConfig);
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log,
    path: "/__webpack_hmr",
    heartbeat: 10 * 1000
}));

let envHolder = "{BaseUrl}";
let envRoot = "{AppRoot}";

//replace all of the occurrences in the file
while(indexFile.indexOf(envHolder) !== -1)
    indexFile = indexFile.replace(envHolder, envSetup.url);
if (!envSetup.root) envSetup.root = envSetup.url;
while(indexFile.indexOf(envRoot) !== -1)
    indexFile = indexFile.replace(envRoot, envSetup.root);


app.use("/*", (req,res) => res.send(indexFile));

app.listen(3000, function() {
    console.log("Listening on http://localhost:3000/")
});

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

https.createServer(getCert(envSetup.certConfig || "self"), app).listen(3030, function() {
    console.log("Listening on https://localhost:3030/");
});
