var should = require('chai').should(),
    LRU = require('./index');


describe('LRU', function() {
  it('set, get', function() {
    var cache = new LRU({max: 10});
    cache.set('foo', 'bar');
    cache.get('foo').should.equal('bar');
    should.not.exist(cache.get('key'));
    cache.length.should.equal(1);
    cache.max.should.equal(10);
  });

  it('del', function() {
    var cache = new LRU({max: 10});
    cache.set('foo', 'bar');
    cache.del('foo');
    should.not.exist(cache.get('foo'));
  });

  it('reset', function() {
    var cache = new LRU({max: 10});
    cache.set('foo', 'bar');
    cache.set('key', 'value');
    cache.reset();
    cache.length.should.equal(0);
    cache.max.should.equal(10);
    should.not.exist(cache.get('foo'));
    should.not.exist(cache.get('key'));
  });

  it('has', function() {
    var cache = new LRU({max: 1});
    cache.set('foo', 'bar');
    cache.has('foo').should.equal(true);
    cache.set('key', 'value');
    cache.has('foo').should.equal(false);
    cache.has('key').should.equal(true);
  });

  it('keys', function() {
    var cache = new LRU({max: 2});
    cache.set('foo', 'bar');
    cache.set('key', 'value');
    cache.keys().should.equal(['foo', 'key']);
    cache.del('key');
    cache.keys().should.equal(['foo']);
  });

  it('values', function() {
    var cache = new LRU({max: 2});
    cache.set('foo', 'bar');
    cache.set('key', 'value');
    cache.values().should.equal(['bar', 'value']);
    cache.del('key');
    cache.values().should.equal(['bar']);
  });
});
