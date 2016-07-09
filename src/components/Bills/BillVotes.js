import React, { Component } from 'react'

// import './Bills.scss';

const BillVotes = ({handleLoginCheck, bill, onNoChange, onYesChange}) => (
  <div>
    <b>Bill: </b>{bill.vote.question}<br />
    <b>Date: </b>{bill.vote.created}<br />
    <b>Current Status: </b>{bill.vote.result}<br />
    <b>Check Out The Full Text On Govtrack</b> <a href={bill.vote.link} target="_blank">here</a> <br />
    <b>Your Rep Voted: </b>{bill.option.value}<br />

    <form className="user_vote" action="#" onSubmit={e => handleLoginCheck(e, bill)}>
      <input id="yes_vote" type="radio" name="vote" value="yea" onClick={() => onYesChange(bill)}/> Yes
       <br />
      <input id="no_vote" type="radio" name="vote" value="nay" onClick={() => onNoChange(bill)}/> No 
      <br />
      <input type="submit" value='Vote!' className="btn btn-default" />
    </form>
      {bill.login === false ? <div className='registration-error'>You must be logged in to vote</div> : null}
      {bill.voted === true ? <div className='vote-indicator'>You voted yes!</div> : null}
      {bill.voted === false ? <div className='vote-indicator'>You voted no!</div> : null}
    <hr />
  </div> 
)

export default BillVotes