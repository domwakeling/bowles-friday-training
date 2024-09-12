import nextConnect from 'next-connect';
import middleware from '../../../../middlewares/middleware';

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  const forFriday = req.query.week;

  if (!req.user || !req.user.email) {
    // eslint-disable-next-line
    console.log('booking info requested without user/email; rejecting');
    res.send([]);
    return;
  }

  // eslint-disable-next-line
  console.log('booking info request from', req.user.email);

  const bookings = await req.db
    .collection('bookings')
    .findOne({
      forWeek: forFriday,
    });

  res.send(bookings ? bookings.racers : []);
});

handler.post(async (req, res) => {
  const forFriday = req.query.week;
  const {
    id, name, club,
  } = req.body;

  if (!req.user || !req.user.email) {
    // eslint-disable-next-line
    console.log('new booking requested without user/email; rejecting');
    res.send([]);
    return;
  }

  // eslint-disable-next-line
  console.log('new booking request from', req.user.email);

  const bookings = await req.db
    .collection('bookings')
    .findOne({
      forWeek: forFriday,
    });

  const racersCount = bookings ? bookings.racers.length : 0;
  // eslint-disable-next-line max-len
  const racerFound = bookings ? bookings.racers.filter((racer) => (racer.userid === id && racer.name === name)).length > 0 : false;

  // also change in components/bookings.jsx
  const maxRacers = forFriday === '11102024' ? 45 : 25;

  // if no booking was found set one up; expire after 30 days (minimise db size)
  if (!bookings) {
    await req.db
      .collection('bookings')
      .insertOne({
        forWeek: forFriday,
        racers: [],
        expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      });
  }

  // no space and racer wasn't found
  if (racersCount >= maxRacers && !racerFound) {
    res.status(400);
    res.send('No places available');
    res.end();
    return;
  }

  // space and racer wasn't found
  if (racersCount < maxRacers && !racerFound) {
    const today = new Date();
    const weekday = today.getDay();
    const hour = today.getHours();
    // check if its the fun race and they're not Bowles
    if (forFriday === '29042022' && club !== 'Bowles') {
      res.status(413);
      res.send('Racer represents another club.');
      res.end();
      return;
    }
    // check if it's weekend  ...
    if (weekday === 0 || weekday === 6 || (weekday === 5 && hour > 17)) {
      // look for previous week's booking - ** NOT REQUIRED ANY MORE ON FRIDAYS
      // const prevWeek = await req.db.collection('bookings').findOne({
      //   forWeek: prev,
      // });
      // check there is an entry and find out if this racer was booked in - ** NOT REQUIRED FRIDAYS
      // if (prevWeek
      //   && prevWeek.racers.filter((r) => r.userid === id && r.name === name).length > 0) {
      //   res.status(409);
      //   res.send('Racer booked previous week.');
      //   res.end();
      //   return;
      // }
      // check what club
      if (club !== 'Bowles') {
        res.status(412);
        res.send('Racer represents another club.');
        res.end();
        return;
      }
    }

    await req.db.collection('bookings')
      .updateOne(
        { forWeek: forFriday },
        { $addToSet: { racers: { userid: id, name } } },
      );
    res.end('ok');
    return;
  }

  // racer was found, omit them
  await req.db.collection('bookings')
    .updateOne(
      { forWeek: forFriday },
      { $pull: { racers: { userid: id, name } } },
    );

  res.end('ok');
});

export default handler;
