/**
 * Created by DELL on 1/3/2016.
 */

var watcher_player = require('./watcher_player');
var watcher = require('./watcher');

function watcher_factory(args)
{
    if (args.length === 1)
        return new watcher_player(args[0]);
}

module.exports.watcher_factory = watcher_factory;