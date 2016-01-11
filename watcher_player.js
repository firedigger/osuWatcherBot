/**
 * Created by DELL on 1/3/2016.
 */

var watcher = require('./watcher');
var watcher_player_state = require('./watcher_player_state');
var osu_api_processor = require('./osu_api_processor');
var util = require('util');
var global_utils = require('./global_utils');

function watcher_player(player) {
    watcher_player.super_.apply(this,arguments);
    this.player = player;
    this.state = undefined;
}

watcher_player.prototype.check_update = function(new_state,callback)
{
    if (!this.state)
        callback(true);
    else {
        callback(!(new_state.equals(this.state)));
    }
};


watcher_player.prototype.construct = function(other){
    this.player = other.player;
    this.state = new watcher_player_state();
    this.state.construct(other.state);
};


watcher_player.prototype.get_state = function(callback)
{
    osu_api_processor.get_player_state(this.player,callback);
};

watcher_player.prototype.toString = function(){
    return this.player;
};

watcher_player.prototype.key = function(){
    return this.player;
};


watcher_player.prototype.update = function(callback){
    var self = this;
    this.get_state(function(state){
        //console.log('got state ' + state);
        if (state) {
            //console.log(self.toString() + ' got valid state');
            self.check_update(state, function (update_new) {
                    //console.log('checked state = ' + update_new);
                    if (update_new) {
                        self.generate_update_message(self.state, state, function (message) {
                            self.state = state;
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


watcher_player.prototype.generate_update_message = function(old_state, new_state, callback) {

    var self = this;

    if (old_state && !isNaN(old_state.pp)) {
        var delta_pp = global_utils.round(new_state.pp - old_state.pp,2);

        var delta_rank = new_state.rank - old_state.rank;
        callback(this.toString() + ' has gained ' + delta_pp + ' pp and ' + (delta_rank <= 0 ? 'gained' : 'lost') + ' ' + Math.abs(delta_rank) + ' ranks!');
        osu_api_processor.get_user_top_list(this.player,function(list){
            var top_plays = osu_api_processor.find_new_plays(list,old_state.date);
            top_plays.forEach(function(el){
                osu_api_processor.get_beatmap_name(el.beatmap_id,function(name){
                    el.beatmap_name = name;
                    callback(self.toString() + ': New #' + el.pos + ' top play: ' + osu_api_processor.print_play_score(el));
                });
            });
        });
    }
    else
    {
        callback(this.toString() + ' has ' + new_state.pp + ' pp and ' + new_state.rank + ' rank.');
    }
};

watcher_player.prototype.generate_empty_message = function(callback) {
    callback(this.toString() + '\'s state didn\'t change.');
};

util.inherits(watcher_player,watcher);

module.exports = watcher_player;