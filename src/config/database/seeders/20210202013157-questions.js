'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Questions',
      [
        {
          title: 'Just a simple question in here',
          body: 'How can I center a div',
          slug: 'sample-slug-1',
          authorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          title: 'How to mock server error in jest',
          body:
            'Hi, I am new here. Please how can i mock my endpoing to throw server error',
          slug: 'sample-slug-1',
          authorId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface) => queryInterface.bulkDelete('Questions', null, {}),
};
