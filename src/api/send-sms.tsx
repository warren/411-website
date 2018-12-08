// send-sms.tsx
/**
 * Typescript
 * Twilio version: ^3.15.0
 */

import * as Twilio from 'twilio';

// getting ready
const TWILIO_NUMBER = process.env.REACT_APP_TWILIO_NUMBER;
const TWILIO_ACCOUNT_SID = process.env.REACT_APP_TWILIO_SID;
const TWILIO_AUTH_TOKEN = process.env.REACT_APP_TWILIO_AUTH_TOKEN;

// @ts-ignore
const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// start sending message

export function sendSMS(phoneNumber){
        if ( !validE164(phoneNumber) ) {
            throw new Error('number must be E164 format!')
        }

        const textContent = {
            body: 'Hello from Uber Eats Out',
            to: phoneNumber,
            from: TWILIO_NUMBER
        }

        client.messages.create(textContent)
            .then((message) => console.log(message.to))
}

// Validate E164 format
function validE164(num) {
    return /^\+?[1-9]\d{1,14}$/.test(num)
}