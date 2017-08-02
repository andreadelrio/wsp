import React from 'react';
import TransactionRow from "./TransactionRow";
import { Container, Row, Col } from 'reactstrap';
import { formatPrice } from './helpers';

class Transactions extends React.Component {

  render() {

    let filteredItems;
    let rows = [];
    let total = 0;
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

      let sort = this.props.sort;
      function custom_sort(a, b) {
        if (sort) {
          return new Date(a.transactionDate) - new Date(b.transactionDate);
        } else {
          return new Date(b.transactionDate) - new Date(a.transactionDate);
        }   
      }

      filteredItems.sort(custom_sort);

      filteredItems.map((transaction, i) => {
        total += transaction.amount
        rows.push(<TransactionRow transaction={transaction} key={i} />);
      });
    }

    return (
      <div className="transaction-rows">
        { rows.length == 0 ? 
        <h4>No transactions for selected accounts and categories</h4>  
        :
        <div>
          {rows}
          <Row className="total">
            <Col className="text-right" sm="10" xs="12">Total:</Col>
            <Col sm="2" xs="3">{formatPrice(total)}</Col>
          </Row>
          
        </div>
        } 
      </div>
    )
	}
}

export default Transactions;


