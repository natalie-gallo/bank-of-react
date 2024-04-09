/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Debits = (props) => {
  // Create the list of Debit items
  let idNum = 0;
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    });
  }

  // adds leading zeroes to month/day if only one digit
  function format(number) {
    return number < 10 ? '0' + number : number;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    idNum++;
    const newDescription = e.target.description.value;
    const newAmount = e.target.amount.value;
    const today = new Date();
    const year = today.getFullYear();
    const date = format(today.getDate());
    const month = format(today.getMonth()+1);
    const newDate = year + "-" + date + "-" + month;
    
    let newDebit = {
      id: idNum,
      amount: newAmount,
      description: newDescription,
      date: newDate,
    };
    console.log(newDebit);
    props.addDebit(newDebit);
  }
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>

      {debitsView()}

      <form onSubmit={handleSubmit}>
        <label for="text">Description:</label>
        <input type="text" name="description" />
        <label for="text">Amount:</label>
        <input type="number" step="0.01" name="amount" />
        <button type="submit">Add Debit</button>
      </form>
      <br/>
      <AccountBalance accountBalance={props.accountBalance}/>
      <br />
      <button><Link to="/">Return to Home</Link></button>
    </div>
  );
}

export default Debits;