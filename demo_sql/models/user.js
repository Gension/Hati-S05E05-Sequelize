const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const User = sequelize.define('User', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user',
    tableName: 'users',
    createdAt: false,
    updatedAt: false,
});

module.exports = User;