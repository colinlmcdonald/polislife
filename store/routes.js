import React from 'react';
import { Route, IndexRoute } from 'react-router';
import  App from '../src/components/App';
import FrontPage from '../src/containers/FrontPage'
import Representatives from '../src/containers/Representatives'
import RepresentativeInfo from '../src/containers/RepresentativeInfo'
import UpcomingBills from '../src/containers/UpcomingBills'
import UpcomingRepBills from '../src/components/UpcomingRepBills'
import CampaignContributions from '../src/components/ContributorVisualization'
import Login from '../src/containers/Login'
import VotingHistory from '../src/containers/VotingHistory'
import RepWords from '../src/containers/RepWords'

export default (
    <Route path='/' component={App}>
    	<IndexRoute component={FrontPage} />
      <Route path='home' component={FrontPage} />
    	<Route path='representatives' component={Representatives} />
      <Route path='representatives/:id' component={RepresentativeInfo} >
        <IndexRoute component={VotingHistory} />
        <Route path='upcoming_rep_bills' component={UpcomingRepBills} />
        <Route path='campaign_contributions' component={CampaignContributions} />
        <Route path='voting_history' component={VotingHistory} />
        <Route path='words' component={RepWords} />
      </Route>
      <Route path='upcoming_bills' component={UpcomingBills} />
      <Route path='login' component={Login} />
    </Route>
);