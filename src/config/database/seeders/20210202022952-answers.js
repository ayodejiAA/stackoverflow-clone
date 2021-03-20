'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Answers',
      [
        {
          text: 'Just a simple response to your comment',
          authorId: 2,
          questionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'Just a another simple answer',
          authorId: 1,
          questionId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          text: 'Just the thirs answer in here.',
          authorId: 1,
          questionId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) =>
    await queryInterface.bulkDelete('Answers', null, {}),
};
