/**
 * Created by DELL on 1/3/2016.
 */


//abstract class
function watcher(){

}

watcher.prototype.update = function(callback){
    var self = this;
    this.get_state(function(state){
        //console.log('got state ' + state);
        if (state) {
            //console.log(self.toString() + ' got valid state');
            self.check_update(state, function (update_new) {
                    //console.log('checked state = ' + update_new);
                    if (update_new) {
                        self.generate_update_message(self.state, state, function (message) {
                            self.state = state;
                            callback(message);
                        });
                    }
                    else {
                        self.generate_empty_message(callback);
                    }
                }
            );
        }
        else
        {
            //console.log(self);
            callback('Error updating ' + self.toString());
        }
    });
};

watcher.prototype.clear_state = function ()
{
  this.state = undefined;
};

module.exports = watcher;