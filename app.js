const express = require("express");
const bodyParser = require("body-parser");
const { postSlackMessage } = require("./api");

require("dotenv").config();
const crypto = require("crypto");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/zoom-webhook", async (req, res) => {
  // if (req.body.event === "endpoint.url_validation") {
  //   console.log("validating....");
  //   const hashForValidate = crypto
  //     .createHmac("sha256", process.env.ZOOM_WEBHOOK_SECRET_TOKEN)
  //     .update(req.body.payload.plainToken)
  //     .digest("hex");

  //   res.status(200);
  //   const responseObj = {
  //     plainToken: req.body.payload.plainToken,
  //     encryptedToken: hashForValidate,
  //   };
  //   res.json(responseObj);
  // } else {
  const { payload, event } = req.body;
  try {
    await postSlackMessage(
      "A new helpdesk has landed (Rich im repurposing this for an app that checks for new helpdesks)"
    );
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
