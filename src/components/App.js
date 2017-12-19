import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTeamList } from '../reducers';

import TeamList from './teamlist';

class App extends Component {
  render() {
    let {team} = this.props;
    return (
      <div>
        <div className="floatRight">
          <Link to="/add"><i className="material-icons icons">add</i></Link>
        </div>
        <div className="floatLeft" style={{marginLeft:10,borderBottom:'1px solid lightgray'}}>
          <div className="header">Team members</div>
          {team.length ? 
            <div className="subHeader">You have {team.length} team member{team.length ===1 ? ``: `s`}.</div> : 
            <div className="subHeader">No team member</div>
          }
        </div>
        <TeamList teams={team}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  team: getTeamList(state)
})

export default connect(
  mapStateToProps
)(App);
