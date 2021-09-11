import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useCurrentUser } from '../lib/hooks';
import Racer from '../components/racer';

const AddRacerPage = () => {
  const [user] = useCurrentUser();

  async function onSubmit(e) {
    e.preventDefault();
    const body = {
      id: user._id,
      racer: e.currentTarget.name.value,
    };
    const res = await fetch('/api/newracer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      Router.replace('/');
      // const userObj = await res.json();
      // mutate(userObj);
    } else {
      // setErrorMsg('Incorrect email or password. Try again!');
    }
  }

  return (
    <>
      <Head>
        <title>Add Racer</title>
      </Head>
      <h2>Add Racer</h2>
      {user && user.racers && user.racers.length > 0 ? (
        <div>
          <p>
            There
            {' '}
            {user.racers.length === 1 ? 'is' : 'are'}
            {' '}
            {user.racers.length}
            {' '}
            {user.racers.length === 1 ? 'racer' : 'racers'}
            {' '}
            on your account:
          </p>
          {
            // eslint-disable-next-line react/no-array-index-key
            user.racers.map((racer, idx) => <Racer key={idx} name={racer.name} status="normal" />)
          }
          <p>
            Do you want to
            {' '}
            <Link href="/addracer"><a>add another racer</a></Link>
            ?
          </p>
        </div>
      ) : (
        <p>There are currently no racers on your account.</p>
      )}
      <form onSubmit={onSubmit}>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="name">n</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="name"
          />
        </div>
        <button type="submit">Add racer</button>
        <br />
      </form>
      <p>
        Or
        {' '}
        <Link href="/"><a>go back to the home page</a></Link>
        .
      </p>
    </>
  );
};

export default AddRacerPage;
