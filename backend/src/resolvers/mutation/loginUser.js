export default (parent, { username, password, device }, { models }) =>
  models.User.login({ username, password, device })
