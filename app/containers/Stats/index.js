import React from 'react'
import PieChart from 'react-minimal-pie-chart'
import { List } from 'semantic-ui-react'

const History = () => {
  const data = [
    { title: 'Two', value: 15, color: 'green' },
    { title: 'Three', value: 20, color: 'red' }
  ]
  return (
    <div className='l-pa1 l-d-f l-fd-col'>
      <div>
        <List size='massive' divided link selection>
          <List.Item style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <List.Icon name='add' color='green' />
            <List.Content>15%</List.Content>
          </List.Item>
          <List.Item style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <List.Icon name='minus' color='red' />
            <List.Content>20%</List.Content>
          </List.Item>
        </List>
      </div>
      <div>
        <PieChart
          data={data}
        />
      </div>
    </div>
  )
}

export default History
