const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/zoom-webhook', async (req, res) => {
  const { event, payload } = req.body;

  if (event === 'meeting.ended') {
    const slackWebhookUrl = 'https://hooks.slack.com/services/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';
    const slackMessage = `Zoom meeting ended: ${payload.topic}`;

    try {
      await axios.post(slackWebhookUrl, { text: slackMessage });
      console.log('Slack message sent successfully');
    } catch (error) {
        console.log(error);
      console.error('Error sending Slack message:', error.message);
    }
  }

  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});