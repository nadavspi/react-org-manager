import React from 'react';
import xhr from 'xhr';
import Router from 'react-router';
import authUtils from '../utils/authUtils';

export default React.createClass({
  mixins: [ Router.State ],

  getInitialState () {
    return {
      user: authUtils.getUser(),
      teams: []
    };
  },

  componentDidMount () {
    this.fetchTeams();
  },

  componentWillReceiveProps () {
    this.fetchTeams();
  },

  fetchTeams () {
    const { name } = this.getParams();
    const { user } = this.state;

    xhr({
      url: `https://api.github.com/orgs/${name}/teams`,
      responseType: 'json',
      headers: {
        'Authorization': `token ${user.github.accessToken}`
      }
    }, (err, resp, body) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          teams: body
        });
      }
    });
  },


  render () {
    const { name } = this.getParams();
    const teams = this.state.teams.map((team) => {
      return (
        <li key={team.id}>
          {team.name} ({team.permission})
        </li>
      );
    });

    return (
      <div>
        <h2>Teams for {name}</h2>
        <ul>
          {teams}
        </ul>
      </div>
    );
  }
});
