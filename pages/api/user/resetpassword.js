import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import nextConnect from 'next-connect';
import database from '../../../middlewares/database';
import { htmlBody, textBody } from '../../../lib/email_html';

const handler = nextConnect();

handler.use(database);

handler.post(async (req, res) => {
  // check email exists
  const user = await req.db
    .collection('users')
    .findOne({ email: req.body.email });
  if (!user) {
    res.status(401).send('The email is not registered.');
    return;
  }
  // store token
  const token = crypto.randomBytes(32).toString('hex');
  await req.db.collection('tokens').insertOne({
    token,
    userId: user._id,
    type: 'passwordReset',
    expireAt: new Date(Date.now() + 1000 * 60 * 60),
  });

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PW,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  const plainBodyText = textBody(process.env.WEB_URI, token);
  const htmlBodyText = htmlBody(process.env.WEB_URI, token);
  // eslint-disable-next-line no-unused-vars
  const info = await transport.sendMail({
    from: process.env.EMAIL_FROM,
    to: req.body.email,
    subject: 'Bowles Training - Reset your password',
    text: plainBodyText,
    html: htmlBodyText,
    auth: {
      user: process.env.EMAIL_FROM,
    },
  });

  res.end('ok');
});

handler.put(async (req, res) => {
  // password reset
  if (!req.body.password) {
    res.status(400).send('Password not provided');
    return;
  }
  const { value: tokenDoc } = await req.db
    .collection('tokens')
    .findOneAndDelete({ token: req.body.token, type: 'passwordReset' });
  if (!tokenDoc) {
    res.status(403).send('This link may have been expired.');
    return;
  }
  const password = await bcrypt.hash(req.body.password, 10);
  await req.db
    .collection('users')
    .updateOne({ _id: tokenDoc.userId }, { $set: { password } });
  res.end('ok');
});

export default handler;
