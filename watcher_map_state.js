/**
 * Created by DELL on 1/4/2016.
 */

var osu_api_processor = require('./osu_api_processor');
var global_utils = require('./global_utils');

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

/*function calc_map_hash(list)
{
    return list.map(function (el) {
        return el.score;
    }).reduce(function(pv, cv) { return pv + cv; }, 0);
}*/

function watcher_map_state(approved, top_score, date) {
    this.approved = approved;
    this.score = top_score;
    this.date = date;
}


function parse_from_list(list)
{
    var score = list[0];
    var approved = undefined;
    var date = global_utils.max(list.map(function(el){return global_utils.parse_osu_date(el.date);}));
    console.log(date);
    return {score: score, approved : approved, date : date};
}


watcher_map_state.prototype.construct = function (other) {

    if (other.list)
    {
        other = parse_from_list(other.list);
    }
    this.score = other.score;
    if (Array.isArray(other.date))
        this.date = global_utils.max(other.date);
    this.approved = other.approved;
};

/*watcher_map_state.prototype.equals = function (state) {

    if (state.hash != this.hash)
        return false;

    for(var i = 0; i < Math.min(this.list.length,state.list.length); ++i)
        if (this.list[i].score !== state.list[i].score || this.list[i].username !== state.list[i].username)
            return false;

    return true;
};*/

watcher_map_state.prototype.toString = function () {
    //console.log(this.date);
    if (this.approved > 0)
        return osu_api_processor.print_score(this.score);
    else
        return osu_api_processor.parse_approved(this.approved);
};


module.exports = watcher_map_state;