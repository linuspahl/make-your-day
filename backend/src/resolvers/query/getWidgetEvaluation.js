export default (widget, args, { models }) =>
  models.Evaluation.findOne({
    where: { id: widget.evaluationId },
    include: [{ model: models.Category }],
  })
