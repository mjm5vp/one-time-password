const admin = require('firebase-admin');

module.exports = function(req, res) {
  //Verify the user provided a phone
  if (!req.body.phone) {
    return res.status(422).send({ error: 'bad input' })
  }
  //Format the phone number to remove dashes or parens
  const phone = String(req.body.phone).replace(/[^\d]/g);

  //Create new user account with that phone number
  admin.auth.createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(error => res.status(422.send({ error })))

  //Respond to that user request saying the account was made
}
