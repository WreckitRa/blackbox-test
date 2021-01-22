const User = require("../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const expressJwt = require("express-jwt");
const mailerConfig = require("../config/mailer");
const { generateJwt } = require("../auth-jwt/generateJwt");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { isEmpty } = require("lodash");

//* Create, hash password, save user, and send email verification by email
exports.registerUser = async (req, res) => {
  try {
    let { fullName, email, password, verified } = req.body;

    const userCheck = await User.findOne({ email: email.toLowerCase() }).lean();
    if (!isEmpty(userCheck)) {
      const status = 400;
      const message = "User already exists";
      return res.status(400).json({
        message: message,
      });
    }
    //* Hashing password for security
    const salt = await bcrypt.genSalt(10),
      hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      verified,
    });
    const result = await user.save();

    let link = "http://localhost:3000/email-verification/" + result._id;
    let mailOptions = {
      from: "Blackbox Test Team <rafaelkanaan@gmail.com>",
      to: result.email,
      subject: "Account Verification",
      html: mailerConfig.templates.accountVerification(link),
    };
    mailerConfig.smtpTransport.sendMail(mailOptions, (err, resp) => {
      if (err) {
        res.send(err);
      } else {
        return res.status(200).json({
          message: `Email Verification link sent to ${result.email}`,
        });
      }
    });

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    const status = 500;
    const message = "Server Error!";
    console.log(error);
    return res.status(status).json({
      message: message,
    });
  }
};

//* Verify user account
exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: { verified: true },
    });

    return res.status(200).json({ json: user });
  } catch (error) {
    const status = 500;
    const message = "Server Error!";
    res.status(status).json({ message: message });
  }
};

//* Login User with email and password (compared with bcrypt)
exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    const userCheck = await User.findOne({ email: email.toLowerCase() }).lean();
    if (isEmpty(userCheck)) {
      const status = 400;
      const message = "User doesn't exists";
      return res.status(status).json({
        message: message,
      });
    }

    //* Check if user is verified
    if (userCheck.verified === false) {
      const status = 500;
      const message = "Sorry your account is not verified";
      return res.status(status).send({
        message: message,
      });
    }

    //* Comparing hashed passwords
    const passMatch = await bcrypt.compare(password, userCheck.password);

    if (!passMatch) {
      const status = 400;
      const message = "Password is incorrect";
      return res.status(status).json({
        message: message,
      });
    }
    const payload = {
      user: {
        id: userCheck._id,
        role: userCheck.role,
      },
    };
    const registeredToken = await generateJwt(payload);
    res.cookie("token", registeredToken, { expiresIn: "1d" });
    const { _id, fullname } = userCheck;
    console.log(registeredToken);
    return res.status(200).json({
      token: registeredToken,
      user: { _id, fullname, email },
    });
  } catch (error) {
    console.log(error);
    const status = 500;
    const message = "Server Error";
    return res.status(status).json({
      message: message,
    });
  }
};

//* Logout user
exports.logoutUser = async (req, res) => {
  await res.clearCookie("token");
  const status = 200;
  const message = "Logout Success";
  return res.status(status).json({
    message: message,
  });
};

//* Reset password by email
exports.resetPassword = async (req, res) => {
  try {
    let email = req.body.email;
    const userCheck = await User.findOne({ email: email.toLowerCase() }).lean();
    if (isEmpty(userCheck)) {
      const status = 400;
      const message = "User doesn't exists";
      return res.status(status).json({
        message: message,
      });
    }
    crypto.randomBytes(32, async (error, buffer) => {
      if (error) {
        console.log(error);
      }
      const token = buffer.toString("hex");
      const user = await User.findOne({ email: email.toLowerCase() });
      if (isEmpty(user)) {
        const status = 400;
        const message = "User doesn't exist";
        return res.status(status).json({
          message: message,
        });
      }
      user.resetToken = token;
      user.expireResetToken = Date.now() + 3600000;
      const result = await user.save();

      let link = "http://localhost:3000/reset-password/" + token;
      let mailOptions = {
        from: "Blackbox Test Team <rafaelkanaan@gmail.com>",
        to: result.email,
        subject: "Reset Password",
        html: mailerConfig.templates.resetPassword(link),
      };
      mailerConfig.smtpTransport.sendMail(mailOptions, (err, resp) => {
        if (err) {
          res.send(err);
        } else {
          const status = 200;
          const message = `Email Verification link sent to ${result.email}`;
          return res.status(status).json({
            message: message,
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
    const status = 500;
    const message = "Server Error";
    return res.status(status).json({
      message: message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const newPassword = req.body.newPassword;
    const sentToken = req.params.token;
    console.log(sentToken);
    const user = await User.findOne({
      resetToken: sentToken,
      expireResetToken: { $gt: Date.now() },
    });

    if (isEmpty(user)) {
      const status = 400;
      const message = "Request expired";
      return res.status(status).json({
        message: message,
      });
    }
    //* Hashing password for security
    const salt = await bcrypt.genSalt(10),
      hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.expireResetToken = undefined;
    const result = user.save();
    const status = 200;
    const message = `Password successfully changed`;
    return res.status(status).json({
      message: message,
    });
    return res.status();
  } catch (error) {
    console.log(error);
    const status = 500;
    const message = "Server Error";
    return res.status(status).json({
      message: message,
    });
  }
};
