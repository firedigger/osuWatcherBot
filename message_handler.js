/**
 * Created by DELL on 1/2/2016.
 */

var osu_api_processor = require('./osu_api_processor');
var watcher_factory = require('./watcher_factory');

var commands = {};

commands['pp'] = function(processor, args, callback){
    osu_api_processor.last_pp(processor.user,callback);
};
commands['watch'] = function(processor, args, callback)
{
    var watch_object = watcher_factory.watcher_factory(args);
    processor.watch(watch_object);
    callback('Watching ' + watch_object.toString());
};
commands['unwatch'] = function(processor, args, callback)
{
    var watch_object = watcher_factory.watcher_factory(args);
    processor.unwatch(watch_object);
    callback('Stopped watching ' + watch_object.toString());
};
commands['update'] = function(processor, args, callback)
{
    processor.update(callback);
};


function parse_message(processor, command, callback)
{
    if (commands[command.command])
    {
        commands[command.command].call(this, processor, command.args, callback);
    }
}

module.exports.handle_message = parse_message;