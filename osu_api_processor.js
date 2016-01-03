/**
 * Created by DELL on 1/3/2016.
 */

var osu_api = require('./osu_api');
var osu = new osu_api.Api('0f5737accd3afa91a03e620495d1e448ef02e4b5');
var player_state = require('./watcher_player_state');

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
            var state = new player_state();
            state.rank = info.rank;
            state.pp = info.pp;
            callback(state);
        }
    });
};

module.exports.last_pp = function(user, callback) {
    osu.getUserRecent(user, function(error,output) {
        if (handle_error(error))
        {
            var play = output[0];
            var beatmap_id = play.beatmap_id;
            var date = play.date;
            osu.getUserScore(beatmap_id, user, function(error, output)
            {
                if (handle_error(error))
                {
                    if (output && output.date === date)
                        callback('Your last play was worth ' + output.pp + 'pp.');
                    else
                        callback('Looks like your last play didn\'t grant you any pp');
                    /*else
                     osu.getUserRecent(user, function(error, output){
                     console.log(output);
                     });*/
                }
            });
        }

    });
};