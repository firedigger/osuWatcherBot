/**
 * Created by DELL on 1/2/2016.
 */


function processor(user)
{
    this.user = user;
    this.watchlist = new Set();
}

processor.prototype.watch = function(watcher_object) {
    this.watchlist.add(watcher_object);
};

processor.prototype.unwatch = function(watcher_object) {
    this.watchlist.delete(watcher_object);
};

processor.prototype.update = function(callback) {
    for (var watcher of this.watchlist)
    {
        watcher.update(callback);
    }
};


module.exports = processor;


