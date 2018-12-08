// import * as twilio from 'twilio';
//
// const TWILIO_ACCOUNT_SID = process.env.REACT_APP_TWILIO_SID;
// const TWILIO_AUTH_TOKEN = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
//
//
//
// // const API = 'https://localhost:3000/pages/ride-request';
//
// export function sendSMS() {
//   const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
//
//   client.messages
//     .create({
//       body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//       from: '+16172497227',
//       to: '+17817425803' // TODO do not hardcode
//     })
//     .then(message => console.log(message.sid))
//     .done();
//
//   // return the promise itself
//   // return fetch(url).then( (res) => res.json() );
// }