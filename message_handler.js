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
    if (check_watcher(watch_object)) {
        if (processor.watch(watch_object))
            callback('Watching ' + watch_object.toString());
        else
            callback('You are already watching ' + watch_object.toString());
    }
    else
        callback('Error parsing watcher object');
};
commands['unwatch'] = function(processor, args, callback)
{
    var watch_object = watcher_factory.watcher_factory(args);
    if (check_watcher(watch_object))
    {
        processor.unwatch(watch_object);
        callback('Stopped watching ' + watch_object.toString());
    }
    else
        callback('Error parsing watcher object');
};
commands['update'] = function(processor, args, callback)
{
    processor.update(callback);
};
commands['help'] = function(processor, args, callback)
{
    callback(['Welcome to firedigger\'s osuWatcherBot!', 'This tool is intended to allow you to keep track of several players\' performance with a single command', 'First, do several \'!watch player_name\', then do \!update when you want to check if anyone has done anything','Commands:','\!watch \<player name>','\!unwatch \<player name>','\!update - get the feed','\!pp - print the pp for you last play if applicable']);
};
commands['kill'] = function(processor, args, callback)
{
    if (args.join(' ') === 'Killer is dead') {
        callback('Shutting down, master!',5);
    }
    else
        callback('Kill yourself!');
};
commands['save'] = function(processor, args, callback)
{
    if (args.join(' ') === 'data') {
        callback('Saved data, master!',13);
    }
    else
        callback('Save yourself!');
};

function check_watcher(watcher) {
    return !!watcher;
}

function parse_message(processor, command, callback)
{
    if (commands[command.command])
    {
        commands[command.command].call(this, processor, command.args, callback);
    }
}

module.exports.handle_message = parse_message;