/**
 * Created by DELL on 1/3/2016.
 */


function watcher_player_state() {
    this.rank = 0;
    this.pp = 0;
}

watcher_player_state.prototype.equals = function (state) {
    return this.rank === state.rank && this.pp === state.pp;
};

module.exports = watcher_player_state;