const { DataTypes } = require("sequelize");
const { sequelize, Sequelize } = require(".");

module.exports = (sequelize,Sequelize)=>{
    const Member = sequelize.define("SKSC001",{
        id: {
            type: DataTypes.STRING(255),
            defaultValue : "",
            primaryKey: true
        },
        createddate:{
            type: DataTypes.DATE
        },
        modoefieddate:{
            type:DataTypes.DATE
        },
        userid : {
            type : DataTypes.STRING(50),
            defaultValue: "",
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
            type : DataTypes.INTEGER,
            defaultValue: 0
        },
        parentid:{
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        t1 : {
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        t2 :{
            type: DataTypes.STRING(255),
            defaultValue: "",
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
    },{
        timestamps: false,
    });
    const RawAttributes = Object.assign({}, Member.rawAttributes);
    delete RawAttributes.parentid;
    const nrc = sequelize.define('SKSC007', RawAttributes,{
        timestamps: false,
    });
    const relation = sequelize.define('SKSC003', RawAttributes,{
        timestamps: false,
    });
    const religion = sequelize.define('SKSC008', Member.rawAttributes,{
        timestamps: false,
    });
    const race = sequelize.define('SKSC009', RawAttributes,{
        timestamps: false,
    });

    return {Member,nrc,relation,religion,race};
}
