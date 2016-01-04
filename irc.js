const irc = require('irc');

var answerer = require('./answerer');
var fs = require('fs');

const username = 'firedigger';
const irc_password = '783831d1';

const irc_client = new irc.Client('irc.ppy.sh', username, {
	userName: username,
	password: irc_password,
	showErrors: false,
	floodProtection: true,
	floodProtectionDelay: 2000,
	autoConnect: false
});

var irc_answerer;

if (fs.existsSync('data'))
{
    irc_answerer = new answerer(irc_client,answerer.deserialize_processors(fs.readFileSync('data')));
}
else
    irc_answerer = new answerer(irc_client);

irc_client.addListener('pm', function (from, message) {
    if (message.charAt(0) === '!') {
        console.log(from + ' => ME: ' + message);
        irc_answerer.process(from,message);
    }
});

irc_client.addListener('error', function(message) {
    console.log('error: ', message);
});

irc_client.addListener('connect', function(){
    console.log('Connected!');
});

process.on('exit', function (code) {
    console.log('Exiting');
    irc_answerer.save();
});

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    process.exit(1);
});

var debug = false;

if (debug)
{
    irc_client.connect(1,function() {
        irc_client.say(username,'!watch hvick225');
        //irc_client.say(username,'!watch firedigger');
        irc_client.say(username,'!update');

        irc_client.say(username,'!save data');
        //setTimeout(function() {irc_client.say(username,'!kill Killer is dead');},5000);
    });
}
else
    irc_client.connect();

