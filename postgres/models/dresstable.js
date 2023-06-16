const Sequelize = require("sequelize");
const { dressdb } = require("../dbconfig");

const dress = dressdb.define(
  "dresstable",
  {
    name: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    size: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    currdate: {
      type: Sequelize.DATE,
    },
    is_deleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    created_on: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    modified_on: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: false }
);

// cost_catagory.associate = (models) => {
//     cost_catagory.belongsTo(models.company,{foreignKey: 'company_id'});
// };
// cost_catagory.belongsTo(company, {foreignKey: {
//     name: 'company_id'}
//   })

module.exports = dress;
