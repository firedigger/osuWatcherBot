/**
 * Created by DELL on 1/3/2016.
 */

var osu_api = require('./osu_api');
var osu = new osu_api.Api('0f5737accd3afa91a03e620495d1e448ef02e4b5');
var player_state = require('./watcher_player_state');
var map_state = require('./watcher_map_state');
var global_utils = require('./global_utils');

function handle_error(error, args)
{
    if (error)
    {
        console.log('error: '+ error + '\nAdditional info: ' + args.toString());
        return false;
    }
    return true;
}

module.exports.get_player_state = function(player, callback)
{
    osu.getUser(player,function(error,info){
        if (handle_error(error))
        {
            if (info) {
                var state = new player_state(info.pp_rank,info.pp_raw);
                callback(state);
            }
            else
                callback(undefined);
        }
    });
};

module.exports.get_map_state = function(beatmap_id, callback)
{
    osu.getScores(beatmap_id,function(error,output){
        if (handle_error(error))
        {
            //console.log(output);
            if (output)
            {
                var state = new map_state(output);
                callback(state);
            }
        }
    });
};


function parse_mods(num)
{
    var ar = ['NF','EZ','','HD','HR','SD','DT','','HT','NC','FL','','SO','','PF'];

    var str = (+num).toString(2);

    var res = [];
    //console.log(num);
    //console.log(str);
    for(var i = 0; i < str.length; ++i)
    {
        //console.log(str[str.length - i - 1]);
        if (str[str.length - i - 1] === '1')
            res.push(ar[i]);
    }
    //console.log(res);
    return res.join('');
};

module.exports.parse_mods = parse_mods;

    module.exports.get_beatmap_name = function(beatmap_id, callback)
{
    osu.getBeatmap(beatmap_id,function(error,output) {
        if (handle_error(error))
        {
            if (output)
            {
                callback(output.artist + ' ' + output.title + ' [' + output.version + ']');
            }
        }
    });
};

function calc_acc(count300, count100, count50, count_misses)
{
    //console.log(count300 + count100 + count50 + count_misses);
    var sc = (+count300) * 300 + (+count100) * 100 + (+count50) * 50;
    var full = ((+count300) + (+count100) + (+count50) + (+count_misses)) * 300;
    //console.log(sc + ' ' + full);
    return global_utils.round(sc / full,4) * 100;
}

module.exports.calc_acc = calc_acc;

module.exports.print_score = function(score)
{
    var mods = 'nomod';
    if (score.enabled_mods > 0)
        mods = '+' + parse_mods(score.enabled_mods);

    return score.username +' -> ' + ' Score: ' + score.score + ' |' + ' Rank: ' + score.rank + ' |' + ' Combo ' + score.maxcombo + 'x' + ' |' + ' Acc: '+ calc_acc(score.count300,score.count100,score.count50,score.countmiss) + '%' + ' |' + ' Achieved on ' + score.date + ' ' + mods;
};


module.exports.last_pp = function(user, callback) {
    osu.getUserRecent(user, function(error,output) {
        if (handle_error(error)) {
            if (output.length > 0) {
                var play = output[0];
                var beatmap_id = play.beatmap_id;
                var date = play.date;
                osu.getUserScore(beatmap_id, user, function (error, output) {
                    if (handle_error(error)) {
                        if (output && output.date === date)
                            callback('Your last play was worth ' + global_utils.round(output.pp,2) + 'pp.');
                        else
                            callback('Looks like your last play didn\'t grant you any pp.');
                        /*else
                         osu.getUserRecent(user, function(error, output){
                         console.log(output);
                         });*/
                    }
                });
            }
            else
                callback('No actual plays recently.');
        }
    });
};