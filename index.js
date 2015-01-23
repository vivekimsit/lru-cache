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
    this.tail = undefined;
    this.head = undefined;
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
    this.head = this.tail = undefined;
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
        entry = this.head;
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


  Prototype.del = function(key) {
    var entry = this._keyMap[key];
    if (!entry) {
      return;
    }
    delete this._keyMap[key];

    if (entry.next && entry.prev) {
      // middle entry
      entry.prev.next = entry.next;
      entry.next.prev = entry.prev;
    } else if (entry.next) {
      // remove the hard link with the next entry
      entry.next.prev = undefined;
      this.head = entry.next;
    } else if (entry.prev) {
      entry.prev.next = undefined;
      this.tail = entry.prev;
    } else {
      // its the only entry
      this.head = this.tail = undefined;
    }

    // remove any hard links from the current entry
    entry.next = entry.prev = undefined;

    this.size--;
    return entry.value;
  };


  function Entry(key, value) {
    this.key = key;
    this.value = value;
    this.prev = undefined;
    this.next = undefined;
  };

}());
