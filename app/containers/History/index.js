import React, { useState } from 'react'
import dayjs from 'dayjs'
import { Form as FinalForm, Field, FormSpy } from 'react-final-form'
import { useSelector, useDispatch } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { toast } from 'react-toastify'
import { List, Label, Modal, Form, Checkbox, Button, Message } from 'semantic-ui-react'

import { SET_ITEM_ACTION } from 'App/appReducer'
import { budgetListSelector } from './selectors'

const History = () => {
  const dispatch = useDispatch()
  const [budgetModal, setBudgetModal] = useState(false)
  const [action, setAction] = useState('create')
  const [currentRow, setCurrentRow] = useState(null)
  const [currentData, setCurrentData] = useState({})
  const [isAuthorised, setIsAuthorised] = useState({})
  const { budget } = useSelector(
    createStructuredSelector({
      budget: budgetListSelector()
    })
  )

  const onSubmit = values => {
    const newBudget = budget
    switch (action) {
      case 'update':
        newBudget[currentRow] = values
        dispatch(SET_ITEM_ACTION(newBudget))
        break
      case 'delete':
        newBudget.splice(currentRow, 1)
        dispatch(SET_ITEM_ACTION(newBudget))
        break
    }
    localStorage.setItem('budget', JSON.stringify(newBudget))
  }

  return (
    <div>
      <List size='massive' divided link selection>
        {
          budget.map((r, i) => (
            <List.Item
              onClick={() => {
                setBudgetModal(true)
                setCurrentRow(i)
                setCurrentData(budget[i])
              }}
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
      <Modal
        open={budgetModal}
        size='small'
        onClose={() => {
          setBudgetModal(prevState => !prevState)
          setCurrentRow(null)
          setCurrentData({})
        }}
      >
        <Modal.Content>
          <FinalForm
            onSubmit={onSubmit}
            initialValues={currentData}
          >
            {
              ({ handleSubmit, form, values }) => {
                const {
                  type,
                  categoryType,
                  categoryDescription,
                  user
                } = values
                return (
                  <Form onSubmit={handleSubmit}>
                    <Form.Field>
                      <label>Type</label>
                      <Field name='type'>
                        {
                          ({ input }) => (
                            <select {...input}>
                              <option />
                              <option value='income'>Income</option>
                              <option value='expense'>Expense</option>
                            </select>
                          )
                        }
                      </Field>
                    </Form.Field>
                    <Form.Field>
                      <label>Amount</label>
                      <Field name='budget' component='input' />
                    </Form.Field>
                    {
                      type === 'income' &&
                        <Form.Field>
                          <label>Category</label>
                          <Field name='categoryType'>
                            {
                              ({ input }) => (
                                <select {...input}>
                                  <option />
                                  <option value='sponsor'>Sponsor</option>
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
                        </Form.Field>
                    }
                    {
                      type === 'expense' &&
                        <Form.Field>
                          <label>Category</label>
                          <Field
                            name='categoryType'
                            component='input'
                            value='expense'
                            readOnly
                          />
                        </Form.Field>
                    }
                    <Form.Field>
                      <label>Description</label>
                      <Field name='categoryDescription' component='input' />
                    </Form.Field>
                    <Form.Field>
                      <label>User</label>
                      <Field name='user' component='input' />
                    </Form.Field>
                    {
                      type === 'expense' &&
                        <Form.Field className='l-d-f l-jc-cen l-pt1 l-pb1'>
                          <Checkbox
                            label='This amount is authorised'
                            checked={isAuthorised}
                            onChange={() => {
                              setIsAuthorised(prevState => !prevState)
                            }}
                          />
                        </Form.Field>
                    }
                    {
                      isAuthorised && type === 'expense' &&
                        <Form.Field>
                          <Message negative>
                            <p>
                              Make sure this expense if approved by authorised personel
                            </p>
                          </Message>
                        </Form.Field>
                    }
                    <FormSpy subscription={{ pristine: true }}>
                      {
                        ({ pristine }) => (
                          <div className='l-d-f l-jc-sb'>
                            <Button
                              negative
                              type='submit'
                              onClick={() => {
                                setAction('delete')
                              }}
                            >
                              Delete
                            </Button>
                            <Button
                              primary
                              disabled={
                                pristine ||
                                !isAuthorised ||
                                !categoryType ||
                                !categoryDescription ||
                                !user
                              }
                              type='submit'
                              onClick={() => {
                                setAction('update')
                              }}
                            >
                              Submit
                            </Button>
                          </div>
                        )
                      }
                    </FormSpy>
                    <FormSpy
                      onChange={({ submitSucceeded }) => {
                        if (submitSucceeded) {
                          form.reset()
                          setAction('create')
                          setBudgetModal(false)
                          toast.success('Entry Updated')
                        }
                      }}
                    />
                  </Form>
                )
              }
            }
          </FinalForm>
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default History
