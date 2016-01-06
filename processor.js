/**
 * Created by DELL on 1/2/2016.
 */

function processor(user, watchlist)
{
    this.user = user;
    this.watchlist = watchlist || new Map();
}

processor.prototype.watch = function(watcher_object) {
    if (!this.watchlist.get(watcher_object.key())) {
        this.watchlist.set(watcher_object.key(), watcher_object);
        return true;
    }
    return false;
};

processor.prototype.clear = function() {
    this.watchlist = new Map();
};

processor.prototype.clear_states = function() {
    for (var watcher of this.watchlist.values())
    {
        watcher.clear_state();
    }
};

processor.prototype.unwatch = function(watcher_object) {
    if (this.watchlist.get(watcher_object.key())) {
    this.watchlist.delete(watcher_object.key());
        return true;
    }
    return false;
};

processor.prototype.list = function (callback) {
    if (this.watchlist.size === 0)
        callback('Nothing to list :S');
    else
        for (var watcher of this.watchlist.values())
        {
            callback(watcher.toString());
        }
};

processor.prototype.list_states = function (callback) {
    if (this.watchlist.size === 0)
        callback('Nothing to list :S');
    else
        for (var watcher of this.watchlist.values())
        {
            callback(watcher.toString() + ': ' + (watcher.state ? watcher.state.toString() : ' unknown state'));
        }
};

processor.prototype.update = function(callback) {

    //console.log(this.watchlist.size);

    if (this.watchlist.size === 0)
        callback('Nothing to update :S');
    else
        for (var watcher of this.watchlist.values())
        {
            watcher.update(callback);
        }
};

module.exports = processor;


