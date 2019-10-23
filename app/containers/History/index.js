import React from 'react'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { List, Label } from 'semantic-ui-react'

import { budgetListSelector } from './selectors'

const History = () => {
  const { budget } = useSelector(
    createStructuredSelector({
      budget: budgetListSelector()
    })
  )

  return (
    <div>
      <List size='massive' divided link selection>
        {
          budget.map((r, i) => (
            <List.Item
              key={i}
              style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
            >
              {
                r.type === 'income' &&
                  <List.Icon
                    name='add'
                    color='green'
                  />
              }
              {
                r.type === 'expense' &&
                  <List.Icon
                    name='minus'
                    color='red'
                  />
              }
              <List.Content>
                <List.Header>{`${r.budget} - ${r.categoryType}`}</List.Header>
                <List.Description className='l-d-b'>
                  <div>
                    {`${r.categoryDescription} - by ${r.user}`}
                  </div>
                  <div className='l-d-f l-jc-fe'>
                    <Label basic color='grey' key='gray' size='tiny'>
                      {`${dayjs(r.date).format('MMM, DD, YYYY')}`}
                    </Label>
                  </div>
                </List.Description>
              </List.Content>
            </List.Item>
          ))
        }
      </List>
    </div>
  )
}

export default History
