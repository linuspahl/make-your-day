'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log(
      'Seed default settings (nightMode, leftHandMode, showAppBgImage)'
    )
    const now = new Date()

    return queryInterface
      .bulkInsert(
        'settings',
        [
          {
            title: 'Nachtmodus',
            type: 'nightMode',
            createdAt: now,
            updatedAt: now,
          },
          {
            title: 'Linkshänder Modus',
            type: 'leftHandMode',
            createdAt: now,
            updatedAt: now,
          },
          {
            title: 'Zeige Hintergrundbild an',
            type: 'showAppBgImage',
            createdAt: now,
            updatedAt: now,
          },
        ],
        {}
      )
      .catch(error => console.log('Error: ', error.original.message))
  },

  down: (queryInterface, Sequelize) => {
    console.log('Delete settings')
    return queryInterface.bulkDelete('settings', null, {})
  },
}
