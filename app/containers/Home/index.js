import React, { useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { createStructuredSelector } from 'reselect'
import { Form as ReactFinalForm, FormSpy } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Form,
  Segment,
  Statistic,
  Modal
} from 'semantic-ui-react'

import {
  ADD_ITEM_ACTION
} from 'App/appReducer'
import BudgetForm from 'Components/BudgetForm'

import { getTotalIncomeSelector, getTotalExpenseSelector } from './selectors'

const Container = styled.div`
  height: 100%;
`

const Home = () => {
  const dispatch = useDispatch()
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [isAuthorised, setIsAuthorised] = useState(false)
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
    <Container
      className='l-d-f l-fd-col'
    >
      <Segment
        className='
          l-d-f
          l-jc-cen
          l-ai-cen
          l-fg-1
          '
        basic
        color='green'
        inverted
      >
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
              const {
                values: {
                  categoryDescription,
                  categoryType,
                  recieptNo,
                  type,
                  unitPrice,
                  unitQty,
                  user
                }
              } = form.getState()

              return (
                <Form onSubmit={handleSubmit}>
                  <div className='l-d-f l-js-sb'>
                    <Button
                      circular
                      className='l-pa5'
                      color='green'
                      icon='add circle'
                      onClick={() => {
                        form.change('type', 'income')
                        setIsAuthorised(true)
                        setShowCategoryModal(true)
                      }}
                      size='massive'
                      type='button'
                    />
                    <Button
                      circular
                      color='red'
                      icon='minus'
                      onClick={() => {
                        form.change('type', 'expense')
                        form.change('categoryType', 'expense')
                        setShowCategoryModal(true)
                      }}
                      size='massive'
                      type='button'
                    />
                    <FormSpy
                      subscription={{ submitSucceeded: true }}
                      onChange={({ submitSucceeded }) => {
                        if (submitSucceeded) form.reset()
                      }}
                    />
                  </div>
                  <Modal
                    open={showCategoryModal}
                    size='small'
                    onClose={() => {
                      setShowCategoryModal(false)
                      form.reset()
                    }}
                  >
                    <Modal.Content>
                      <Form>
                        <BudgetForm
                          isAuthorised={isAuthorised}
                          setIsAuthorised={setIsAuthorised}
                          type={type}
                          unitPrice={unitPrice}
                          unitQty={unitQty}
                        />
                        <Form.Field className='l-d-f l-jc-cen'>
                          <Button
                            disabled={
                              !isAuthorised ||
                              !categoryType ||
                              !categoryDescription ||
                              !unitPrice ||
                              !unitQty ||
                              !recieptNo ||
                              !user
                            }
                            onClick={() => {
                              setShowCategoryModal(false)
                              setIsAuthorised(false)
                              form.change('date', dayjs().toISOString())
                              form.submit()
                            }}
                          >
                            Submit
                          </Button>
                        </Form.Field>
                      </Form>
                    </Modal.Content>
                  </Modal>
                </Form>
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
