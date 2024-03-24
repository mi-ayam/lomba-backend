'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('registrations', 'status', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('registrations', 'vaNumber', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('registrations', 'order_id', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
