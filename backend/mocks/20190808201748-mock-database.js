'use strict'
// This file will mock the database
// Very useful, if you need some example content
// You will need to generate the seed data, before these mocks

const now = new Date()
const oneDayAgo = new Date(new Date(now).setDate(now.getDate() - 1))
const twoDaysAgo = new Date(new Date(now).setDate(now.getDate() - 2))
const threeDaysAgo = new Date(new Date(now).setDate(now.getDate() - 3))
const fourDaysAgo = new Date(new Date(now).setDate(now.getDate() - 4))
const fiveDaysAgo = new Date(new Date(now).setDate(now.getDate() - 5))
const sixDaysAgo = new Date(new Date(now).setDate(now.getDate() - 6))

module.exports = {
  up: async queryInterface => {
    console.log('Mocking the database')

    // get the initial user, created by the generating seed data
    const initialUserId = await queryInterface.rawSelect(
      'users',
      {
        where: {
          role: 'admin',
        },
      },
      ['id']
    )

    // create categories
    const categories = await generateCategories(queryInterface, initialUserId)
    // create categories
    const subcategories = await generateSubcategories(
      queryInterface,
      initialUserId,
      categories
    )
    // create records
    await generateRecords(
      queryInterface,
      initialUserId,
      categories,
      subcategories
    )

    // create evaluations
    const evaluations = await generateEvaluations(
      queryInterface,
      initialUserId,
      categories
    )

    await generateWidgets(queryInterface, initialUserId, evaluations)

    // create evaluations
    // create widgets
  },

  down: queryInterface => {
    console.log('Delete all user seeds')
  },
}

function generateCategories(queryInterface, initialUserId) {
  return queryInterface.bulkInsert(
    'categories',
    [
      {
        title: 'Ausgaben',
        type: 'journal',
        userId: initialUserId,
        color: 'blue',
        icon: 'eur',
        hasSubcategories: true,
        hasUnit: true,
        unit: '€',
        createdAt: now,
        updatedAt: now,
      },
      {
        title: 'Sport',
        type: 'journal',
        userId: initialUserId,
        color: 'yellow',
        icon: 'bicycle',
        hasSubcategories: true,
        hasUnit: true,
        unit: 'h',
        createdAt: now,
        updatedAt: now,
      },
      {
        title: 'Gewicht',
        type: 'journal',
        userId: initialUserId,
        color: 'orange',
        icon: 'balance-scale',
        hasSubcategories: false,
        hasUnit: true,
        unit: 'kg',
        createdAt: now,
        updatedAt: now,
      },
    ],
    { returning: true }
  )
}

function generateSubcategories(queryInterface, initialUserId, categories) {
  return queryInterface.bulkInsert(
    'categories',
    [
      {
        title: 'Einkauf',
        parentId: categories[0].id,
        userId: initialUserId,
        color: 'blue',
        type: 'journal',
        createdAt: now,
        updatedAt: now,
      },
      {
        title: 'Haushalt',
        parentId: categories[0].id,
        userId: initialUserId,
        color: 'blue',
        type: 'journal',
        createdAt: now,
        updatedAt: now,
      },
      {
        title: 'Restaurants',
        parentId: categories[0].id,
        userId: initialUserId,
        color: 'blue',
        type: 'journal',
        createdAt: now,
        updatedAt: now,
      },
      // Create subcategories for category sport
      {
        title: 'Yoga',
        parentId: categories[1].id,
        userId: initialUserId,
        color: 'blue',
        type: 'journal',
        createdAt: now,
        updatedAt: now,
      },
      {
        title: 'Radfahren',
        parentId: categories[1].id,
        userId: initialUserId,
        color: 'blue',
        type: 'journal',
        createdAt: now,
        updatedAt: now,
      },
      {
        title: 'Schwimmen',
        parentId: categories[1].id,
        userId: initialUserId,
        color: 'blue',
        type: 'journal',
        createdAt: now,
        updatedAt: now,
      },
      {
        title: 'Laufen',
        parentId: categories[1].id,
        userId: initialUserId,
        color: 'blue',
        type: 'journal',
        createdAt: now,
        updatedAt: now,
      },
    ],
    { returning: true }
  )
}

