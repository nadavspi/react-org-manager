import React from 'react';
import xhr from 'xhr';
import OrgTeams from './OrgTeams';

export default React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      orgs: [],
      selectedOrg: {}
    };
  },

  componentDidMount () {
    xhr({
      url: 'https://api.github.com/user/orgs',
      responseType: 'json',
      headers: {
        'Authorization': `token ${this.props.user.accessToken}`
      }
    }, (err, resp, body) => {
      if (err) {
        console.log(err);
      } else {
        console.log(body);
        this.setState({
          orgs: body
        });
      }
    });
  },

  handleSelectOrg (org) {
    this.setState({
      selectedOrg: org
    });
  },

  render () {
    const { user } = this.props;
    const { selectedOrg } = this.state;

    const orgs = this.state.orgs.map((org) => {
      return (
        <li key={org.login}>
          <button
           type="button"
           onClick={this.handleSelectOrg.bind(null, org)}
           className={selectedOrg === org ? 'active' : ''}
          >
            {org.login}
          </button>
        </li>
      );
    });

    return (
      <div>
        <h1>Hello, {user.displayName}</h1>
        Your orgs:
        <ul>
          {orgs}
        </ul>
        {selectedOrg && (
          <OrgTeams user={user} org={selectedOrg} />
        )}
      </div>
    );
  }
});
