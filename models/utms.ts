// import { Model, DataTypes, Sequelize, DataType } from 'sequelize';
import { Model, Optional } from 'sequelize';

type UtmAttributes = {
    utm_id: number;
    utm_url: string;
    utm_campaign_id: string;
    utm_campaign_name: string;
    utm_content: string;
    utm_term: string;
    utm_memo: string;
    full_url: string;
    shorten_url: string;
    short_id: string;
}

type UtmCreationAttributes = Optional<UtmAttributes, 'utm_id'>

class Utms extends Model<UtmAttributes,UtmCreationAttributes> {
    declare utm_id: number;
    declare utm_url: string;
    declare utm_campaign_id: string;
    declare utm_campaign_name: string;
    declare utm_content: string;
    declare utm_term: string;
    declare utm_memo: string;
    declare full_url: string;
    declare shorten_url: string;
    declare short_id: string;
}

// const Utms = (sequelize: Sequelize, DataTypes: any) => {
//     const Utms = sequelize.define(
//         'Utms',
//         {
//             utm_id : {
//                 type : DataTypes.INTEGER,
//                 primaryKey : true,
//                 autoIncrement : true,
//             },
//             utm_url : {
//                 type : DataTypes.STRING,
//                 allowNull : false,
//             },
//             utm_campaign_id : {
//                 type : DataTypes.STRING,
//             },
//             utm_campaign_name : {
//                 type : DataTypes.STRING,
//             },
//             utm_content : {
//                 type : DataTypes.STRING,
//             },
//             utm_term : {
//                 type : DataTypes.STRING,
//             },
//             utm_memo : {
//                 type : DataTypes.STRING,
//             },
//             full_url : {
//                 type : DataTypes.STRING,
//                 allowNull : false,
//             },
//             shorten_url : {
//                 type : DataTypes.STRING,
//             },
//             short_id : {
//                 type : DataTypes.STRING,
//             }
//         },
//         {
//             modelName : 'Utms',
//             tableName : 'Utms',
//             createdAt : 'created_at',
//             updatedAt : 'updated_at',
//             timestamps : true,
//         }
//     );
//     Utms.associate = (db) => {
//         db.Utms.belongsTo(db.User_utm_sources, {
//             foreignKey : 'user_utm_source_id',
//             as : 'utm_source_name',
//             onDelete : 'CASCADE',
//         });
//         db.Utms.belongsTo(db.User_utm_mediums, {
//             foreignKey : 'user_utm_medium_id',
//             as : 'utm_medium_name',
//             onDelete : 'CASCADE',
//         });
//         db.Utms.belongsTo(db.Users, {
//             foreignKey : 'user_id',
//             onDelete : 'CASCADE'
//         });
//     };
//     return Utms;
// };

export default Utms;
