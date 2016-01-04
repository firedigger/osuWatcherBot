/**
 * Created by DELL on 1/3/2016.
 */


function watcher_player_state(rank, pp) {
    this.rank = rank;
    this.pp = pp;
}

watcher_player_state.prototype.equals = function (state) {
    return this.rank === state.rank && this.pp === state.pp;
};

watcher_player_state.prototype.toString = function () {
    return 'Rank = ' + this.rank + ', PP = ' + this.pp;
};

watcher_player_state.prototype.construct = function (other) {
    if (other) {
        this.rank = other.rank;
        this.pp = other.pp;
    }
};

module.exports = watcher_player_state;