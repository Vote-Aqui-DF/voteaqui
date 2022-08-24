const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "voteaquidf@gmail.com",
//    pass: "Vote!QAZxsw2",
    pass: "rhgpzntaqvhfviyc",
  },
  
});

module.exports = transporter;

// auth: {
//   user: 'lacodeamordf@gmail.com',
//   // pass: 'Laco-de-amor2020'
//   pass: 'fuxpykfclldpxzdb'
// }

// auth: {
//   user: 'asserdf@gmail.com',
//   pass: 'usuario3'
// }
