export default (parent, args, { models, currentUser }) =>
  models.Widget.update(args, {
    where: { id: args.id, userId: currentUser.id },
    returning: true,
  }).then(result => result[1][0])
