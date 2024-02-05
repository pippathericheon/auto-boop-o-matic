const express = require("express");
const bodyParser = require("body-parser");
const { postSlackMessage } = require("./api");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/zoom-webhook", async (req, res) => {
  const { payload, event } = req.body;
  try {
    await postSlackMessage("Is this working?")
    res.status(200).send("OK");
  } catch (error) {
    res.status(error.response.status).send({
      msg: "There be a problem",
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
