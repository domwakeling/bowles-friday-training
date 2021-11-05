# Simple App for Booking Friday Night Training ...

... required (if at all) due to restrictions caused by Covid.

Based on a [starter project](https://github.com/hoangvvo/nextjs-mongodb-app), and uses a
(stripped down) version of [react-nextjs-toast](https://www.npmjs.com/package/react-nextjs-toast)
for on-screen notifications.

Functionality:
* email-based accounts with email resets
* add racers to an account (no ability to edit/delete, requires db admin; racers are unique to
  a user but **not** unique objects)
* add/remove racers from the present week's booking (always shows "this Friday", so booking for the
  week opens on Saturday morning)

Live database hosted on MongoDB Atlas.

NB: does not work with Node v17.x, use Node v16.x