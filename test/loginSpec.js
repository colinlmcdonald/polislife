import nock                         from 'nock'
import configureMockStore           from 'redux-mock-store'
import thunk                        from 'redux-thunk'
import { expect }                   from 'chai'
import sinon                        from 'sinon'
import React                        from 'react'
import { shallow, mount }           from 'enzyme'

import * as actions                 from '../src/actions/actionLogin'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('User Login actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  it('register users', () => {
    nock('https://localhost:3500', {
          reqheaders: {
            'Content-Type': 'application/json'
          }
        })
          .post('/signup', JSON.stringify({
            email: 'test@test.com',
            password: 'yup'
          }))
          .reply(200, {user: true})

    const expectedActions = [{ type: actions.PROCESSING_REGISTRATION },
                             { type: actions.USER_LOGIN_SUCCESS }]
    
    const store = mockStore()

    return store.dispatch(actions.userRegister('test@test.com', 'yup', true))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })

  it('handles errors when registering users', () => {
    nock('https://localhost:3500', {
          reqheaders: {
            'Content-Type': 'application/json'
          }
        })
          .post('/signup', JSON.stringify({
            email: 'test@test.com',
            password: 'yup'
          }))
          .reply(422)

    const expectedActions = [{ type: actions.PROCESSING_REGISTRATION },
                             { type: actions.USER_REGISTRATION_ERROR }]
    
    const store = mockStore()

    return store.dispatch(actions.userRegister('test@test.com', 'yup', true))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })

  it('logs in users', () => {
    nock('https://localhost:3500', {
          reqheaders: {
            'Content-Type': 'application/json'
          }
        })
          .post('/signin', JSON.stringify({
            email: 'test@test.com',
            password: 'yup'
          }))
          .reply(200, {user: true})
    const expectedActions = [{ type: actions.PROCESSING_REGISTRATION },
                             { type: actions.USER_LOGIN_SUCCESS }]
    
    const store = mockStore()

    return store.dispatch(actions.userLogin('test@test.com', 'yup', true))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })

  it('handles errors when logging in users', () => {
    nock('https://localhost:3500', {
          reqheaders: {
            'Content-Type': 'application/json'
          }
        })
          .post('/signin', JSON.stringify({
            email: 'test@test.com',
            password: 'yup'
          }))
          .reply(422)
    const expectedActions = [{ type: actions.PROCESSING_REGISTRATION },
                             { type: actions.USER_LOGIN_ERROR }]
    
    const store = mockStore()

    return store.dispatch(actions.userLogin('test@test.com', 'yup', true))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })

  it('processes logging out users', () => {
    expect(actions.processLogout(true)).to.deep.equal({type: actions.USER_LOGOUT})
  })
})