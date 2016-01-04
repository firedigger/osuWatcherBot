/**
 * Created by DELL on 1/4/2016.
 */

var watcher = require('./watcher');
//var watcher_player_state = require('./watcher_player_state');
var osu_api_processor = require('./osu_api_processor');
var util = require('util');

function watcher_map(beatmap_id) {
    watcher_player.super_.apply(this,arguments);
    this.beatmap_id = beatmap_id;
    this.beatmap_name = osu_api_processor.get_beatmap_name(beatmap_id);
    this.state = undefined;
}

watcher_map.prototype.get_state = function(callback)
{
    osu_api_processor.get_map_state(this.beatmap_id,callback);
};


watcher_map.prototype.toString = function(){
    return this.beatmap_name;
};

watcher_map.prototype.generate_update_message = function(old_state, new_state, callback) {

};

watcher_map.prototype.generate_empty_message = function(callback) {
    callback(this.beatmap_name + ' state didn\'t change.');
};

util.inherits(watcher_map,watcher);

module.exports = watcher_map;