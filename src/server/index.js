const accountSid = 'AC704ae2f7dceebc107990a030a08f99bd';
const authToken = '92c486b7b2d75bb993602d93ba607233';
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
        body: 'Hello Joanne',
        from: '+16176572429',
        to: '+12035594231'
    })
    .then(message => console.log(message.sid))
    .done();
    res.send({'HTTP': 'ok'})
});
app.listen(8080, () => console.log('Listening on port 8080!'));
