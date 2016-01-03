/**
 * Created by DELL on 1/3/2016.
 */


//abstract class
function watcher(){

}

watcher.prototype.update = function(callback){
    var self = this;
    this.get_state(function(state){
        //console.log('got state' + state.toString());
        self.check_update(state,function(update_new)
            {
                //console.log('checked state = ' + update_new);
                if (update_new)
                {
                    self.generate_update_message(self.state,state, function(message){
                        self.state = state;
                        callback(message);
                    });
                }
                else
                {
                    self.generate_empty_message(callback);
                }
            }
        );
    });
};


module.exports = watcher;