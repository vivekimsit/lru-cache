var should = require('chai').should(),
    LRUCache = require('./index');


describe('LRUCache', function() {
  it('set, get', function() {
    var cache = new LRUCache(10);
    cache.set('foo', 'bar');
    cache.get('foo').should.equal('bar');
    cache.size.should.equal(1);
    cache.capacity.should.equal(10);
  });

  xit('del', function() {
    var cache = new LRUCache({max: 10});
    cache.set('foo', 'bar');
    cache.del('foo');
    should.not.exist(cache.get('foo'));
  });

  xit('reset', function() {
    var cache = new LRUCache({max: 10});
    cache.set('foo', 'bar');
    cache.set('key', 'value');
    cache.reset();
    cache.length.should.equal(0);
    cache.max.should.equal(10);
    should.not.exist(cache.get('foo'));
    should.not.exist(cache.get('key'));
  });

  xit('has', function() {
    var cache = new LRUCache({max: 1});
    cache.set('foo', 'bar');
    cache.has('foo').should.equal(true);
    cache.set('key', 'value');
    cache.has('foo').should.equal(false);
    cache.has('key').should.equal(true);
  });

  xit('keys', function() {
    var cache = new LRUCache({max: 2});
    cache.set('foo', 'bar');
    cache.set('key', 'value');
    cache.keys().should.equal(['foo', 'key']);
    cache.del('key');
    cache.keys().should.equal(['foo']);
  });

  xit('values', function() {
    var cache = new LRUCache({max: 2});
    cache.set('foo', 'bar');
    cache.set('key', 'value');
    cache.values().should.equal(['bar', 'value']);
    cache.del('key');
    cache.values().should.equal(['bar']);
  });
});
