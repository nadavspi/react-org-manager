import React from 'react';
import xhr from 'xhr';

export default React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    org: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      teams: []
    };
  },

  componentWillReceiveProps (newProps) {
    const { org } = newProps;

    xhr({
      url: `https://api.github.com/orgs/${org.login}/teams`,
      responseType: 'json',
      headers: {
        'Authorization': `token ${this.props.user.accessToken}`
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
    const teams = this.state.teams.map((team) => {
      return (
        <li>
          {team.name} ({team.permission})
        </li>
      );
    });

    return (
      <div>
        <h2>Teams for {this.props.org.login}</h2>
        <ul>
          {teams}
        </ul>
      </div>
    );
  }
});
