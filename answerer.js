/**
 * Created by DELL on 1/2/2016.
 */
const message_handler = require('./message_handler');
var command = require('./command');
var processor = require('./processor');
var watcher_factory = require('./watcher_factory');
var serialize = require('node-serialize');
var fs = require('fs');

function answerer(irc_client, user_processors)
{
    this.irc_client = irc_client;
    this.user_processors = user_processors || {};
    //console.log(this.user_processors);
}

function mapToJson(map) {
    return JSON.stringify([...map]);
}

answerer.prototype.save = function(){
    console.log('Saving');
    fs.writeFileSync('data',this.serialize_processors());
};

answerer.prototype.serialize_processors = function ()
{
    var out = {};
    var obj = this.user_processors;
    //console.log(obj);
    for (var user in obj) {
        if (obj.hasOwnProperty(user)) {
            out[user] = {};
            out[user]['user'] = user;
            out[user]['watchlist'] = mapToJson(obj[user].watchlist);
        }
    }
    var res = serialize.serialize(out);
    //console.log(res);
    //answerer.deserialize_processors(res);
    return res;
};

answerer.deserialize_processors = function (str)
{
    var obj = JSON.parse(str);
    //console.log(obj);
    var out = {};
    for (var user in obj) {
        if (obj.hasOwnProperty(user)) {
            //console.log(out[user]['watchlist']);
            var watchlist = new Map();
            var arr_watchlist = JSON.parse(obj[user]['watchlist']);
            //console.log(arr_watchlist);
            for(var i = 0; i < arr_watchlist.length; ++i) {
                //console.log('1');
                var watcher = watcher_factory.deserialize_watcher(arr_watchlist[i]);
                if (watcher)
                    watchlist.set(watcher.key(), watcher);
                //console.log(watchlist);
            }
            //console.log(watchlist);
            out[user] = new processor(user,watchlist);
            //console.log(out[user]['watchlist']);
        }
    }
    //console.log(out);
    return out;
};

answerer.prototype.send_message = function(to, message)
{
    console.log('ME => ' + to + ': ' + message);
    this.irc_client.say(to, message);
};


answerer.prototype.send_answer = function(to, message)
{
    if (!message)
        return;

    if (message.length === 0)
        return;

    if (Array.isArray(message)) {
        var ms = '';
        for (var i = 0; i < message.length; ++i)
            ms += message[i] + '\n';
        this.send_message(to, ms);
    }
    else
        this.send_message(to,message);
};


answerer.prototype.process = function(from, message) {
    var self = this;

    if (!this.user_processors[from])
    {
        this.user_processors[from] = new processor(from);
        //this.send_answer(from,['Hi, ' + from + '! Looks like it\'s your first time using my bot. Thanks for trying it out! Now the bot will create a new processor instance to keep Your personal feed.','I recommend to start by typing !help to see a quick hint.']);
    }

    message_handler.handle_message(this.user_processors[from], new command(message.slice(1)), function(answer, code){
        self.send_answer(from,answer);
        if (code)
        {
                if (code === 13)
                {
                    self.save();
                }
                if (code === 5)
                {
                    process.exit();
                }
        }
    });
};

module.exports = answerer;