/**
 * Created by DELL on 1/3/2016.
 */

var watcher = require('./watcher');
var watcher_player_state = require('./watcher_player_state');
var osu_api_processor = require('./osu_api_processor');
var util = require('util');

function watcher_player(player) {
    watcher_player.super_.apply(this,arguments);
    this.player = player;
    this.state = undefined;
}

watcher_player.prototype.get_state = function(callback)
{
    osu_api_processor.get_player_state(this.player,callback);
};

watcher_player.prototype.check_update = function(new_state,callback)
{
    if (!this.state)
        callback(true);
    else
        callback(!(new_state.equals(this.state)));
};

watcher_player.prototype.toString = function(){
    return this.player;
};

watcher_player.prototype.generate_update_message = function(old_state, new_state, callback) {
    callback('state changed!');
};

watcher_player.prototype.generate_empty_message = function(callback) {
    callback('state didn\'t change.');
};

util.inherits(watcher_player,watcher);

module.exports = watcher_player;