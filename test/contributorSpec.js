import React                        from 'react'
import nock                         from 'nock'
import configureMockStore           from 'redux-mock-store'
import thunk                        from 'redux-thunk'
import {expect}                     from 'chai'
import * as actions                 from '../src/actions/actionContributor'
import contributorData              from '../src/reducers/reducerContributor'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Contributor Data Ecosystem', () => {
  const data = [{
    ind_uni_con: 1000,
    ind_ite_con: 1200,
    oth_com_con: 1300,
    par_com_con: 1400,
    tot_con: 1500,
    cas_on_han_clo_of_per: 1700,
    cas_on_han_beg_of_per: 1600
  }]

  it('should return the initial state', () => {
    expect(
      contributorData(undefined, {})
      ).to.deep.equal({ contributions: null })
  })

  it('Should handle GET_CONTRIBUTOR_DATA', () => {
    expect(
      contributorData([], {
        type: actions.GET_CONTRIBUTOR_DATA,
        data: 'hello'
      })
    ).to.deep.equal({ contributions: 'hello' })
  })

  it('Should create an action to set the contributor data', () => {
    nock('https://localhost:3500')
      .get('/api/data/CandidateSummary/94605/2016')
      .reply(200, data)

    const expectedActions = [{ type: actions.GET_CONTRIBUTOR_DATA,
                               data: [
                                ['individual > $200', 1200],
                                ['individual < $200', 1000],
                                ['other committee', 1300],
                                ['party committee', 1400],
                                ['total', 1500],
                                ['Net Gains', 100]
                               ]
                            }]

    const store = mockStore({ bills: [] })

    return store.dispatch(actions.getContributorData(94605, true))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
  })
})





