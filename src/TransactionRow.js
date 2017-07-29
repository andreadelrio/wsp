import React from 'react';

class TransactionRow extends React.Component {

  render() {

    const thing = this.props.transaction 
    return (
      <tr>
        <td>{thing.accountId}</td>
        <td>{thing.category}</td>
        <td>{thing.description}</td>
        <td>{thing.amount}</td>
        <td>{thing.transactionDate}</td>
      </tr>
    )
  }
}

export default TransactionRow;
