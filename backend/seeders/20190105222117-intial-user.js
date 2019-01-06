module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log(
      'Seed initial admin user (For production: change password afterwards!)'
    )
    const now = new Date()

    return queryInterface
      .bulkInsert(
        'users',
        [
          {
            username: 'Admin',
            // Password: admin
            passwordHash:
              '$2a$10$5SbLOxdqXn/1sxfHgZIll.9YjQZyYpbKcd43fZmQdaQ8GCx/EFJz2',
            role: 'admin',
            createdAt: now,
            updatedAt: now,
          },
        ],
        {}
      )
      .catch(error => console.log('Error: ', error.original.message))
  },

  down: (queryInterface, Sequelize) => {
    console.log('Delete all user seeds')
    return queryInterface.bulkDelete('users', null, {})
  },
}
