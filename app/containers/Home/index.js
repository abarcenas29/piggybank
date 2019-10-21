import React from 'react'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { Form as ReactFinalForm, Field, FormSpy } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Segment,
  Statistic
} from 'semantic-ui-react'

import {
  ADD_ITEM_ACTION
} from 'App/appReducer'

import { getTotalIncomeSelector, getTotalExpenseSelector } from './selectors'

const Container = styled.div`
  height: 100%;
`
const Input = styled.input`
  border-bottom: 1px solid rgba(0,0,0,0.3);
  background: transparent;
  border: 0;
  border-bottom: 1px solid #000;
  outline: none;
  font-size: 1.5rem;
`

const Home = () => {
  const dispatch = useDispatch()
  const { totalIncome, totalExpense } = useSelector(
    createStructuredSelector({
      totalIncome: getTotalIncomeSelector(),
      totalExpense: getTotalExpenseSelector()
    })
  )

  const onSetAmount = values => {
    dispatch(ADD_ITEM_ACTION(values))
  }

  return (
    <Container className='l-d-f l-fd-col'>
      <Segment className='l-d-f l-jc-cen l-ai-cen l-fg-1' basic color='green' inverted>
        <div>
          <Statistic inverted>
            <Statistic.Label>Total Income</Statistic.Label>
            <Statistic.Value>{totalIncome}</Statistic.Value>
          </Statistic>
        </div>
      </Segment>
      <Segment className='l-fg-1 l-d-f l-jc-cen l-ai-cen' basic>
        <ReactFinalForm onSubmit={onSetAmount}>
          {
            ({ handleSubmit, form }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <div className='l-d-f l-js-sb'>
                    <FormSpy subscription={{ pristine: true }}>
                      {
                        ({ pristine }) => (
                          <Button
                            circular
                            className='l-pa5'
                            color='green'
                            disabled={pristine}
                            icon='add circle'
                            onClick={() => form.change('type', 'income')}
                            size='massive'
                            type='submit'
                          />
                        )
                      }
                    </FormSpy>
                    <Field
                      name='budget'
                    >
                      {
                        ({ input }) => (
                          <Input
                            type='number'
                            className='f-center'
                            {...input}
                          />
                        )
                      }
                    </Field>
                    <FormSpy subscription={{ pristine: true }}>
                      {
                        ({ pristine }) => (
                          <Button
                            circular
                            color='red'
                            disabled={pristine}
                            icon='minus'
                            onClick={() => form.change('type', 'expense')}
                            size='massive'
                            type='submit'
                          />
                        )
                      }
                    </FormSpy>
                    <FormSpy
                      subscription={{ submitSucceeded: true }}
                      onChange={({ submitSucceeded }) => {
                        if (submitSucceeded) form.reset()
                      }}
                    />
                  </div>
                </form>
              )
            }
          }
        </ReactFinalForm>
      </Segment>
      <Segment
        className='l-fg-1 l-d-f l-jc-cen l-ai-cen'
        basic
        color='red'
        inverted
      >
        <div>
          <Statistic inverted>
            <Statistic.Label>Total Expense</Statistic.Label>
            <Statistic.Value>{totalExpense}</Statistic.Value>
          </Statistic>
        </div>
      </Segment>
    </Container>
  )
}

export default Home
