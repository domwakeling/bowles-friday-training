import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const { id, racer } = req.body;
  if (!id) {
    res.status(400).send('No active user');
    return;
  }
  if (!racer) {
    res.status(400).send('No name entered');
    return;
  }
  await req.db
    .collection('users')
    .updateOne({ _id: id }, { $addToSet: { racers: { name: racer, club: 'Bowles' } } });
  res.end('ok');
});

export default handler;
