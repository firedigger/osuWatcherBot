/**
 * Created by DELL on 1/2/2016.
 */

var osu_api_processor = require('./osu_api_processor');
var watcher_factory = require('./watcher_factory');
var only_once_callback = require('./only_once_callback');

var commands = {};

commands['pp'] = function(processor, args, callback){
    osu_api_processor.last_pp(processor.user,callback);
};
commands['score'] = function(processor, args, callback){
    if (args[0] && args[1])
        osu_api_processor.get_score(args[0],args[1],callback);
    else
        callback('Invalid arguments');
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
        if (processor.unwatch(watch_object))
            callback('Stopped watching ' + watch_object.toString());
        else
            callback('You didn\'t watch ' + watch_object.toString() + ' to begin with');
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
    callback(['Welcome to firedigger\'s osuWatcherBot!', 'This tool is intended to allow you to keep track of several players\' performance and map scores with a single command', 'First, do several \'!watch player_name\', then do \!update when you want to check if anyone has done anything','If you still feel lost, try !example .'].join('\n'));
    commands['commands'].apply(this,arguments);
};
commands['commands'] = function(processor, args, callback)
{
    callback(['Commands:','\!help - print help','\!commands - print commands list','!example - print an example of bot usage','\!watch \<player name>','\!watch b \<beatmap_id>','\!unwatch \<identifier>','\!update - get the feed','\!list - list all the current watchers','\!list_states - list all the current watchers with states','\!clear - clear all the watches','\!clear_states - clear all the watchers states (NOTE: this does not clear watchers, only makes the states undefined)','\!pp - print the pp for you last play if applicable','\!score player beatmap_id - get player\'s score on a beatmap'].join('\n'));
};
commands['example'] = function(processor, args, callback)
{
    callback(['If you are not sure what exactly to write, try this command sequence:','\!watch Cookiezi','\!watch hvick225','\!watch b 529080','\!update'].join('\n'));
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
commands['clear'] = function(processor, args, callback)
{
    processor.clear();
    callback('Cleared!');
};
commands['clear_states'] = function(processor, args, callback)
{
    processor.clear_states();
    callback('Cleared states!');
};
commands['list'] = function(processor, args, callback)
{
    processor.list(callback);
};
commands['list_states'] = function(processor, args, callback)
{
    processor.list_states(callback);
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
    else
        callback('Invalid command. Try !help if you are lost.');
}

module.exports.handle_message = parse_message;