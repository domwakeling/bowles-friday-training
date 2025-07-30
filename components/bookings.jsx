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

  // also change in pages/api/booking/[week]/index.js
  const idxs = Array.from(Array(ds[0] === '18042025' ? 45 : 25).keys());
  return (
    <div>
      <h2>
        Bookings for
        {' '}
        {ds[1]}
      </h2>
      {ds[0] === '18042025' ? (
        <p className="alert-text">
          The club fun-race is being held this Friday, 18 April.
        </p>
      ) : ''}
      {ds[0] === '25092020' ? (
        <p className="alert-text">
          The club fun-race for 14s-&amp;-Under or older (anyone born 2008 or earlier)
          is being held this Friday, 25 September. Please only book in for racers in those
          age groups. If you wish to race but bookings are full, please contact Nigel.
        </p>
      ) : ''}
      {(ds[0] === '15082025' || ds[0] === '22082025') ? (
        <div className="alert-text">
          <p>
            The main slope at Bowles will be closed for maintenance from Monday 11th August to
            Friday 22nd August. Therefore no Race Club on Tuesday 12th, Friday 15th, Tuesday 19th
            and Friday 22nd.
          </p>
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
