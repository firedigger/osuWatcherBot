/**
 * Created by DELL on 1/3/2016.
 */


//abstract class
function watcher(){

}


watcher.prototype.clear_state = function ()
{
  this.state = undefined;
};

module.exports = watcher;