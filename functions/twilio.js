const twilio = require('twilio');

const accountSid = 'AC539a2446302efe622fce4b22327aaff9';
const authToken = '4532548f0d821dc75642cd38bf845204';

module.exports = new twilio.Twilio(accountSid, authToken);
