const nodemailer = require("nodemailer");

/*
    Configuring the SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rafaelkanaan@gmail.com",
    pass: "R@f@el1234#$",
  },
});

//* Mail Templates

const accountVerification = (link) => `
Hi,<br/> <br/>
Thank you for registering on our website.<br/>
Please click on the link below to verify your email address<br/>${link}<br/>
Once verified, you will be able to login.<br/>
<b>Thank you for using Twelver</b>
<br/>
Blackbox Test Team 
<br/>
`;

const resetPassword = (link) => `
Hi, <br/> <br/>
You requested for password reset, if it was not you, just ignore the email.<br>
Please click on the link below to reset your password<br>${link}<br>
<b>Thank you for using Twelver.</b>
<br/>
Blackbox Test Team
<br/>
`;

module.exports = {
  smtpTransport,
  templates: {
    accountVerification,
    resetPassword,
  },
};
