const client = require('twilio')(accountSid, authToken);

const TWILIO_NUMBER = '+16172497227';

const express = require('express');
const os = require('os');

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/sendSMS', (req, res) => {
    const user_id = req.param('url');
    client.messages
    .create({
        body: 'FUCK CS411',
        from: '+16176572429',
        to: '+12035594231'
    })
    .then(message => console.log(message.sid))
    .done();

    client.messages
    .create({
        body: 'FUCK CS411',
        from: '+16176572429',
        to: '+16616783812'
    })
    .then(message => console.log(message.sid))
    .done();


    client.messages
    .create({
        body: 'FUCK CS411',
        from: '+16176572429',
        to: '+17186501429'
    })
    .then(message => console.log(message.sid))
    .done();


    client.messages
    .create({
        body: 'FUCK CS411',
        from: '+16176572429',
        to: '+17817425803'
    })
    .then(message => console.log(message.sid))
    .done();


    res.send({message: 'ok'})
});
app.listen(8080, () => console.log('Listening on port 8080!'));
