/**
 * Created by DELL on 1/4/2016.
 */

var watcher = require('./watcher');
var watcher_map_state = require('./watcher_map_state');
var osu_api_processor = require('./osu_api_processor');
var util = require('util');
var global_utils = require('./global_utils');

function watcher_map(beatmap_id) {
    watcher_map.super_.apply(this,arguments);
    this.beatmap_id = beatmap_id;
    this.beatmap_name = undefined;
    this.state = undefined;
}

watcher_map.prototype.update = function(callback){
    var self = this;
    this.get_state(function(state){
        if (state) {
            //console.log(self.beatmap_id);
            self.check_update(state, function (update_new) {
                    if (update_new || self.state.date == null) {
                        var old_state = self.state;
                        self.state = new watcher_map_state(state.approved,state.list ? state.list[0] : undefined,(new Date()).getTime());
                        self.generate_update_message(old_state, state, state.list, function (message) {
                            callback(message);
                        });
                    }
                    else {
                        self.generate_empty_message(callback);
                    }
                }
            );
        }
        else
        {
            //console.log(self);
            callback('Error updating ' + self.toString());
        }
    });
};


watcher_map.prototype.construct = function(other){
    this.beatmap_id = other.beatmap_id;
    this.beatmap_name = other.beatmap_name;
    this.state = new watcher_map_state();
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
        if (!self.state || self.state.approved !== new_state.approved)
            callback(true);
        else
        {
            if (new_state.approved > 0)
            {
                var l = osu_api_processor.find_new_plays(new_state,self.state.date);
                callback(l.length > 0);
            }
            else
                callback(false);
        }
    };

    if (!self.beatmap_name)
    {
        osu_api_processor.get_beatmap_name(self.beatmap_id,function(name){
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

watcher_map.prototype.generate_update_message = function(old_state, new_state, score_list, callback) {

    var self = this;

    if (!old_state)
        callback(self.toString() + ': ' + self.state.toString());
    else
    if (new_state.approved > 0)
    {
        if (!old_state.date)
            old_state.date = (new Date()).getTime();
        var new_list = osu_api_processor.find_new_plays(score_list, old_state.date);

        for(var i = 0; i < new_list.length; ++i)
            callback('New #' + new_list[i].pos + ' score on ' + self.toString() + ': ' + osu_api_processor.print_score(new_list[i]));
    }
    else
    {
        callback(self.toString() + ' is now ' + osu_api_processor.parse_approved(new_state.approved));
    }
};

watcher_map.prototype.generate_empty_message = function(callback) {
    callback(this.toString() + ' state didn\'t change.');
};

util.inherits(watcher_map,watcher);

module.exports = watcher_map;