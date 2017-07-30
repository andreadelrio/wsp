import React from 'react';
import TransactionRow from "./TransactionRow";

class Transactions extends React.Component {

  render() {

    let filteredItems;
    let rows = [];
    if (this.props && this.props.data) {
      filteredItems = this.props.data;

      let selectedAccount = this.props.account;
      if (selectedAccount) {
        filteredItems = filteredItems.filter(function(item) {
          return item.accountId === selectedAccount;
        });
      }

      let filterCategory = this.props.selectedCategories;
      if (filterCategory) {
        let filterCategoryArray = filterCategory.split(',');
        filteredItems = filteredItems.filter(function(element) {
          return filterCategoryArray.indexOf(element.category) != -1
        });
      }

      filteredItems.map((transaction, i) => {
        rows.push(<TransactionRow transaction={transaction} key={i} />);
      });
    }

    return (
      <div>
        <h1>Transactions</h1>
        { rows.length == 0 ? 
        <h3>No transactions for selected accounts and categories</h3>  
        :
        <div>
          {rows}
        </div>
        } 
      </div>
    )
	}
}

export default Transactions;


