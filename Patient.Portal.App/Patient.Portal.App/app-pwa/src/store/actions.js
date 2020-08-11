import * as types from './mutation-types.js'

export const setMsgCurrentPage = (store, payload) => {
  store.commit(types.CURRENT_MSG_PAGE_VIEW, payload)
}
