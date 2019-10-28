import { createSelector } from 'reselect'

export const globalReducerRedux = () => s => s.appReducer

export const budgetListSelector = () => createSelector(
  globalReducerRedux(),
  s => s.budget
)

export const getTotalIncomeSelector = () => createSelector(
  budgetListSelector(),
  s => {
    let amount = 0
    const income = s.filter(i => i.type === 'income')
    if (income.length > 0) {
      amount = income
        .map(i => parseFloat(i.unitQty) * parseFloat(i.unitPrice))
        .reduce((a, c) => a + c)
    }
    return amount
  }
)

export const getTotalExpenseSelector = () => createSelector(
  budgetListSelector(),
  s => {
    let amount = 0
    const expense = s.filter(i => i.type === 'expense')
    if (expense.length > 0) {
      amount = expense
        .map(i => parseFloat(i.unitQty) * parseFloat(i.unitPrice))
        .reduce((a, c) => a + c)
    }
    return amount
  }
)
