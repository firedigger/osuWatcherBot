/**
 * Created by DELL on 1/5/2016.
 */

var moment = require('moment');


function round(float,digit)
{
    var ten = Math.pow(10,digit);
    return (Math.trunc(float * ten) / ten).toFixed(digit);
}

function max(list)
{
    return Math.max.apply(null, list.map(function(el){return (+el);}));
}

function parse_osu_date(string)
{
    //2013-07-02 01:01:12
    var res = moment(string,'YYYY-MM-DD HH:mm:ss').valueOf();
    console.log(res);
    return res;
    //return null;
}



module.exports.round = round;
module.exports.parse_osu_date = parse_osu_date;
module.exports.max = max;