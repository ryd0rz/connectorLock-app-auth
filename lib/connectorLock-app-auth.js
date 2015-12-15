'use strict';

var path = require('path');
var _ = require('lodash');

exports.authType = 'app';

/**
 * [installPath description]
 * @type {[type]}
 */
exports.installPath = path.normalize(__dirname+'/../../../');

/**
 * Conditionally export mail trasport data if
 * user has opted for password tokens i.e. password
 * resets
 */
var configPath = path.normalize(__dirname+'/../../../config/connectorLock.js');
var wlconfig = require(configPath).connectorLock;
var method = {};
if(_.isArray(wlconfig.authMethod)){
  method = _.findWhere(wlconfig.authMethod, {name: 'connectorLock-app-auth'});
}else{
  method = wlconfig.authMethod;
}

/**
 * the entire config
 */
exports.config = wlconfig;

/**
 * the config for this method
 */
exports.authConfig = method;

/**
 * [actions description]
 * @type {[type]}
 */
exports.actions = require('./controllers');

/**
 * [model description]
 * @type {[type]}
 */
exports.model = require('./models');