import React from 'react';
import xhr from 'xhr';
import Router from 'react-router';
const { RouteHandler, Link } = Router;
import Auth from '../utils/AuthMixin';
import authUtils from '../utils/authUtils';

export default React.createClass({
  mixins: [ Auth ],

  getInitialState () {
    return {
      orgs: []
    };
  },

  componentDidMount () {
    xhr({
      url: 'https://api.github.com/user/orgs',
      responseType: 'json',
      headers: {
        'Authorization': `token ${authUtils.getUser().github.accessToken}`
      }
    }, (err, resp, body) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          orgs: body
        });
      }
    });
  },

  render () {
    const user = authUtils.getUser();

    const orgs = this.state.orgs.map((org) => {
      return (
        <li key={org.login}>
	  <Link to="org" params={{ name: org.login }}>
            {org.login}
	  </Link>
        </li>
      );
    });

    return (
      <div>
	<h1>{user.github.username}&rsquo;s organizations</h1>
        <ul>
          {orgs}
        </ul>
	<RouteHandler />
      </div>
    );
  }
});
