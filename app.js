const express = require("express");
const bodyParser = require("body-parser");
const { postSlackMessage } = require("./api");
const crypto = require("crypto");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/zoom-webhook", async (req, res) => {
  if (req.body.event === "endpoint.url_validation") {
    const hashForValidate = crypto
      .createHmac("sha256", ZOOM_WEBHOOK_SECRET_TOKEN)
      .update(request.body.payload.plainToken)
      .digest("hex");

    res.status(200);
    res.json({
      plainToken: request.body.payload.plainToken,
      encryptedToken: hashForValidate,
    });
  } else {
    const { payload, event } = req.body;
    try {
      await postSlackMessage("testing 1 2 3");
      res.status(200).send("OK");
    } catch (error) {
      res.status(error.response.status).send({
        msg: "There be a problem",
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
