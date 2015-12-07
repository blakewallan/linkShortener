'use strict';
module.exports = function(sequelize, DataTypes) {
  var link = sequelize.define('link', {
    original: DataTypes.STRING,
    new: DataTypes.STRING,
    clicks: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return link;
};