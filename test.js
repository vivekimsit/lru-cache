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
    var cache = new LRUCache(10);
    cache.set('foo', 'bar');
    cache.del('foo');
    should.not.exist(cache.get('foo'));
  });

  it('reset', function() {
    var cache = new LRUCache(2);
    cache.set('foo', 'bar');
    cache.set('key', 'value');
    cache.reset();
    cache.size.should.equal(0);
    cache.capacity.should.equal(2);
    should.not.exist(cache.get('foo'));
    should.not.exist(cache.get('key'));
  });

  it('has', function() {
    var cache = new LRUCache(1);
    cache.set('foo', 'bar');
    cache.has('foo').should.be.true;
    cache.set('key', 'value');
    cache.has('foo').should.be.false;
    cache.has('key').should.be.true;
  });

  it('keys', function() {
    var cache = new LRUCache(2);
    cache.set('foo', 'bar');
    cache.set('key', 'value');
    cache.keys().should.deep.equal(['foo', 'key']);
/*    cache.del('key');
    cache.keys().should.equal(['foo']);*/
  });

  it('values', function() {
    var cache = new LRUCache(2);
    cache.set('foo', 'bar');
    cache.set('key', 'value');
    cache.values().should.deep.equal(['bar', 'value']);
    /* cache.del('key');
    cache.values().should.equal(['bar']);*/
  });
});
