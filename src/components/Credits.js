/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';

const Credits = (props) => {
  
   // Create the list of Credit items
   let itemCount = 0;
   let creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each credits JSON array element
      const date = credit.date ? credit.date.slice(0, 10) : '';
      itemCount++;
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    });
  }

  function submitNewEntry(event) {
    //we are added a new item to the list
    itemCount++;
    //getting today's date
    const today = new Date();
    const newDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    //access the input values from the event object
    const description = event.target.elements.description.value;
    const amount = event.target.elements.amount.value;

    let tempCredit = {
      id: itemCount,
      description: description, 
      amount: amount, 
      date: newDate};
    console.log(tempCredit);

    props.addCredit(tempCredit);
  };

  // Render the list of Credit items and a form to input new Debit item
  return (
    <div>
      <h1>Credits</h1>

      {creditsView()}

      <form onSubmit={(event) => {
        event.preventDefault(); // Prevent default form submission
        submitNewEntry(event); // Call your function to handle the form submission
      }}>
        Description:
        <input type="text" name="description" />
        Amount:
        <input type="number" step="0.01" name="amount" />
        <button type="submit">Add Credit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;