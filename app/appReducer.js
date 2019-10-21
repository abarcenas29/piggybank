import { createAction, handleActions } from 'redux-actions'
import { toast } from 'react-toastify'
import {
  API_ERROR_FAILOVER,
  ADD_ITEM,
  SET_ITEM
} from './constants'

const defaultState = {
  budget: [],
  field: 'value',
  isLoading: false,
  response: null
}

export const API_ERROR_FAILOVER_ACTION = createAction(API_ERROR_FAILOVER)
export const ADD_ITEM_ACTION = createAction(ADD_ITEM)
export const SET_ITEM_ACTION = createAction(SET_ITEM)

const reducer = handleActions(
  new Map([
    [
      API_ERROR_FAILOVER_ACTION,
      (s, { payload }) => ({ ...s, field: payload })
    ],
    [
      ADD_ITEM_ACTION,
      (s, { payload }) => {
        const { budget, ...rest } = s
        localStorage
          .setItem('budget', JSON.stringify([...budget, payload]))
        if (payload.type === 'income') {
          toast.success('Income Item Added')
        } else {
          toast.error('Expense Item Added')
        }
        return ({ ...rest, budget: [...budget, payload] })
      }
    ],
    [
      SET_ITEM_ACTION,
      (s, { payload }) => ({ ...s, budget: payload })
    ]
  ]),
  defaultState
)

export default reducer
