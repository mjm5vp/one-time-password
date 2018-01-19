const admin = require('firebase-admin');

module.exports = function(req, res) {
  admin.auth().deleteUser(req.body.uid)
    .then(() => res.send({ success: true }))
    .catch(err => res.status(422).send({ error: err }));
}
