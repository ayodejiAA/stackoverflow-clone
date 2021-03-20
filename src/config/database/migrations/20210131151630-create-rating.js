'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ratings', {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      contentId: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      contentType: {
        allowNull: false,
        type: Sequelize.ENUM('question', 'answer'),
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Ratings');
  },
};
