/**
 * Created by DELL on 1/4/2016.
 */

var watcher = require('./watcher');
var watcher_map_state = require('./watcher_map_state');
var osu_api_processor = require('./osu_api_processor');
var util = require('util');

function watcher_map(beatmap_id) {
    watcher_map.super_.apply(this,arguments);
    this.beatmap_id = beatmap_id;
    this.beatmap_name = undefined;
    this.state = undefined;
}

watcher_map.prototype.construct = function(other){
    this.beatmap_id = other.beatmap_id;
    this.beatmap_name = other.beatmap_name;
    this.state = new watcher_map_state();
    //console.log(other);
    this.state.construct(other.state);
};

watcher_map.prototype.get_state = function(callback)
{
    osu_api_processor.get_map_state(this.beatmap_id,callback);
};

watcher_map.prototype.check_update = function(new_state,callback)
{
    var self = this;

    var a = function() {
        if (!self.state)
            callback(true);
        else {
            callback(!(new_state.equals(self.state)));
        }
    };

    if (!self.beatmap_name)
    {
        osu_api_processor.get_beatmap_name(this.beatmap_id,function(name){
            //console.log('got beatmap name ' + name);
            self.beatmap_name = name;
            a();
        });
    }
    else
        a();
};

watcher_map.prototype.toString = function(){
    return this.beatmap_name || ('Map ' + this.beatmap_id);
};

watcher_map.prototype.key = function(){
    return 'b ' + this.beatmap_id;
};

watcher_map.prototype.generate_update_message = function(old_state, new_state, callback) {

    var self = this;

    if (!old_state)
        callback(self.toString() + ': ' + new_state.toString());
    else {
        var old_list = old_state.list.map(function (el) {
            return el.username;
        });

        var new_list = new_state.list.map(function (el) {
            return el.username;
        });

        var i;
        for (i = 0; i < Math.min(old_list.length, new_list.length); ++i)
            if (old_list[i].score !== new_list[i].score || old_list[i].username !== new_list[i].username)
                break;

        //console.log(new_state);
        i--;
        callback('New #' + i + ' score: ' + osu_api_processor.print_score(new_state.list[i]));

    }
};

watcher_map.prototype.generate_empty_message = function(callback) {
    callback(this.toString() + ' state didn\'t change.');
};

util.inherits(watcher_map,watcher);

module.exports = watcher_map;