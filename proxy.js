const { response } = require("express");
const querystring = require("querystring");
const express = require("express");
const axios = require("axios").default;

axios.defaults.headers.post['Content-Type'] = "application/json"
const app = express();
const port = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    let response = await axios.get(
      process.env.DESTINY_URL + "?" + querystring.stringify(req.query),
      {
        headers: req.headers,
      }
    );
    res.send(response.data).status(200);
  } catch (err) {
    console.log(`deu ruim: ${err}`);
    res.sendStatus(err.response.status);
  }
});
app.post("/", async (req, res) => {
  try {
    console.log("enviando uma requisição");
    let response = await axios.post(process.env.DESTINY_URL, req.body);
    console.log("recebeu uma resposta");
    res.send(response.data).status(200);
  } catch (err) {
    console.log(`deu ruim: ${err}`);
    res.sendStatus(err.response.status);
  }
});
app.listen(port, () => {
  console.log(`[${process.pid}] Example app listening on port ${port}`);
});
