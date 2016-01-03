const irc = require('irc');

var answerer = require('./answerer');

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

var irc_answerer = new answerer(irc_client);

irc_client.addListener('pm', function (from, message) {
    console.log(from + ' => ME: ' + message);
    if (message.charAt(0) === '!') {
        //console.log('0');
        irc_answerer.process(from,message);
        //console.log('1');
    }
});

irc_client.addListener('error', function(message) {
    console.log('error: ', message);
});

irc_client.addListener('connect', function(){
    console.log('Connected!');
});

var debug = true;

if (debug)
{
    irc_client.connect(1,function() {
        irc_client.say(username,'!watch hvick225');
        irc_client.say(username,'!update');
        irc_client.say(username,'!update');
    });
}
else
    irc_client.connect();

