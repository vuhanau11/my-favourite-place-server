'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Places',
      [
        {
          name: 'Hà Nội',
          description: 'Hà Nội',
          longitude: 105.83405400255518,
          latitude: 20.997561884819525,
          status: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Liverpool',
          description: 'Liverpool',
          longitude: -2.983333,
          latitude: 53.400002,
          status: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Manchester',
          description: 'Manchester',
          longitude: -2.244644,
          latitude: 53.483959,
          status: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Places', null, {})
  },
}
