import React from 'react';
import useSWR from 'swr';
import { useCurrentUser } from '../lib/hooks';
import Racer from './racer';
import fetcher from '../lib/fetch';

export const getFriday = () => {
  const date = new Date();
  // eslint-disable-next-line no-mixed-operators
  date.setDate(date.getDate() + (12 - date.getDay()) % 7);
  const ds0 = (`0${date.getDate()}`).slice(-2) + (`0${date.getMonth() + 1}`).slice(-2) + date.getFullYear();
  let ds1 = date.toDateString().split(' ');
  ds1 = `${ds1[2]} ${ds1[1]} ${ds1[3]}`;
  date.setDate(date.getDate() - 7);
  const ds2 = (`0${date.getDate()}`).slice(-2) + (`0${date.getMonth() + 1}`).slice(-2) + date.getFullYear();
  return [ds0, ds1, ds2];
};

const Bookings = () => {
  const [user] = useCurrentUser();
  const ds = getFriday();
  // update every 60 seconds; also triggered by adding/removing a racer
  const { data, error } = useSWR(`/api/booking/${ds[0]}`, fetcher, { refreshInterval: 60000 });

  if (error) return <div>failed to load</div>;

  if (!data) {
    return (
      <div>
        <h2>
          Bookings for
          {' '}
          {ds[1]}
        </h2>
        <p>loading...</p>
        <br />
      </div>
    );
  }

  // const idxs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  //   16, 17, 18, 19, 20, 21, 22, 23, 24];
  const idxs = Array.from(Array(ds[0] === '01102021' ? 40 : 25).keys());
  return (
    <div>
      <h2>
        Bookings for
        {' '}
        {ds[1]}
      </h2>
      {ds[0] === '18092020' ? (
        <p className="alert-text">
          The club fun-race for 11s-&amp;-Under (anyone born between 2009-2014 inclusive)
          is being held this Friday, 18 September. Please only book in for racers in those
          age groups. If you wish to race but bookings are full, please contact Nigel.
        </p>
      ) : ''}
      {ds[0] === '25092020' ? (
        <p className="alert-text">
          The club fun-race for 14s-&amp;-Under or older (anyone born 2008 or earlier)
          is being held this Friday, 25 September. Please only book in for racers in those
          age groups. If you wish to race but bookings are full, please contact Nigel.
        </p>
      ) : ''}
      {(ds[0] === '21012022' || ds[0] === '28012022' || ds[0] === '04022022') ? (
        <div className="alert-text">
          <p>Unfortunately there is no race club at the moment.</p>
          <p>Please keep an eye on Facebook or the WhatsApp chat for updates.</p>
        </div>
      ) : (
        <>
          <br />
          <div className="racerlist">
            {
              idxs.map((i) => (
                data && (data.length > i) ? (
                  <Racer
                    key={i}
                    tabNum={i}
                    name={data[i].name}
                    status={(user && data[i].userid === user._id) ? 'highlight' : 'normal'}
                  />
                ) : (
                  <Racer key={i} name="free" status="unused" />
                )
              ))
            }
          </div>
        </>
      )}
    </div>
  );
};

export default Bookings;
