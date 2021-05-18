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
          image:
            'https://dulichkhampha24.com/wp-content/uploads/2019/09/kinh-nghiem-du-lich-Ha-Noi-1.jpg',
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
          image:
            'https://www.cunard.com/content/dam/cunard/inventory-assets/ports/LIV/LIV.jpg.1533900473356.image.750.563.low.jpg',
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
          image:
            'https://www.pcma.org/wp-content/uploads/2020/01/Manchester-hero.jpg',
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
