const Sequelize = require('sequelize');

const db = require('../config/db');

const Users = db.define('users',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull:false, 
        unique:true       
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },    
    fullname: {
        type: Sequelize.STRING
    },
    birthdate: {
        type: Sequelize.DATE
    },
    image: {
        type: Sequelize.STRING
    },
    admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false  
    },
    active: {
        type:Sequelize.BOOLEAN,      
        defaultValue: false
    }
});

module.exports = Users;