// This file will create new database tables
// Needed for the project setup
import models from '../../src/models'
// We are using the sequelize setup already in the model index file
// But we still need to import sequelize separately, to run the sync function
// Another solution is to export sequalize in the models file as well.
// This way is not prefered, because:
// - because this would affect the integrety of the models object
// - we are only using the sync function for this script, shich is not a part of this project

import sequelize from '../../src/core/sequelize'

// Enable the force option to drop the existing database and create a brand new one
const options = {
  force: false,
}

// Run sequelize sync function
sequelize.sync(options).then(() => {
  console.log('Finished sequelize sync')
  // End node process
  process.exit()
})
