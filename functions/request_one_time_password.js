const admin = require('firebase-admin')
const twilio = require('./twilio')
const text = require('textbelt')

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

      text.send(phone, 'Your code is ' + code, undefined, function(err) {
        if (err) {
          console.log(err)
        }
      })

      // twilio.messages.create(
      //   {
      //     body: 'Your code is ' + code,
      //     to: phone,
      //     from: '+12405341270'
      //   },
      //   err => {
      //     if (err) {
      //       console.log('twilio.messages.create', err)
      //       return res.status(422).send(err)
      //     }

      //     admin
      //       .database()
      //       .ref('users/' + phone)
      //       .update({ code: code, codeValid: true }, () => {
      //         res.send({ success: true })
      //       })
      //   }
      // )
    })
    .catch(err => {
      res.status(422).send({ error: err })
    })
}
