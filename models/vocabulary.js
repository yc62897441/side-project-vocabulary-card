'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vocabulary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vocabulary.belongsToMany(models.Table, {
        through: models.Table_vocabulary,
        foreignerKey: 'vocabularyId',
        as: 'tables'
      })
    }
  }
  Vocabulary.init({
    eg_name: DataTypes.STRING,
    ch_name: DataTypes.STRING,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vocabulary',
  });
  return Vocabulary;
};