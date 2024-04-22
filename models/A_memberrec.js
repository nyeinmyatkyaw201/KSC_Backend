module.exports = (sequelize,Sequelize) => {
    const A_memberrec = sequelize.define("KSC001a",{
        ID: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        Recommendation_A_Member1_Number:{
            type: Sequelize.STRING,
            allowNull:false,
        },
        Recommendation_A_Member1_Name:{
            type: Sequelize.STRING,
            allowNull:false,
        },
        Recommendation_A_Member2_Number:{
            type: Sequelize.STRING,
            allowNull:false,
        },
        Recommendation_A_Member2_Name:{
            type: Sequelize.STRING,
            allowNull:false,
        },
    });
    return A_memberrec;
}