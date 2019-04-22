const admin = require('firebase-admin')

const PLIVO_AUTH_ID = require('./plivo').PLIVO_AUTH_ID
const PLIVO_AUTH_TOKEN = require('./plivo').PLIVO_AUTH_TOKEN

let plivo = require('plivo')
let client = new plivo.Client(PLIVO_AUTH_ID, PLIVO_AUTH_TOKEN)

module.exports = function(req, res) {
  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number' })
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '')

  admin
    .auth()
    .getUser(phone)
    .then(userRecord => {
      const code = Math.floor(Math.random() * 8999 + 1000)

      client.messages
        .create('12027953199', '1' + phone, 'Your code is ' + code)
        .then(function(message_created) {
          admin
            .database()
            .ref('users/' + phone)
            .update({ code: code, codeValid: true }, () => {
              res.send({ success: true })
            })
        })
        .catch(err => {
          return res.status(422).send(err)
        })
    })
    .catch(err => {
      console.log('overall error')
      res.status(422).send({ error: err })
    })
}
