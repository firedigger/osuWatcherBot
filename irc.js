const irc = require('irc');

var answerer = require('./answerer');
var fs = require('fs');
var global_utils = require('./global_utils');

var config = JSON.parse(fs.readFileSync('config.json'));

//global_utils.parse_osu_date('2013-07-02 01:01:12');

//process.exit();

const username = 'firedigger';
const irc_password = config.irc_password;

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

irc_client.addListener('disconnect', function(){
    console.log('Disconnected!');
    irc_answerer.save();
    console.log('Seems like there\'s nothing more to do!');
    process.exit();
});

/*irc_client.addListener('selfMessage', function(to,text){
    console.log(message);
    if (text === 'Killing the bot')
        irc_answerer.process('','!kill Killer is dead');
});*/

process.on('exit', function (code) {
    console.log('Exiting');
    irc_answerer.save();
});

var debug = true;

if (debug)
{
    irc_client.connect(1,function() {
        irc_client.say(username,'!clear');
        irc_client.say(username,'!watch b 432839');
        irc_client.say(username,'!watch b 870031');
        irc_client.say(username,'!watch firedigger');
        irc_client.say(username,'!update');
        irc_client.say(username,'!list');
        irc_client.say(username,'!list_states');
        irc_client.say(username,'!clear_states');
        irc_client.say(username,'!update');
        setTimeout(function() {irc_client.say(username,'!kill Killer is dead');},5000);
    });
}
else {
    process.on('uncaughtException', function(err) {
        console.log('Caught exception: ' + err);
        process.exit(1);
    });
    irc_client.connect();
}

