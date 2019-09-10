import React, { useContext } from 'react'
import styled from 'styled-components'
import { Header, Menu } from 'semantic-ui-react'

import Context from './../../context'

const Container = styled.div`
  background-color: #800600;
`

const MainNav = () => {
  const { history } = useContext(Context)
  return (
    <Container className='l-d-b'>
      <div className='l-pa1 header'>
        <Header as='h1' inverted>PUP Piggy Budget</Header>
      </div>
      <div className='l-pa1 sub-menu'>
        <Menu secondary inverted>
          <Menu.Item
            link
            onClick={() => history.push('/')}
          >
            Home
          </Menu.Item>
          <Menu.Item
            link
            onClick={() => history.push('/history')}
          >
            History
          </Menu.Item>
          <Menu.Item
            link
            onClick={() => history.push('/stats')}
          >
            Stats
          </Menu.Item>
        </Menu>
      </div>
    </Container>
  )
}

export default MainNav
