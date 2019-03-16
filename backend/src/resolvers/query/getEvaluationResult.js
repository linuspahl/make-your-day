// This function is responsible for the evaluation result.
// It will take the conditions defined in the evaluation,
// query all matching records and return the result
// in a frontend friendly format.

// libraries
import moment from 'moment'

export default (evaluation, args, { models }) => {
  const { Record, Category } = models

  // The evaluation duration is always defined as a dynamic period, like the current week.
  // Based on this period we will calulate the start and end date.
  // For the chart labels we need to define the period duration in days.
  const {
    start: evaluationStart,
    end: evaluationEnd,
    duration: periodDuration,
  } = getPeriodDates(evaluation.period)

  // Based on the duration we will create a label for every day
  // e.g. for the bar or linechart the labels will be used for the x axes
  const defaultLabels = []
  if (evaluation.type !== 'piechart') {
    for (let i = 0; i < periodDuration; i++) {
      const dayDate = moment(evaluationStart).add(i, 'days')
      defaultLabels[i] = moment(dayDate).format('YYYY-MM-DD')
    }
  }

  // For the final query we need to prepare the record conditions.
  const recordConditions = getRecordConditions(
    evaluation,
    evaluationStart,
    evaluationEnd
  )
  // And the record category conditions
  const recordCatConditions = getRecordCatConditions(evaluation)

  return Record.findAll({
    where: recordConditions,
    include: [{ model: Category, where: recordCatConditions }],
  }).then(records => {
    const { labels, datasets } = prepareEvaluationResult(
      evaluation,
      records,
      defaultLabels
    )
    return {
      labels,
      datasets,
    }
  })
}

// Return the end and start date of a period
const getPeriodDates = period => {
  let duration = 0
  let start = null
  let end = null
  switch (period) {
    case 'lastDay':
      start = moment().duration(-1, 'days')
      break
    case 'lastWeek':
      duration = 7
      start = moment().duration(-1, 'weeks')
      break
    case 'lastMonth':
      duration = 30
      start = moment().duration(-1, 'months')
      break
    case 'lastYear':
      duration = 365
      start = moment().duration(-1, 'years')
      break
    case 'day':
      duration = 1
      // start and end are already correctly defined
      break
    case 'week':
      duration = 7
      start = moment().startOf('isoWeek')
      end = moment().endOf('isoWeek')
      break
    case 'month':
      duration = 30
      start = moment().startOf('month')
      end = moment().endOf('month')
      break
    case 'year':
      duration = 365
      start = moment().startOf('year')
      end = moment().endOf('year')
      break
    default:
      break
  }

  return { start, end, duration }
}

// Return the conditions to query all records, related to the evaluation
const getRecordConditions = (evaluation, evaluationStart, evaluationEnd) => {
  // Of course, we are only querying user related records
  const recordConditions = { userId: evaluation.userId }

  // And only records, created in the defined evaluation period
  if (evaluationStart || evaluationEnd) {
    const createdAtCond = {}
    if (evaluationStart) createdAtCond['$gt'] = evaluationStart
    if (evaluationEnd) createdAtCond['$lt'] = evaluationEnd
    recordConditions['$and'] = {
      createdAt: createdAtCond,
    }
  }

  return recordConditions
}

// When querying the records, we need to join the categories.
// Based on the "main" category, selected for the evaluation, we can create some conditions for this join.
const getRecordCatConditions = evaluation => {
  // If the main category has subcategories, we need to query this subcateogories, based on the parentId.
  if (evaluation.category.hasSubcategories) {
    return { parentId: evaluation.categoryId }
  }

  // Otherwise we go the main category id.
  return { id: evaluation.categoryId }
}

// Returns the evaluation result data in a chart js friendly format.
const prepareEvaluationResult = (evaluation, records, labels) => {
  // The result needs to be an array, but for an easier preparation
  // we will use an object and transform it, when returning the result.
  const datasets = {}

  // By default there is one dataset for the evaluation category.
  // Only when the category has subcategories and evaluation.groupSubcategories is false,
  // we will create a dataset for every subcategory
  records.forEach(record => {
    // A dataset has
    // - label, name of the category
    // - color, color defined for the category
    // - data, array of record amounts for each day, always has the same length, as the chart labels

    // Initially we calculate the recordAmount
    const recordAmount = getRecordAmount(record, evaluation.category)

    // By default we will use the record category attibutes
    let categoryId = record.category.id
    let categoryTitle = record.category.title
    let categoryColor = record.category.color

    // When groupSubcategories is defined, the evaluation category has always subcategories
    // and we will create one dataset for all of them
    if (evaluation.groupSubcategories) {
      categoryId = record.category.parentId
      categoryTitle = evaluation.category.title
      categoryColor = evaluation.category.color
    }

    // The pie chart needs to be handled a bit differently.
    // E.g. the labels need to be the categories instead of the dates
    // and we only have one dataset.
    if (evaluation.type === 'piechart') {
      // Because our dataset object gets flattend anyway,
      // we can create a piechart key for further usage
      if (!datasets.piechart) {
        datasets.piechart = {
          data: [],
          backgroundColor: categoryColor || 'grey',
          label: categoryTitle,
        }
      }

      let categoryLabelIndex = labels.findIndex(
        label => label === categoryTitle
      )
      if (categoryLabelIndex === -1) {
        labels = [...labels, categoryTitle]
        categoryLabelIndex = labels.length - 1
        datasets.piechart.data[categoryLabelIndex] = 0
      }

      datasets.piechart.data[categoryLabelIndex] =
        datasets.piechart.data[categoryLabelIndex] + recordAmount
    } else {
      // When there is no dataset for the related category defined, we will create one.
      // The data attribute, need for the records amount,
      // will be an array of zeros with an entry for evey day of the chart.
      if (!datasets[categoryId]) {
        datasets[categoryId] = {
          data: new Array(labels.length).fill(0),
          backgroundColor: categoryColor || 'grey',
          label: categoryTitle,
        }
      }
      // Because every entry in the data attribute relates to one day in the chart,
      // we need to find the correct index for our record
      const createdAt = moment(record.createdAt).format('YYYY-MM-DD')
      const indexOfRelatedDay = labels.findIndex(date => date === createdAt)

      // Finally we can add the record amount to the dataset
      datasets[categoryId].data[indexOfRelatedDay] =
        datasets[categoryId].data[indexOfRelatedDay] + recordAmount
    }
  })

  return { datasets: Object.values(datasets), labels }
}

// Returns the record amount based on the related category.
// The function needs the related category as a param.
// We can't use `record.category` because it could be a subcategory
// and only the parent category contains the needed information
const getRecordAmount = (record, baseCategory) => {
  // If the category has a unit, we will use the record amount
  if (baseCategory.hasUnit) {
    return parseInt(record.amount, 10)
  }
  // otherwise the amount is always one
  return 1
}
