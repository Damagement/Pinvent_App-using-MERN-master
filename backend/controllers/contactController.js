const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const contactUs = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }

  //   Validation
  if (!subject || !message) {
    res.status(400);
    throw new Error("Please add subject and message");
  }

  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = user.email;


  transporter.sendMail(message, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
  try {
    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

module.exports = {
  contactUs,
};