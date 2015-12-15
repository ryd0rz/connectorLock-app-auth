/**
 * ResetToken
 *
 * @module      :: Model
 * @description :: Describes a users reset token\
 */

module.exports = {

  attributes: require('connectorLock').models.resetToken.attributes({
    
    /* e.g.
    nickname: 'string'
    */
    
  }),

  beforeCreate: require('connectorLock').models.resetToken.beforeCreate,
  afterCreate: require('connectorLock').models.resetToken.afterCreate
};
