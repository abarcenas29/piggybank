import React, { useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { createStructuredSelector } from 'reselect'
import { Form as ReactFinalForm, Field, FormSpy } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Segment,
  Statistic,
  Modal,
  Message
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
                  type,
                  categoryType,
                  categoryDescription,
                  user
                }
              } = form.getState()

              console.log(categoryType, 'categoryType')
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
                            onClick={() => {
                              form.change('type', 'income')
                              setIsAuthorised(true)
                              setShowCategoryModal(true)
                            }}
                            size='massive'
                            type='button'
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
                            onClick={() => {
                              form.change('type', 'expense')
                              form.change('categoryType', 'expense')
                              setShowCategoryModal(true)
                            }}
                            size='massive'
                            type='button'
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
                  <Modal
                    open={showCategoryModal}
                    size='small'
                    onClose={() => {
                      setShowCategoryModal(false)
                      form.reset()
                    }}
                  >
                    <Modal.Content>
                      <ul className='l-pl0 l-pr0 l-lst-n'>
                        {
                          type === 'income' &&
                            <li>
                              <Field name='categoryType'>
                                {
                                  ({ input }) => (
                                    <select className='l-w-100' {...input}>
                                      <option />
                                      <option value='sponsor'>
                                        Sponsor
                                      </option>
                                      <option value='contribution-student'>
                                        Contribution - Student
                                      </option>
                                      <option value='contribution-eca'>
                                        Contribution - Extra Curricular Activity
                                      </option>
                                    </select>
                                  )
                                }
                              </Field>
                            </li>
                        }
                        <li className='l-pt1'>
                          <Field name='categoryDescription'>
                            {
                              ({ input }) => (
                                <input
                                  className='l-w-100'
                                  placeholder='description' {...input}
                                />
                              )
                            }
                          </Field>
                        </li>
                        <li className='l-pt1'>
                          <Field name='user'>
                            {
                              ({ input }) => (
                                <input
                                  className='l-w-100'
                                  placeholder='user' {...input}
                                />
                              )
                            }
                          </Field>
                        </li>
                        {
                          type === 'expense' &&
                            <li className='l-d-f l-jc-cen'>
                              <div className='l-d-f l-ai-cen l-pt1 l-pb1'>
                                <input
                                  type='checkbox'
                                  checked={isAuthorised}
                                  onChange={() =>
                                    setIsAuthorised(prevState => !prevState)}
                                />
                                <span className='l-pl1'>
                                  Authorized
                                </span>
                              </div>
                            </li>
                        }
                        {
                          isAuthorised && type === 'expense' &&
                            <Message negative>
                              <p>
                                Make sure this expense if approved by authorised personel
                              </p>
                            </Message>
                        }
                        <li className='l-d-f l-jc-cen l-pt1'>
                          <Button
                            disabled={
                              !isAuthorised ||
                              !categoryType ||
                              !categoryDescription ||
                              !user
                            }
                            onClick={() => {
                              setShowCategoryModal(false)
                              form.change('date', dayjs().toISOString())
                              form.submit()
                            }}
                          >
                            Submit
                          </Button>
                        </li>
                      </ul>
                    </Modal.Content>
                  </Modal>
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
