const axios = require("axios");
require("dotenv").config();

const postSlackMessage = (messageContent) => {
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
