var proxyquire =  require('proxyquire')
  , should = require('should')
  , path = require('path')
  , connectorLockPath = path.normalize(__dirname+'/connectorLock.js')

var pathStub = {
  normalize: function(str){
    return connectorLockPath;
  }
}

exports.connectorLock_local = proxyquire.noCallThru().load('../lib/connectorLock-local-auth', 
  { 
    'path': pathStub
  });

exports.proxyquire = proxyquire;
exports.should = should;