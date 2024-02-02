const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/zoom-webhook", async (req, res) => {
  const { event, payload } = req.body;

  if (event === "meeting.ended") {
    const slackWebhookUrl =
      "https://hooks.slack.com/services/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";
    const slackMessage = `Zoom meeting ended: ${payload.topic}`;

    try {
      await axios.post(slackWebhookUrl, { text: slackMessage });
      console.log("Slack message sent successfully");
      res.status(201).send("OK");
    } catch (error) {
      const { data, status, headers, response } = error;
      res.status(400).send({
        msg: "There be a problem",
        status,
        headers,
        data,
        response,
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
