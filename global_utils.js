/**
 * Created by DELL on 1/5/2016.
 */
function round(float,digit)
{
    var ten = Math.pow(10,digit);
    return (Math.trunc(float * ten) / ten).toFixed(digit);
}

module.exports.round = round;