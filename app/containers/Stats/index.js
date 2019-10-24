import React from 'react'
import { useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { List } from 'semantic-ui-react'

import {
  budgetListSelector,
  getTotalIncomeSelector,
  getTotalExpenseSelector
} from './selectors.js'

const History = () => {
  const { budget, income, expense } = useSelector(
    createStructuredSelector({
      budget: budgetListSelector(),
      income: getTotalIncomeSelector(),
      expense: getTotalExpenseSelector()
    })
  )

  return (
    <div className='l-pa1 l-d-f l-fd-col'>
      <div>
        <List size='massive' divided>
          <List.Item>
            Revenue
          </List.Item>
          {
            budget.filter(i => i.type === 'income').map((r, i) => (
              <List.Item key={i}>
                <div className='l-d-f l-jc-sb'>
                  <span>{`${r.categoryType} - ${r.categoryDescription}`}</span>
                  <span>{`${r.budget}`}</span>
                </div>
              </List.Item>
            ))
          }
          <List.Item>
            <div className='l-d-f l-jc-sb l-pt2'>
              <span>Total Revenue</span>
              <span>{income}</span>
            </div>
          </List.Item>
        </List>
        <hr />
        <List size='massive' divided>
          <List.Item>
            Expense
          </List.Item>
          {
            budget.filter(i => i.type === 'expense').map((r, i) => (
              <List.Item key={i}>
                <div className='l-d-f l-jc-sb'>
                  <span>{`${r.categoryDescription}`}</span>
                  <span>{`${r.budget}`}</span>
                </div>
              </List.Item>
            ))
          }
          <List.Item>
            <div className='l-d-f l-jc-sb l-pt2'>
              <span>Total Expense</span>
              <span>{expense}</span>
            </div>
          </List.Item>
        </List>
        <hr />
        <List size='massive' divided>
          <List.Item>
            <div className='l-d-f l-jc-sb l-pt2'>
              <span>Operating Surplus</span>
              <span>{income - expense}</span>
            </div>
          </List.Item>
        </List>
      </div>
    </div>
  )
}

export default History
