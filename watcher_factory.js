/**
 * Created by DELL on 1/3/2016.
 */

var watcher_player = require('./watcher_player');
var watcher = require('./watcher');

function watcher_factory(args)
{
    if (!args)
        return undefined;

    if (args[0] === 'b')
    {

    }
    else
        return new watcher_player(args.join(' '));
}

module.exports.watcher_factory = watcher_factory;