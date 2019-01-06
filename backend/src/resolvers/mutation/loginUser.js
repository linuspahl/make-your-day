export default (parent, { username, password }, { models }) =>
  models.User.login({ username, password })