function generateRecords(
  queryInterface,
  initialUserId,
  categories,
  subcategories
) {
  return queryInterface.bulkInsert(
    'records',
    [
      // Create records for subcategory Einkauf
      {
        categoryId: subcategories[0].id,
        userId: initialUserId,
        amount: 15,
        createdAt: now,
        updatedAt: now,
      },
      {
        categoryId: subcategories[0].id,
        userId: initialUserId,
        amount: 20,
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo,
      },
      {
        categoryId: subcategories[0].id,
        userId: initialUserId,
        amount: 10,
        createdAt: threeDaysAgo,
        updatedAt: threeDaysAgo,
      },
      {
        categoryId: subcategories[0].id,
        userId: initialUserId,
        amount: 15,
        createdAt: fiveDaysAgo,
        updatedAt: fiveDaysAgo,
      },
      {
        categoryId: subcategories[0].id,
        userId: initialUserId,
        amount: 25,
        createdAt: sixDaysAgo,
        updatedAt: sixDaysAgo,
      },
      // Create records for subcategory Haushalt
      {
        categoryId: subcategories[1].id,
        userId: initialUserId,
        amount: 10,
        createdAt: now,
        updatedAt: now,
      },
      {
        categoryId: subcategories[1].id,
        userId: initialUserId,
        amount: 22,
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo,
      },
      {
        categoryId: subcategories[1].id,
        userId: initialUserId,
        amount: 5,
        createdAt: threeDaysAgo,
        updatedAt: threeDaysAgo,
      },
      // Create records for subcategory Restaurants
      {
        categoryId: subcategories[2].id,
        userId: initialUserId,
        amount: 10,
        createdAt: now,
        updatedAt: now,
      },
      {
        categoryId: subcategories[2].id,
        userId: initialUserId,
        amount: 12,
        createdAt: threeDaysAgo,
        updatedAt: threeDaysAgo,
      },
      {
        categoryId: subcategories[2].id,
        userId: initialUserId,
        amount: 28,
        createdAt: fiveDaysAgo,
        updatedAt: fiveDaysAgo,
      },
      {
        categoryId: subcategories[2].id,
        userId: initialUserId,
        amount: 8,
        createdAt: sixDaysAgo,
        updatedAt: sixDaysAgo,
      },
      // Create records for subcategory Yoga
      {
        categoryId: subcategories[3].id,
        userId: initialUserId,
        amount: 2,
        createdAt: now,
        updatedAt: now,
      },
      {
        categoryId: subcategories[3].id,
        userId: initialUserId,
        amount: 1.5,
        createdAt: fourDaysAgo,
        updatedAt: fourDaysAgo,
      },
      // Create records for subcategory Radfahren
      {
        categoryId: subcategories[4].id,
        userId: initialUserId,
        amount: 3,
        createdAt: oneDayAgo,
        updatedAt: oneDayAgo,
      },
      {
        categoryId: subcategories[4].id,
        userId: initialUserId,
        amount: 2,
        createdAt: sixDaysAgo,
        updatedAt: sixDaysAgo,
      },
      // Create records for subcategory Schwimmen
      {
        categoryId: subcategories[5].id,
        userId: initialUserId,
        amount: 1,
        createdAt: threeDaysAgo,
        updatedAt: threeDaysAgo,
      },
      {
        categoryId: subcategories[5].id,
        userId: initialUserId,
        amount: 2,
        createdAt: fiveDaysAgo,
        updatedAt: fiveDaysAgo,
      },
      // Create records for category Gewicht
      {
        categoryId: categories[2].id,
        userId: initialUserId,
        amount: 75.5,
        createdAt: now,
        updatedAt: now,
      },
      {
        categoryId: categories[2].id,
        userId: initialUserId,
        amount: 76,
        createdAt: oneDayAgo,
        updatedAt: oneDayAgo,
      },
      {
        categoryId: categories[2].id,
        userId: initialUserId,
        amount: 76.5,
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo,
      },
      {
        categoryId: categories[2].id,
        userId: initialUserId,
        amount: 77,
        createdAt: threeDaysAgo,
        updatedAt: threeDaysAgo,
      },
      {
        categoryId: categories[2].id,
        userId: initialUserId,
        amount: 77.5,
        createdAt: fourDaysAgo,
        updatedAt: fourDaysAgo,
      },
      {
        categoryId: categories[2].id,
        userId: initialUserId,
        amount: 78,
        createdAt: fiveDaysAgo,
        updatedAt: fiveDaysAgo,
      },
      {
        categoryId: categories[2].id,
        userId: initialUserId,
        amount: 78.5,
        createdAt: sixDaysAgo,
        updatedAt: sixDaysAgo,
      },
    ],
    { returning: true }
  )
}

function generateEvaluations(queryInterface, initialUserId, categories) {
  return queryInterface.bulkInsert(
    'evaluations',
    [
      {
        title: 'Ausgaben',
        categoryId: categories[0].id,
        userId: initialUserId,
        groupSubcategories: false,
        period: 'lastWeek',
        type: 'linechart',
        createdAt: now,
        updatedAt: now,
      },
      {
        title: 'Sport',
        categoryId: categories[1].id,
        userId: initialUserId,
        groupSubcategories: true,
        period: 'lastWeek',
        type: 'linechart',
        createdAt: now,
        updatedAt: now,
      },
    ],
    { returning: true }
  )
}

function generateWidgets(queryInterface, initialUserId, evaluations) {
  return queryInterface.bulkInsert(
    'widgets',
    [
      {
        title: 'Timeline',
        position: 'dashboard-top',
        type: 'timeline',
        userId: initialUserId,
        createdAt: now,
        updatedAt: now,
      },
      {
        title: 'Einkaufszettel',
        position: 'dashboard-bottom',
        type: 'textarea',
        userId: initialUserId,
        createdAt: now,
        updatedAt: now,
      },
      {
        title: 'Ausgaben',
        position: 'dashboard-top',
        type: 'evaluation',
        evaluationId: evaluations[0].id,
        userId: initialUserId,
        createdAt: now,
        updatedAt: now,
      },
      {
        title: 'Sport',
        position: 'dashboard-bottom',
        type: 'evaluation',
        evaluationId: evaluations[1].id,
        userId: initialUserId,
        createdAt: now,
        updatedAt: now,
      },
    ],
    { returning: true }
  )
}
