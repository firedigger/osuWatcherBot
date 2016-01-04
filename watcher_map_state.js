/**
 * Created by DELL on 1/4/2016.
 */

var osu_api_processor = require('./osu_api_processor');

/*function string_hash(str)
{
    var hash = 0, i, chr, len;
    if (str.length === 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}*/

function calc_map_hash(list)
{
    return list.map(function (el) {
        return el.score;
    }).reduce(function(pv, cv) { return pv + cv; }, 0);
}

function watcher_map_state(list) {
    this.list = list;
    this.hash = list ? calc_map_hash(list) : 0;
}

watcher_map_state.prototype.construct = function (other) {
    this.list = other.list;
    this.hash = other.hash;
};

watcher_map_state.prototype.equals = function (state) {

    if (state.hash != this.hash)
        return false;

    for(var i = 0; i < Math.min(this.list.length,state.list.length); ++i)
        if (this.list[i].score !== state.list[i].score || this.list[i].username !== state.list[i].username)
            return false;

    return true;
};

watcher_map_state.prototype.toString = function () {
   return osu_api_processor.print_score(this.list[0]);
};


module.exports = watcher_map_state;