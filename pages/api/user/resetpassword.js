import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import nextConnect from 'next-connect';
import database from '../../../middlewares/database';

const handler = nextConnect();
const { OAuth2 } = google.auth;
const myOAuth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

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
    expireAt: new Date(Date.now() + 1000 * 60 * 20),
  });

  myOAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  const myAccessToken = myOAuth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_FROM,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: myAccessToken,
    },
  });

  const info = await transport.sendMail({
    from: process.env.EMAIL_FROM,
    to: req.body.email,
    subject: 'Bowles Training - Reset your password',
    text: `There has been a request to reset your password for the Bowles SRC training booking app.\n\n
            Please go to ${process.env.WEB_URI}/forget-password/${token} to reset your password.\n\n
            If you did not request a password reset, please contact Dom Wakeling.`,
    html: `
        <div>
          <p>There has been a request to reset your password for the Bowles SRC training booking app.</p>
          <p>Please follow <a href="${process.env.WEB_URI}/forget-password/${token}">this link</a> to reset your password.</p>
          <p>If you did not request a password reset, please contact Dom Wakeling.</p>
        </div>
        `,
    auth: {
      user: process.env.EMAIL_FROM,
    },
  });

  // eslint-disable-next-line no-console
  console.log(info);

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
