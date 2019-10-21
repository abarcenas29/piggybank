import React from 'react'
import PieChart from 'react-minimal-pie-chart'
import { useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { List } from 'semantic-ui-react'

import {
  getTotalIncomeSelector,
  getTotalExpenseSelector
} from './selectors.js'

const History = () => {
  const { income, expense } = useSelector(
    createStructuredSelector({
      income: getTotalIncomeSelector(),
      expense: getTotalExpenseSelector()
    })
  )
  const data = [
    { title: 'Income', value: income, color: 'green' },
    { title: 'Expense', value: expense, color: 'red' }
  ]
  return (
    <div className='l-pa1 l-d-f l-fd-col'>
      <div>
        <List size='massive' divided link selection>
          <List.Item style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <List.Icon name='add' color='green' />
            <List.Content>{income}</List.Content>
          </List.Item>
          <List.Item style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <List.Icon name='minus' color='red' />
            <List.Content>{expense}</List.Content>
          </List.Item>
        </List>
      </div>
      <div>
        <PieChart
          label
          data={data}
        />
      </div>
    </div>
  )
}

export default History
