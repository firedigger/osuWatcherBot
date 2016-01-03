/**
 * Created by DELL on 1/2/2016.
 */
const message_handler = require('./message_handler');

function answerer(irc_client)
{
    this.irc_client = irc_client;
    this.user_base = {};
}


function send_message(irc_client, from, message)
{
    console.log('ME => ' + from + ': ' + answer);
    irc_client.say(from, message);
}


answerer.prototype.process = function(from, message) {
    //console.log('1');
    var self = this;

    if (!this.user_base[from])
    {
        this.user_base[from] = true;
        send_message(self.irc_client,from,'Hi, ' + from + '! Looks like it\'s your first time using my bot.');
    }

    message_handler.handle_message(from, message.slice(1), function(answer){
        if (answer) {
            send_message(self.irc_client,from,answer);
        }
    });
};

module.exports = answerer;