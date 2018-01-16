const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./create_user');
const serviceAccount = require('./service_account.json');
const requestOneTimePassword = require('./request_one_time_password');
const verifyOneTimePassword = require('./verify_one_time_password');
const sendPushNotification = require('./send_push_notification');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-698fc.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser)
exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword)
exports.verifyOneTimePassword = functions.https.onRequest(verifyOneTimePassword)
exports.sendPushNotification = functions.https.onRequest(sendPushNotification)
