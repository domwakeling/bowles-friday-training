import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/api-helpers';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const { email, password, secret } = req.body;
  if (!isEmail(email)) {
    res.status(400).send('The email you entered is invalid.');
    return;
  }
  if (!password || !secret) {
    res.status(400).send('Missing field(s)');
    return;
  }
  if (secret !== process.env.CLUB_SECRET) {
    res.status(400).send('Secret is incorrect.');
    return;
  }
  if ((await req.db.collection('users').countDocuments({ email })) > 0) {
    res.status(403).send('The email has already been used.');
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await req.db
    .collection('users')
    .insertOne({
      _id: nanoid(12),
      email,
      password: hashedPassword,
      racers: [],
    })
    .then(({ ops }) => ops[0]);
  req.logIn(user, (err) => {
    if (err) throw err;
    res.status(201).json({
      user: extractUser(req),
    });
  });
});

export default handler;
