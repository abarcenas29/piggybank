import React from 'react'
import { useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { List } from 'semantic-ui-react'

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
              <List.Content>{r.budget}</List.Content>
            </List.Item>
          ))
        }
      </List>
    </div>
  )
}

export default History
