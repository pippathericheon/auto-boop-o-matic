import Slack from "@slack/bolt";
import dotenv from "dotenv";

dotenv.config();

const blocks = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "Here is a message sent by this stupid app",
    },
  },
  {
    type: "divider",
  },
];

const app = new Slack.App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

await app.client.chat.postMessage({
  token: process.env.SLACK_BOT_TOKEN,
  channel: process.env.SLACK_CHANNEL,
  text: "Here's a message sent by this stupid app",
  blocks,
});

