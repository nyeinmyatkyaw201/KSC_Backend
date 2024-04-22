const { DataTypes } = require("sequelize");
const { sequelize, Sequelize } = require(".");

module.exports = (sequelize,Sequelize)=>{
    const User = sequelize.define("UVM005",{
        userid:{
            type: DataTypes.STRING(50),
        },
        username:{
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        RecordStatus:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        SyncStatus:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        SyncBatch:{
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        AccountUserId:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        EncryptPassword:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        PasswordComfirm:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t4:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t5:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t6:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t7:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        n1:{
            type:DataTypes.BIGINT,
            defaultValue: 0,
        },
        n2:{
            type:DataTypes.BIGINT,
            defaultValue: 0,
        },
        n3:{
            type:DataTypes.BIGINT,
            defaultValue: 0,
        },
        PersonSyskey:{
            type:DataTypes.BIGINT,
            defaultValue: 0,
        },
        n5:{
            type:DataTypes.BIGINT,
            defaultValue: 0,
        },
        n6:{
            type:DataTypes.BIGINT,
            defaultValue: 0,
        },
        n6:{
            type:DataTypes.BIGINT,
            defaultValue: 0,
        },
        n8:{
            type:DataTypes.BIGINT,
            defaultValue: 0,
        }
    });
    return User;
};