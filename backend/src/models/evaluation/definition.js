export default (sequelize, DataTypes) =>
  sequelize.define('evaluation', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: { isIn: [['barchart', 'linechart', 'piechart']] },
    },
    groupSubcategories: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    period: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.STRING,
      validate: {
        isIn: [
          [
            'day',
            'week',
            'month',
            'year',
            'lastDay',
            'lastWeek',
            'lastMonth',
            'lastYear',
          ],
        ],
      },
    },
  })
