import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

//input api key below
var apiKey = "input apikey here";
var config = {
  headers: {'X-API-Key':apiKey}
  };

  
  
    
class FetchClan extends React.Component {
  static propTypes = {
    clanName: PropTypes.string.isRequired
  }

  state = {
    groupId: [],
    loading: true,
    error: null
  }

  
  componentDidMount() {
    
    axios.get(`https://www.bungie.net/Platform/GroupV2/${this.props.clanID}/Members/?currentpage=1`,config)
    .then(res => {
      console.log(res.data)
        const members = res.data.Response.results.map(obj => obj.destinyUserInfo);
                
      this.setState({
        members,
        loading: false,
        error: null
      });
    })
    .catch(err => {
      this.setState({
        loading: false,
        error: err
      });
    });

}

renderLoading() {
  return <div>Loading...</div>;
}

renderError() {
  return (
    <div>
      Something went wrong: {this.state.error.message}
    </div>
  );
}

rendermembers() {

  const { error, members, } = this.state;

  if(error) {
    return this.renderError();
  }

  return (
    <ul>
      {members.map(member =>
        <li key={member.membershipId}>
          <span className="score">{member.displayName}</span>
          {member.membershipId}
        </li>
      )}
    </ul>
  );
}


render() {
  const { clanID } = this.props;
  const { loading } = this.state;


  return (
    <div>
    <h1>{`Destiny Leaderboards`}</h1>
    <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      {loading ? this.renderLoading() : this.rendermembers()}
    </div>
  );
}
}


export default FetchClan;

