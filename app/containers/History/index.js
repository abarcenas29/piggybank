import React from 'react'
import { List } from 'semantic-ui-react'

const History = () => {
  return (
    <div>
      <List size='massive' divided link selection>
        <List.Item style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <List.Icon name='add' color='green' />
          <List.Content>99.00</List.Content>
        </List.Item>
        <List.Item style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <List.Icon name='minus' color='red' />
          <List.Content>99.00</List.Content>
        </List.Item>
        <List.Item style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <List.Icon name='add' color='green' />
          <List.Content>99.00</List.Content>
        </List.Item>
        <List.Item style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <List.Icon name='minus' color='red' />
          <List.Content>99.00</List.Content>
        </List.Item>
        <List.Item style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <List.Icon name='add' color='green' />
          <List.Content>99.00</List.Content>
        </List.Item>
      </List>
    </div>
  )
}

export default History
