/**
 * Created by DELL on 1/2/2016.
 */
const message_handler = require('./message_handler');
var command = require('./command');
var processor = require('./processor');

function answerer(irc_client)
{
    this.irc_client = irc_client;
    this.user_processors = {};
}


answerer.prototype.send_message = function(to, message)
{
    console.log('ME => ' + to + ': ' + message);
    this.irc_client.say(to, message);
};


answerer.prototype.send_answer = function(to, message)
{
    if (!message)
        return;

    if (Array.isArray(message))
        for(var i = 0; i < message.length; ++i)
            this.send_message(to,message[i]);

    this.send_message(to,message);
};

answerer.prototype.process = function(from, message) {
    //console.log('1');
    var self = this;

    if (!this.user_processors[from])
    {
        this.user_processors[from] = new processor(from);
        this.send_message(from,'Hi, ' + from + '! Looks like it\'s your first time using my bot.');
    }

    message_handler.handle_message(this.user_processors[from], new command(message.slice(1)), function(answer){
            self.send_answer(from,answer);
    });
};

module.exports = answerer;