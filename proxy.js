const { response } = require("express");
const querystring = require("querystring");
const express = require("express");
const axios = require("axios").default;
const https = require("https");
axios.defaults.headers.post["Content-Type"] = "application/json";
const app = express();
const port = process.env.PORT || 80;
axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

let destinyUrl = process.env.DESTINY_URL.slice(-1) == "/" ? process.env.DESTINY_URL : process.env.DESTINY_URL + "/";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    console.log(`Sending request to : ${destinyUrl}`);
    let url = destinyUrl + "?" + querystring.stringify(req.query);
    let response = await axios.get(url);
    console.log(`Response received from request. Redirecting response`);
    if(typeof response.data === "number") response.data = `${response.data}`
    res.status(200).send(response.data);
  } catch (err) {
    console.log(`Exception was caught: ${err}`);
    if (err && err.response && err.response.status) {
      res.status(err.response.status).send(err.message)
    } else {
      res.status(400).send(err.message);
    }
  }
});
app.post("/", async (req, res) => {
  try {
    console.log(`Sending request to : ${destinyUrl} \nBody:\n${JSON.stringify(req.body, null, 2)}`);
    let response = await axios.post(destinyUrl, req.body);
    console.log(`Response received from request. Redirecting response`);
    if(typeof response.data === "number") response.data = `${response.data}`
    res.status(200).send(response.data);
  } catch (err) {
    console.log(`Exception was caught: ${err}`);
    if (err && err.response && err.response.status) {
      res.status(err.response.status).send(err.message)
    } else {
      res.status(400).send(err.message);
    }
  }
});
app.listen(port, () => {
  console.log(`[${process.pid}] starting proxy on port ${port}`);
});
