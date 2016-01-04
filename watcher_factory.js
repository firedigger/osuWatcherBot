/**
 * Created by DELL on 1/3/2016.
 */

var watcher_player = require('./watcher_player');
var watcher_map = require('./watcher_map');
var watcher = require('./watcher');

function watcher_factory(args)
{
    if (!args)
        return undefined;

    if (!Array.isArray(args))
        args = args.split(' ');

    //console.log(args);

    if (args[0] === 'b')
    {
        var beatmap_id = args[1];
        return new watcher_map(beatmap_id);
    }
    else
        return new watcher_player(args.join(' '));
}

function deserialize_watcher(watcher)
{
    //console.log(watcher);
    var new_watcher = watcher_factory(watcher[0]);
    new_watcher.construct(watcher[1]);
    //console.log(new_watcher);
    return new_watcher;
}


module.exports.watcher_factory = watcher_factory;
module.exports.deserialize_watcher = deserialize_watcher;