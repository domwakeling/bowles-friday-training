import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useCurrentUser } from '../lib/hooks';
import Copyright from './copyright';
import { ToastContainer } from './toast';

const Layout = ({ children }) => {
  const [user, { mutate }] = useCurrentUser();
  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    mutate(null);
    Router.replace('/');
  };
  return (
    <>
      <style jsx global>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap')
          html {
            padding: env(safe-area-inset);
          }
          @media (max-width: 899px) {
            .racerlist {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
            }
          }
          @media (min-width: 600px) and (max-width: 899px) {
            .container, nav {
              width: 600px;
            }
          }
          @media (min-width: 900px) {
            .container, nav {
              width: 900px;
            }
          }
          .container, nav {
            padding-left: 10px;
            padding-right: 10px;
            margin: auto;
          }
          main {
            margin-top: 10px;
          }
          hr {
            border: none;
            background-color: #d79022;
            height: 1px;
            opacity: 0.7;
          }
          body {
            margin: 0;
            padding: 0;
            color: #111;
            font-family: 'Fira Sans', sans-serif;
            font-size: 18px;
            background-color: #fff;
          }
          h1, h2, h3, h4, h5, h6 {
           font-family: 'Playfair Display', serif;
          }
          h2 {
            color: #394c8f;
            display: inline-block;
            padding-bottom: 0.3em;
            border-bottom: 3px solid #d79022;
            font-size: 1.75rem;
            line-height: 1.1em;
            margin-top: 0;
          }
          h3 {
            font-size: 1.6rem;
            color: #394c8f;
          }
          h4 {
            color: #a06b19;
            font-size: 1.2rem;
          }
          h5 {
            font-size: 1rem;
          }
          a {
            color: #394c8f;
            text-decoration: none;
            cursor: pointer;
          }
          a:hover {
            text-decoration: underline !important;
          }
          button {
            display: block;
            margin-bottom: 0.5rem;
            color: #fff;
            border-radius: 5px;
            border: none;
            background-color: #394c8f;
            cursor: pointer;
            transition: all 0.2s ease 0s;
            padding: 10px 25px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
            font-size: 1.0rem;
          }
          button:hover,
          button:active {
            transform: translate3d(0px, -1px, 0px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          }
          input {
            border: 1px solid #d79022;
            min-width: 20rem;
            margin-bottom: 0.75rem;
            border-radius: 0.25rem;
            padding: 0.5rem 0 0.5rem 0.2rem;
            font-size: 1rem;
          }
          label, .circle {
            font-size: 1.5rem;
            display: inline-block;
            background-color: #394c8f;
            border-radius: 50%;
            width: 2.1rem;
            height: 2.1rem;
            text-align: center;
            color: white;
            margin-right: 0.75rem;
            position: relative;
          }
          header {
            border-bottom: 1px solid #d8d8d8;
            background-color: #394C8F;
          }
          nav {
            max-width: 900px;
            margin: auto;
            padding: 0.5em;
            color: white;
          }
          nav div {
            margin-top: 0.5rem;
            float: right;
          }
          nav div a {
            font-size: 1.1rem;
            margin-left: 1rem;
            color: white;
          }
          nav h1 {
            color: #EAECF6;
            font-size: 1.7rem;
            margin: 0px 0.4rem;
            font-weight: 700;
            float: left;
          }
          nav img {
            float: left;
            padding-top: 4px;
          }
          nav:after {
            content: '';
            clear: both;
            display: table;
          }
          footer {
            text-align: center;
            font-size: 0.8rem;
            margin-top: 1rem;
            padding: 3rem;
            color: #888;
          }
          @media (max-width: 335px) {
            input {
              min-width: 15rem;
            }
          }
          @media (min-width: 336px) and (max-width: 365px) {
            input {
              min-width: 17rem !important;
            }
          }
          @media (min-width: 366px) and (max-width: 400px) {
            input {
              min-width: 18rem !important;
            }
          }
          .number-circle-list {
            list-style: none;
            padding-left: 1rem;
            counter-reset: circle-counter;
          }

          .number-circle-list--list-item {
            counter-increment: circle-counter;
            margin-bottom: 0.25rem;
          }
          .number-circle-list--list-item:before {
            content: counter(circle-counter);
            background-color: gray;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            display: inline-block;
            font-size: 0.75rem;
            line-height: 1.5rem;
            color: $default-color;
            text-align: center;
            margin-right: 0.5rem;
            position: relative;
            top: -2px;
          }
          .number-circle-list--list-item:last-child {
            margin-bottom: 0;
          }
          .number-circle-list--list-item > .number-circle-list--list-item {
            margin-left: 0.25rem;
          }
          .number-circle-list--primary-color > .number-circle-list--list-item:before {
              background-color: #394C8F;
              color: white;
            }
          }
          p.alert-text, div.alert-text {
            border: 2px solid #394C8F;
            border-radius: 0.25rem;
            padding: 0.5rem;
            background-color: #F7E7CE;
          }
        `}
      </style>
      <Head>
        <title>Bowles SRC - Friday Training Sessions</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Booking for Bowles Ski Racing Club Friday night training sessions during Covid limitations"
        />
        <meta property="og:title" content="Bowles SRC - Friday Training Sessions" />
      </Head>
      <header>
        <ToastContainer align="right" position="top" />
        <nav>
          <Link href="/">
            <a>
              <img alt="Bowles Ski Racing Club logo" src="data:image/png;base64,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" />
              <h1>Bowles Ski Racing Club</h1>
            </a>
          </Link>
          <div>
            {/* {!user ? (
              <>
                <Link href="/login">
                  <a>Sign in</a>
                </Link>
                <Link href="/signup">
                  <a>Sign up</a>
                </Link>
              </>
            ) : (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a tabIndex={0} role="button" onClick={handleLogout}>
                Logout
              </a>
            )} */}
          </div>
        </nav>
      </header>
      <div className="container">
        <main>{children}</main>
        <hr />
        <Copyright />
      </div>
    </>
  );
};

export default Layout;
