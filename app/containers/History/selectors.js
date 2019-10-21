import { createSelector } from 'reselect'

const globalReducerRedux = () => s => s.appReducer

export const budgetListSelector = () => createSelector(
  globalReducerRedux(),
  s => s.budget
)
