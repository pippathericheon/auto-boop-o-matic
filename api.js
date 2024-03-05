const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();

const postSlackMessage = (messageContent) => {
  // Webhook request event type is a challenge-response check
  if (request.body.event === "endpoint.url_validation") {
    const hashForValidate = crypto
      .createHmac("sha256", ZOOM_WEBHOOK_SECRET_TOKEN)
      .update(request.body.payload.plainToken)
      .digest("hex");

    response.status(200);
    response.json({
      plainToken: request.body.payload.plainToken,
      encryptedToken: hashForValidate,
    });
  }

  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: messageContent,
      },
    },
    {
      type: "divider",
    },
  ];
  const slackApiEndpoint = "https://slack.com/api/chat.postMessage";
  const payload = {
    token: process.env.SLACK_BOT_TOKEN,
    channel: process.env.SLACK_CHANNEL,
    blocks,
  };
  return axios.post(slackApiEndpoint, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
    },
  });
};

module.exports = { postSlackMessage };
