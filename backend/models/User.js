const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const bcrypt = require('bcrypt')

const User= sequelize.define('User' , {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
    },
})

User.beforeCreate(async(user) => {
    user.password = await bcrypt.hash(user.password, 10)
})

User.prototype.toJSON = function () {
    const values = object.assign({}, this.get())
    delete values.password
    return values
}

module.exports = User