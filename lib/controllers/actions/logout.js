'use strict';

/**
 * Logout action
 */
module.exports = function (req, res){
  connectorLock.cycle.logout(req, res);
};