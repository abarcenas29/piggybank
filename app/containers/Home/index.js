import React from 'react'
import styled from 'styled-components'
import { Statistic, Segment, Button, Input } from 'semantic-ui-react'

const Container = styled.div`
  height: 100%;
`
const InputStyle = styled(Input)`
  > input {
    color: #000 !important;
    text-align: center !important;
  }
  border-bottom: 1px solid rgba(0,0,0,0.3);
`

const Home = () => {
  return (
    <Container className='l-d-f l-fd-col'>
      <Segment className='l-d-f l-jc-cen l-ai-cen l-fg-1' basic color='green' inverted>
        <div>
          <Statistic inverted>
            <Statistic.Label>Total Budget</Statistic.Label>
            <Statistic.Value>9,999.99</Statistic.Value>
          </Statistic>
        </div>
      </Segment>
      <Segment className='l-fg-1 l-d-f l-jc-cen l-ai-cen' basic>
        <div className='l-d-f l-js-sb'>
          <Button
            icon='add circle'
            size='massive'
            circular
            color='green'
            className='l-pa5'
          />
          <InputStyle
            transparent
            inverted
            className='f-center'
            color='black'
            size='huge'
          />
          <Button
            icon='minus'
            size='massive'
            circular 
            color='red'
          />
        </div>
      </Segment>
      <Segment className='l-fg-1 l-d-f l-jc-cen l-ai-cen' basic color='red' inverted>
        <div>
          <Statistic inverted>
            <Statistic.Label>Total Expense</Statistic.Label>
            <Statistic.Value>9,999.99</Statistic.Value>
          </Statistic>
        </div>
      </Segment>
    </Container>
  )
}

export default Home
