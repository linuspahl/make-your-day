import checkAccess from '../checkAccess'

export default (parent, args, { models, authToken }) =>
  checkAccess(models, authToken).then(() => models.Setting.findAll())
