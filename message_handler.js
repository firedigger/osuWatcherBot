/**
 * Created by DELL on 1/2/2016.
 */

var processor = require('./processor');

var commands = {};

commands['pp'] = function(from, callback){
    processor.last_pp(from,callback);
};

function parse_message(from, message, callback)
{
    if (commands[message])
    {
        commands[message].call(this, from, callback);
    }
}

module.exports.handle_message = parse_message;