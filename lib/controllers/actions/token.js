'use strict';
var crypto = require('crypto');

var ALGORITHM = 'AES-256-CBC'; // CBC because CTR isn't possible with the current version of the Node.JS crypto library
var HMAC_ALGORITHM = 'SHA256';
var KEY = crypto.randomBytes(32); // This key should be stored in an environment variable
var HMAC_KEY = crypto.randomBytes(32); // This key should be stored in an environment variable

/**
 * Login action
 */
module.exports = function(req, res){

  var params = req.params.all();

  if(typeof params['appId'] === 'undefined' || typeof params['reqTimestamp'] === 'undefined' || typeof params['appSecret'] === 'undefined'){
    connectorLock.cycle.loginFailure(req, res, null, {error: 'Invalid '+scope.type+' or password'});
  }else{
    var pass = params.password;
    scope.getUserAuthObject(params, req, function(err, user){
      if (err) {
        if (err.code === 'E_VALIDATION') {
          return res.status(400).json(err);
        } else {
          return res.serverError(err);
        }
      }
      if (user) {
        if(bcrypt.compareSync(pass, user.auth.password)){
          connectorLock.cycle.loginSuccess(req, res, user);
        }else{
          connectorLock.cycle.loginFailure(req, res, user, {error: 'Invalid '+scope.type+' or password'});
        }
      } else {
        //TODO redirect to register
        connectorLock.cycle.loginFailure(req, res, null, {error: 'user not found'});
      }
    });
  }
};
