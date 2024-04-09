/*==================================================
src/components/Home.js

The Home component is used to demonstrate the use of Link.
==================================================*/
import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Bank of React</h1>

        <h1> </h1>

        <img src="https://picsum.photos/200/200" alt="bank" width={300} border={2} />

        <h1> </h1>

        <button><Link to="/userProfile">User Profile</Link></button>
        <br/>
        <button><Link to="/login">Login</Link></button>
        <br/>
        <button><Link to="/credits">Credits</Link></button>
        <br/>
        <button><Link to="/debits">Debits</Link></button>
        <br/><br/>
        <AccountBalance accountBalance={this.props.accountBalance}/>
      </div>
    );
  }
}

export default Home;