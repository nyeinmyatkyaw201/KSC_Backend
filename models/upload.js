module.exports = (sequelize, Sequelize) => {
    const TblPath = sequelize.define("SKSC002", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true // Enable auto-increment for the id field
        // },
        // Recommendation_A_Member1_Number:{
        //     type: Sequelize.STRING,
        //     allowNull:false,
        // },
        // Recommendation_A_Member1_Name:{
        //     type: Sequelize.STRING,
        //     allowNull:false,
        // },
        // Recommendation_A_Member2_Number:{
        //     type: Sequelize.STRING,
        //     allowNull:false,
        // },
        // Recommendation_A_Member2_Name:{
        //     type: Sequelize.STRING,
        //     allowNull:false,
        // },
        t1: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        t2: {
            type: Sequelize.STRING,
            allowNull:false,
        },
    });

    return TblPath;
}