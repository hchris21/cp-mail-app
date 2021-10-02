const db = require("../utils/database");

const Mail = db.mails;
const User = db.users;
const Reply = db.replies;

// POST controllers: send mail, reply mail
exports.sendMail = async (req, res) => {
  const { userId, email } = req;
  const { subject, message, to } = req.body;

  const newMail = new Mail({ subject, message, to, from: email, userId });

  const savedMail = await newMail.save().catch((err) => {
    console.error("Error: ", err);
    return res.status(500).send({ message: "Cannot send mail." });
  });

  if (savedMail)
    return res.status(200).send({ message: "Mail sent successfully." });
};

exports.sendReply = async (req, res) => {
  const { email } = req;
  const { message, to, mailId } = req.body;

  const newReply = new Reply({ to, from: email, message, mailId });

  const savedReply = await newReply.save().catch((err) => {
    console.error("Error: ", err);
    return res.status(500).send({ message: "Cannot send reply." });
  });

  if (savedReply)
    return res.status(200).send({ message: "Reply sent successfully." });
};

// GET controllers: get inbox, get outbox, get replies
exports.getSentMails = async (req, res) => {
  const { userId } = req;

  const sentMails = await User.findByPk(userId, { include: ["mails"] })
    .then((result) => {
      const { mails } = result;
      return mails;
    })
    .catch((err) => {
      console.error("Error: ", err);
      return res.status(500).send({ message: "No mails found" });
    });

  if (sentMails.length) return res.status(200).send(sentMails);
};

exports.getReceivedMails = async (req, res) => {
  const { email } = req;

  const receivedMails = await Mail.findAll({ where: { to: email } })
    .then((mails) => {
      console.log(mails);
      return mails;
    })
    .catch((err) => {
      console.error("Error: ", err);
      return res.status(500).send({ message: "Cannot find emails." });
    });

  if (receivedMails.length) return res.status(200).send(receivedMails);
};

exports.getRepliesByMailId = async (req, res) => {
  const { mailId } = req.body;

  const replies = await Mail.findByPk(mailId, { include: ["replies"] })
    .then((result) => {
      const { replies } = result;
      return replies;
    })
    .catch((err) => {
      console.error("Error: ", err);
      return res.status(500).send({ message: "No replies found." });
    });

  if (replies.length) return res.status(200).send(replies);
};
