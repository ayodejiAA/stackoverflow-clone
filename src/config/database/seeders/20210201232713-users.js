('use strict');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

const hashPassword = (password) => bcrypt.hashSync(password, 10);

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          displayName: 'Alina',
          email: 'user@gmail.com',
          password: hashPassword('password1Q'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          displayName: 'Eagle',
          email: 'user1@gmail.com',
          password: hashPassword('password1Q'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          displayName: 'ayodejiaa',
          email: 'user2@gmail.com',
          password: hashPassword('password1Q'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
