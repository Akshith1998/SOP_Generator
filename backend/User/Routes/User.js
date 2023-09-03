const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { OpenAI } = require("openai");
const { DetailsQuestions } = require("../Data/data");
const { systemMess, FinalUserMess } = require("../Data/gptMessages");
const nodemailer = require("nodemailer");

const AIApiCall = async (Details) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  let userMessage = "";
  for (let detail in Details) {
    for (let field in Details[detail]) {
      userMessage +=
        DetailsQuestions[field] + ": " + Details[detail][field] + " ,";
    }
  }
  userMessage = userMessage.slice(0, -1);
  userMessage += FinalUserMess;
  const completions = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemMess },
      { role: "user", content: userMessage },
    ],
  });
  const output_mess = completions.choices[0].message.content;
  return output_mess;
};

router.post("/", async (req, res) => {
  AIApiCall(req.body)
    .then((data) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "akshithpatluri@gmail.com",
          pass: process.env.MailPassKey,
        },
      });

      const mailOptions = {
        from: "akshithpatluri@gmail.com",
        to: req.body.PersonalDetails.email,
        subject: "SOP from NovoSOP Generator",
        text: data,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(400).send("error in sending the mail");
        } else {
          res.status(200).send("success");
        }
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });

  res.status(200).send("success");
});

module.exports = router;
