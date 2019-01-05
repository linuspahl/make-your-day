// This file will create new database tables
// Needed for the project setup
import sequelize from '../../src/core/sequelize'
import models from '../../src/models'

// Enable the force option to drop the existing database and create a brand new one
const options = {
  force: false,
}

// Inform sequelize about the existing models
models(sequelize)

// Run sequelize sync function
sequelize.sync(options).then(() => {
  console.log('Finished sequelize sync')
  // End node process
  process.exit()
})
