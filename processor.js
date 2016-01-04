/**
 * Created by DELL on 1/2/2016.
 */

function processor(user, watchlist)
{
    this.user = user;
    this.watchlist = watchlist || new Map();
}

processor.prototype.watch = function(watcher_object) {
    //console.log(watcher_object);
    //console.log(this.watchlist);
    if (!this.watchlist.get(watcher_object.toString())) {
        this.watchlist.set(watcher_object.toString(), watcher_object);
        return true;
    }
    return false;
};

processor.prototype.unwatch = function(watcher_object) {
    if (!this.watchlist.get(watcher_object.toString())) {
    this.watchlist.delete(watcher_object.toString());
        return true;
    }
    return false;
};

processor.prototype.update = function(callback) {

    if (this.watchlist.size === 0)
        callback('Nothing to update :S');
    else
        for (var watcher of this.watchlist.values())
        {
            watcher.update(callback);
        }
};


module.exports = processor;


