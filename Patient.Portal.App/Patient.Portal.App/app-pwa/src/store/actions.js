import * as types from './mutation-types.js'

export const setMsgCurrentPage = (store, payload) => {
  store.commit(types.CURRENT_MSG_PAGE_VIEW, payload)
}

export const setProfileCurrentPage = (store, payload) => {
  store.commit(types.CURRENT_PROFILE_PAGE_VIEW, payload)
}
