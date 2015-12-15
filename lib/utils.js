'use strict';

var jade = require('jade');
var path = require('path');
var _ = require('lodash');

/**
 * Returns the email jade template as html
 * @param  {Token} token
 * @return {String} html
 */
exports.getHtmlEmail = function(token){
  var config = require('./connectorLock-local-auth').config;
  var authConfig = require('./connectorLock-local-auth').authConfig;
  if(_.isUndefined(config)){
    throw 'No config file defined, try running [connectorLock install config]';
  }

  var resetUrl;
  if (config.pluralizeEndpoints) {
    resetUrl = config.baseUrl + '/auths/reset?token='+token.token;
  }else {
    resetUrl = config.baseUrl + '/auth/reset?token='+token.token;
  }


  var viewVars = authConfig.passwordReset.template.vars;
  viewVars.url = resetUrl;

  var templatePath = path.normalize(__dirname+'../../../'+authConfig.passwordReset.template.file);
  var html = jade.renderFile(templatePath, viewVars);

  return html;
};

/**
 * Callback for mailing operation
 * @param  {Object} error
 * @param  {Object} response
 */
exports.mailCallback = function(error, response){
   if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + response.message);
    }
};
