import React, { Fragment } from 'react'
import { Field } from 'react-final-form'
import { Form, Message } from 'semantic-ui-react'

const BudgetForm = ({ type, unitQty, unitPrice, isAuthorised, setIsAuthorised }) => {
  return (
    <Fragment>
      <Form.Field>
        <Field name='type'>
          {
            ({ input }) => (
              <select disabled className='l-w-100' {...input}>
                <option value='income'>
                  Income
                </option>
                <option value='expense'>
                  Expense
                </option>
              </select>
            )
          }
        </Field>
      </Form.Field>
      <Form.Field>
        {
          type === 'income' &&
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
        }
      </Form.Field>
      <Form.Field>
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
      </Form.Field>
      <Form.Field>
        <Field name='unitPrice'>
          {
            ({ input }) => (
              <input
                type='number'
                className='l-w-100'
                placeholder='Unit Price' {...input}
                pattern='[0-9]*'
              />
            )
          }
        </Field>
      </Form.Field>
      <Form.Field>
        <Field name='unitQty'>
          {
            ({ input }) => (
              <input
                type='number'
                className='l-w-100'
                placeholder='Unit Quantity' {...input}
              />
            )
          }
        </Field>
      </Form.Field>
      <Form.Field>
        <Field name='recieptNo'>
          {
            ({ input }) => (
              <input
                className='l-w-100'
                placeholder='Reciept Number' {...input}
              />
            )
          }
        </Field>
      </Form.Field>
      <Form.Field>
        <Form.Input
          type='input'
          placeholder='Total'
          value={
            (unitQty && unitPrice)
              ? parseFloat(unitQty) * parseFloat(unitPrice) : 0
          }
          readOnly
        />
      </Form.Field>
      <Form.Field>
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
      </Form.Field>
      <Form.Field>
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
      </Form.Field>
      <Form.Field>
        {
          isAuthorised && type === 'expense' &&
            <Message negative>
              <p>
                Make sure this expense if approved by authorised personel
              </p>
            </Message>
        }
      </Form.Field>
    </Fragment>
  )
}

export default BudgetForm
