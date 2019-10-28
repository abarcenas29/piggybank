import React from 'react'
import { useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import dayjs from 'dayjs'

import { List, Label } from 'semantic-ui-react'

import {
  budgetListSelector,
  getTotalExpenseSelector,
  getTotalIncomeSelector
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
                  <div className='l-d-b'>
                    <div>
                      {`${r.categoryType} - ${r.categoryDescription}`}
                    </div>
                    <div
                      style={{ fontSize: '1.2rem' }}
                      className='f-italic'
                    >
                      Unit Qty <span className='f-bold'>{`${r.unitQty}`}</span>, Unit Price <span className='f-bold'>{`${r.unitPrice}`}</span>, Reciept No <span className='f-bold'>{`${r.recieptNo}`}</span>
                    </div>
                  </div>
                  <div>
                    {`${parseFloat(r.unitPrice) * parseFloat(r.unitQty)}`}
                  </div>
                </div>
                <div className='l-d-f l-jc-fe'>
                  <Label basic color='grey' key='gray' size='tiny'>
                    {`${dayjs(r.date).format('MMM, DD, YYYY')}`}
                  </Label>
                </div>
              </List.Item>
            ))
          }
          <List.Item>
            <div className='l-d-f l-jc-sb l-pt2'>
              <span>Cash On Hand</span>
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
                  <div className='l-d-b'>
                    <div>
                      {`${r.categoryType} - ${r.categoryDescription}`}
                    </div>
                    <div
                      style={{ fontSize: '1.2rem' }}
                      className='f-italic'
                    >
                      Unit Qty <span className='f-bold'>{`${r.unitQty}`}</span>, Unit Price <span className='f-bold'>{`${r.unitPrice}`}</span>, Reciept No <span className='f-bold'>{`${r.recieptNo}`}</span>
                    </div>
                  </div>
                  <div className='l-d-b'>
                    {`${parseFloat(r.unitPrice) * parseFloat(r.unitQty)}`}
                  </div>
                </div>
                <div className='l-d-f l-jc-fe'>
                  <Label basic color='grey' key='gray' size='tiny'>
                    {`${dayjs(r.date).format('MMM, DD, YYYY')}`}
                  </Label>
                </div>
              </List.Item>
            ))
          }
          <List.Item>
            <div className='l-d-f l-jc-sb l-pt2'>
              <span>Cash Withdrawn</span>
              <span>{expense}</span>
            </div>
          </List.Item>
        </List>
        <hr />
        <List size='massive' divided>
          <List.Item>
            <div className='l-d-f l-jc-sb l-pt2'>
              <span>Total Cash On Hand</span>
              <span>{income - expense}</span>
            </div>
          </List.Item>
        </List>
      </div>
    </div>
  )
}

export default History
