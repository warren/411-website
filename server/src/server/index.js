

// const accountSid = 'AC6331de202bc601ed673dd8899e9b7be8';
// const authToken = 'a9e5a08f2e16bea8ff212a36752b5cda';


const accountSid = 'AC704ae2f7dceebc107990a030a08f99bd';
const authToken = '92c486b7b2d75bb993602d93ba607233';

const client = require('twilio')(accountSid, authToken);

const express = require('express');
const os = require('os');

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/sendSMS', (req, res) => {

    linkToOwner = req.query.url + '&client_id=' + req.query.client_id + '&pickup=' + req.query.pickup + '&dropoff[formatted_address]=' + req.query.dropoff.formatted_address.split(' ').join('%20');
    console.log(linkToOwner)
    linkToFriends = `http://maps.google.com/maps?f=d&daddr=${req.query.dropoff.formatted_address.split(' ').join('+')}`
    
    //owner
    client.messages
    .create({
        body: linkToOwner,
        from: '+16176572429',
        to: '+17817425803'
    })
    .then(message => console.log(message.sid))
    .done();

    
    //friend 1
    client.messages
    .create({
        body: linkToFriends,
        from: '+16176572429',
        to: '+16616783812'
    })
    .then(message => console.log(message.sid))
    .done();

    //friend 2
    client.messages
    .create({
        body: linkToFriends,
        from: '+16176572429',
        to: '+17186501429'
    })
    .then(message => console.log(message.sid))
    .done();

    //friend 3
    client.messages
    .create({
        body: linkToFriends,
        from: '+16176572429',
        to: '+12035594231'
    })
    .then(message => console.log(message.sid))
    .done();
    
    res.send({message: 'ok'})
});
app.listen(8080, () => console.log('Listening on port 8080!'));
