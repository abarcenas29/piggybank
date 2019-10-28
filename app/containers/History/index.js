import React, { useState } from 'react'
import dayjs from 'dayjs'
import { Form as FinalForm, FormSpy } from 'react-final-form'
import { useSelector, useDispatch } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { toast } from 'react-toastify'
import { List, Label, Modal, Form, Button } from 'semantic-ui-react'

import { SET_ITEM_ACTION } from 'App/appReducer'
import BudgetForm from 'Components/BudgetForm'
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
                <List.Header>
                  {
                    `${parseFloat(r.unitPrice) * parseFloat(r.unitQty)} - ${r.categoryType}`
                  }
                </List.Header>
                <List.Description className='l-d-b'>
                  <div style={{ fontSize: '1.2rem' }} className='f-italic'>
                    Unit Qty <span className='f-bold'>{`${r.unitQty}`}</span>, Unit Price <span className='f-bold'>{`${r.unitPrice}`}</span>, Reciept No <span className='f-bold'>{`${r.recieptNo}`}</span>
                  </div>
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
                  unitPrice,
                  unitQty,
                  user
                } = values
                return (
                  <Form onSubmit={handleSubmit}>
                    <BudgetForm
                      isAuthorised={isAuthorised}
                      setIsAuthorised={setIsAuthorised}
                      type={type}
                      unitPrice={unitPrice}
                      unitQty={unitQty}
                    />
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
                                !user ||
                                !unitPrice ||
                                !unitQty
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
                          setIsAuthorised(false)
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
