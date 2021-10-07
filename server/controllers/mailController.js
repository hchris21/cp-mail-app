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
  const { email } = req;
  const { page, limit } = req.query;

  const offset = page * limit;

  const sentMails = await Mail.findAndCountAll({
    where: { from: email },
    offset: Number(offset),
    limit: Number(limit),
    order: [["createdAt", "DESC"]],
  })
    .then((mails) => {
      if (mails.count === 0)
        return res.status(200).send({ message: "No mails found" });

      return mails;
    })
    .catch((err) => {
      console.error("Error: ", err);
      return res.status(500).send({ message: "No mails found" });
    });

  if (sentMails.count) return res.status(200).send(sentMails);
};

exports.getReceivedMails = async (req, res) => {
  const { email } = req;
  const { page, limit } = req.query;

  const offset = page * limit;

  const receivedMails = await Mail.findAndCountAll({
    where: { to: email },
    offset: Number(offset),
    limit: Number(limit),
    order: [["createdAt", "DESC"]],
  })
    .then((mails) => {
      if (mails.count === 0)
        return res.status(200).send({ message: "No mails found" });

      return mails;
    })
    .catch((err) => {
      console.error("Error: ", err);
      return res.status(500).send({ message: "Cannot find emails." });
    });

  if (receivedMails.count) return res.status(200).send(receivedMails);
};

exports.getRepliesByMailId = async (req, res) => {
  const { mailId } = req.query;

  const replies = await Reply.findAll({
    where: { mailId },
    order: [["createdAt", "ASC"]],
  })
    .then((replies) => {
      if (replies.length === 0)
        return res.status(500).send({ message: "No mails found" });
      return replies;
    })
    .catch((err) => {
      console.error("Error: ", err);
      return res.status(500).send({ message: "No replies found." });
    });

  if (replies.length) return res.status(200).send(replies);
};

// DELETE Routes: deleteMail()
exports.deleteMail = async (req, res) => {
  const { mailId } = req.body;

  const mailToDelete = await Mail.findOne({ where: { id: mailId } });

  if (mailToDelete) {
    // Delete also the associated replies to the mail
    await Reply.destroy({ where: { mailId } });

    await mailToDelete.destroy().catch((err) => {
      return res.status(500).send({ message: "Could not delete mail." });
    });
    return res.status(200).send({ message: "Mail deleted." });
  }

  return res.status(500).send({ message: "Could not delete mail." });
};
