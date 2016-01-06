/**
 * Created by DELL on 1/7/2016.
 */

function only_once_callback(callback)
{
    this.launched = false;
    this.callback = callback;
}

only_once_callback.prototype.call = function(){
    console.log('only_once_callback');
    if (!this.launched) {
        this.launched = true;
        callback.apply(this,arguments);
    }
};

module.exports = only_once_callback;