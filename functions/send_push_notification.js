const Expo = require('expo-server-sdk');

module.exports = function(req, res) {
  // Create a new Expo SDK client
  const expo = new Expo();

  // Create the messages that you want to send to clents
  const messages = [{
    to: req.body.pushToken,
    sound: 'default',
    body: req.body.info,
    data: { text: req.body.text },
  }];

  // The Expo push notification service accepts batches of notifications so
  // that you don't need to send 1000 requests to send 1000 notifications. We
  // recommend you batch your notifications to reduce the number of requests
  // and to compress them (notifications with similar content will get
  // compressed).
  const chunks = expo.chunkPushNotifications(messages);

  // Send the chunks to the Expo push notification service. There are
  // different strategies you could use. A simple one is to send one chunk at a
  // time, which nicely spreads the load out over time:
  for (const chunk of chunks) {
    expo.sendPushNotificationsAsync(messages)
      .then(function(receipts) {
        res.send({ success: true });
      })
      .catch(function(err) {
        console.log('send notification error');
        console.error(err);
        res.status(422).send({ error: err })
      });
  }
};
