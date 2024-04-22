const { DataTypes } = require("sequelize");
const { sequelize, Sequelize } = require(".");

module.exports = (sequelize,Sequelize)=>{
    const newmember = sequelize.define("KSC001",{
        userid : {
            type : DataTypes.STRING(50),
            defaultValue: ""
        },
        username:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        RecordStatus:{
            type: DataTypes.INTEGER,
            defaultValue : 0
        },
        SyncStatus:{
            type : DataTypes.INTEGER,
            defaultValue: 0,
        },
        SyncBatch:{
            type : DataTypes.BIGINT,
            defaultValue: 0,
        },
        userKey :{
            type : DataTypes.BIGINT,
            defaultValue: 0,
        },
        parentid : {
            type : DataTypes.BIGINT,
            defaultValue: 0,
        },
        t1 : {
            type: DataTypes.STRING(255),
            defaultValue:"",
        },
        t2 :{
            type: DataTypes.STRING(255),
            defaultValue:"",
        },
        t3 : {
           type: DataTypes.STRING(255),
           defaultValue:"",
        },
        t4:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t5:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        n1 :{
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        n2:{
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        n3:{
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        n4:{
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        n5:{
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        n6 :{
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        n7:{
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        n8:{
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        n9:{
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        n10:{
            type: DataTypes.BIGINT,
            defaultValue: 0,
        },
        t6 : {
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t7 :{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t8 : {
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t9:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t10:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t11 : {
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t12 :{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t13 : {
           type: DataTypes.STRING(255),
           defaultValue:"",
        },
        t14:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t15:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t16 : {
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t17 :{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t18 : {
           type: DataTypes.STRING(255),
           defaultValue:"",
        },
        t19:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t20:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t21 : {
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t22 :{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t23 : {
           type: DataTypes.STRING(255),
           defaultValue:"",
        },
        t24:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t25:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t26 : {
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t27 :{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t28 : {
           type: DataTypes.STRING(255),
           defaultValue:"",
        },
        t29:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t30:{
            type: DataTypes.STRING(255),
            defaultValue: "",
        }

    }, { timestamps: false});
    return newmember
}