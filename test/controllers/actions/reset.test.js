var testHelper = require('../../test_helper');
var should = testHelper.should;
var connectorLock = testHelper.connectorLock_local;

var reset = connectorLock.actions.extras.reset;

describe('email reset action', function(){
  it('should exist', function(done){
    reset.should.be.Function;
    done();
  });

  it('should respond with 404', function(done){
    var req = {method: 'PUT'};
    var res = {json: function(code){
      code.should.equal(404);
      done();
    }};
    reset(req, res);
  });
});