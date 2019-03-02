export default (sequelize, DataTypes) =>
  sequelize.define(
    'category',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      unit: DataTypes.STRING,
      icon: DataTypes.STRING,
      color: DataTypes.STRING,
      type: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: { isIn: [['journal', 'list', 'counter']] },
      },
      hasTitle: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      hasDescription: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      hasUnit: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      hasSubcategories: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      dailyUsage: {
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      validate: {
        requireUnitWhenHasUnit() {
          // The attribute unit needs to be defined, when hasUnit is true
          if (this.hasUnit === true && this.unit === null) {
            throw new Error('Unit needs to be defined')
          }
        },
        considerType() {
          if (
            this.type === 'counter' &&
            (this.hasSubcategories || this.hasTitle || this.hasDescription)
          ) {
            throw new Error('Not valid for type counter')
          }

          if (
            this.type === 'list' &&
            (this.hasSubcategories || this.hasDescription || !this.hasTitle)
          ) {
            throw new Error('Not valid for type list')
          }
        },
        mustHaveOptionsDefined() {
          if (
            this.type !== 'counter' &&
            this.parentId === null &&
            (!this.hasDescription && !this.hasTitle && !this.hasUnit)
          ) {
            throw new Error(
              'hasDescription, hasTitle or hasUnit should be defined'
            )
          }
        },
        subCategoryIsEmpty() {
          if (
            this.parentId &&
            (this.hasTitle ||
              this.hasUnit ||
              this.hasDescription ||
              this.hasSubcategories ||
              this.dailyUsage)
          ) {
            throw new Error(
              'Category can not handle all values, because they rely on the parent'
            )
          }
        },
      },
    }
  )
