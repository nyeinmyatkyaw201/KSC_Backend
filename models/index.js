const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host : dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool:{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
})
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./userModel')(sequelize,Sequelize);
db.member = require("./memberModel")(sequelize,Sequelize);
db.newmember = require("./registrationModel")(sequelize,Sequelize);
db.Amember = require("./A_memberrec")(sequelize,Sequelize);
db.TblPath  = require("./upload")(sequelize,Sequelize);
db.Amember.hasMany(db.TblPath,{
    foreignKey: 'ID',
    as: 'SKSC003',
})

db.TblPath.belongsTo(db.Amember,{
    foreignKey: 'ID',
    as:'KSC001a',
})

module.exports = db;