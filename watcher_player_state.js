/**
 * Created by DELL on 1/3/2016.
 */


function watcher_player_state(rank, pp, date) {
    this.rank = rank;
    this.pp = pp;
    this.date = date;
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
        this.date = other.date;
    }
};

module.exports = watcher_player_state;