// Before running any of this remember that you need to have the redis server running. I wrote a note in the README of how to do this

// THIS WORKS WHEN YOU DO node redisDemo.tsx

var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

client.set('my test key', 'my test value', redis.print);
client.get('my test key', function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    console.log('GET result ->' + result);
});

// THIS DOES NOT SEEM TO WORK AT ALL
/*
import { Tedis } from "tedis";

const tedis = new Tedis({
  port: 6379,
  host: "127.0.0.1",
});

async function f() {
await tedis.set("mystring", "hello");
// "OK"
await tedis.get("mystring");
}
*/

