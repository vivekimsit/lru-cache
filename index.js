;(function() {
  // nodejs platform
  if (typeof module === 'object' && module.exports) {
    module.exports = LRUCache;
  } else {
  // non-nodejs platforms
    this.LRUCache = LRUCache;
  }

  function LRUCache(maxLimit, opts) {
    this.size = 0;
    this.capacity = maxLimit;
    this.tail = null;
    this.head = null;
    this._keyMap = {};
  }
  var Prototype = LRUCache.prototype;

  Prototype.set = function(key, value) {
    var entry = new Entry(key, value);
    this._keyMap[key] = entry;
    if (this.tail) {
      this.tail.next = entry;
      entry.prev = this.tail;
    } else {
      // empty list
      this.head = entry;
    }
    this.tail = entry; // update the tail

    if (this.capacity === this.size) {
      this.purge();
    } else {
      this.size++;
    }
  };


  Prototype.get = function(key) {
    var entry = this._keyMap[key];
    if (entry === undefined) {
      return;
    }
    return entry.value;
  };


  function Entry(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  };

}());
