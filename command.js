/**
 * Created by DELL on 1/3/2016.
 */

function command(message)
{
    var components = message.split(' ');
    this.command = components[0];
    this.args = components.slice(1);
}

module.exports = command;