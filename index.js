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
    var entry = this.get(key);
    if (entry) {
      // cache hit
      return;
    }
    entry = new Entry(key, value);
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
    // make this entry the latest item in the cache now
    if (this.tail === entry) {
      return entry.value;
    }
    if (entry.next) {
      if (entry === this.head) {
        this.head = entry.next;
      }
      entry.next.prev = entry.prev;
    }
    if (entry.prev) {
      entry.prev.next = entry.next;
    }
    entry.next = undefined;
    entry.prev = this.tail;
    if (this.tail) {
      this.tail.next = entry;
    }
    this.tail = entry;
    return entry.value;
  };


  Prototype.reset = function() {
    this.head = this.tail = null;
    this.size = 0;
    this._keyMap = {};
  };


  Prototype.keys = function() {
    return Object.keys(this._keyMap);
  };


  Prototype.has = function(key) {
    return this._keyMap[key] ? true : false;
  };


  Prototype.values = function() {
    var values = [],
        entry  = this.head;
    while (entry) {
      values.push(entry.value);
      entry = entry.next;
    }
    return values;
  };


  Prototype.purge = function() {
    var entry = this.head;
    if (entry) {
      if (this.head.next) {
        this.head = this.head.next;
        this.head.prev = undefined;
      } else {
        this.head = undefined;
      }

      entry.next = entry.prev = undefined;
      delete this._keyMap[entry.key];
    }
    return entry;
  };


  function Entry(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  };

}());
