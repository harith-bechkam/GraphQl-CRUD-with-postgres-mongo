"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.renameColumn("dresstable", "type", "type--");
    // await queryInterface.changeColumn("dresstable", "type",
    // // {
    // //   type: Sequelize.INTEGER,
    // // }
    // // {
    // //   type: `"enum_Messages_status" USING CAST("status" as "enum_Messages_status")`,
    // // }
    // );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("dresstable");
  },
};
