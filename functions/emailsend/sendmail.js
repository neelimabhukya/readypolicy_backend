var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport("SMTP", {
    host: 'smtp.ipage.com',
    port: 587,
    secure: true,
    auth: {
        user: "vikram.viswanathan@rapidqube.com",
        pass: "Rpqb@12345"
    }
});

var mailOptions = {
  from: 'vikram.viswanathan@rapidqube.com',
  to: 'rahul.desai@rapidqube.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});