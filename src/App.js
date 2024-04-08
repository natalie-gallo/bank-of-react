/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
import axios from 'axios'; // needed for api calling

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }
  
  /*
  Make API requests using the following endpoints:
  Credits API endpoint -> https://johnnylaicode.github.io/api/credits.json
  Debits API endpoint -> https://johnnylaicode.github.io/api/debits.json
  */
  async componentDidMount() {
    let linkToCreditAPI = 'https://johnnylaicode.github.io/api/credits.json';
    let linkToDebitAPI = 'https://johnnylaicode.github.io/api/debits.json';

    let totalCredits = 0;
    let totalDebits = 0;
    let balance = 0;

    //Await for promise (completion) returned from API call
    try {
      let response = await axios.get(linkToCreditAPI);
      console.log(response); // print response
      // To get data object in the response, need to use "response.data"
      this.setState({creditList: response.data});  // Store received data in state's "creditList" object
      for (let credit of this.state.creditList){
        totalCredits += credit.amount;
      }
    } catch (error) { // print errors at console when there is an error response
      if (error.response) {
        // The request was made, and the server responded with error message and status code.
        console.log(error.response.data); // print error message
        console.log(error.response.status); //print status code
      }
    }

    //Await for promise (completion) returned from API call
    try {
      let response = await axios.get(linkToDebitAPI);
      console.log(response); // print response
      // To get data object in the response, need to use "response.data"
      this.setState({debitList: response.data});  // Store received data in state's "debitList" object
      for (let debit of this.state.debitList){
        totalDebits += debit.amount;
      }
    } catch (error) { // print errors at console when there is an error response
      if (error.response) {
        // The request was made, and the server responded with error message and status code.
        console.log(error.response.data); // print error message
        console.log(error.response.status); //print status code
      }
    }

    balance = totalCredits - totalDebits;
    this.setState({accountBalance: balance.toFixed(2)});
  }

  // update state based on user input of new credit
  addCredit = (credit) => {
    this.setState({creditList: [...this.state.creditList, credit]});
    this.setState({accountBalance: this.state.accountBalance + credit.amount}); 
    // ^credit.amount?? would assigning amt be implemented thru form submission?
  }

  // update state based on user input of new debit
  addDebit = (debit) => {
    this.setState({debitList: [...this.state.debitList, debit]});
    this.setState({accountBalance: this.state.accountBalance + debit.amount}); 
    // ^debit.amount?? would assigning amt be implemented thru form submission?
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-starter-code">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;