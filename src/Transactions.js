import React from 'react';
import TransactionRow from "./TransactionRow";
import { Container, Row, Col } from 'reactstrap';
import { formatPrice } from './helpers';
import FontAwesome from 'react-fontawesome';


class Transactions extends React.Component {

  constructor(props) {
    super(props);
    this.changeDate = this.changeDate.bind(this);
  }

  changeDate() {
    this.props.changeDate();
  }

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
        <h5 className="pt-4">No transactions for selected accounts and categories.</h5>  
        :
        <div>
          <Row className="table-title mt-4">
            <Col className="mt-1" xs="5" sm="8"><h5>Transactions</h5></Col>
            <Col className="text-right" xs="3" sm="2"><strong>Total:</strong></Col>
            <Col className="text-center" xs="4" sm="2" >
              <strong>{formatPrice(total)}</strong>
            </Col>
          </Row>
          <Row className="hidden-sm-down header">
            <Col sm="2"><div className="sort" onClick={this.changeDate}><FontAwesome name='calendar'/> Date {this.props.sort ? <FontAwesome name='caret-up'/> : <FontAwesome name='caret-down'/>}</div></Col>
            <Col sm="3">Account N°</Col>
            <Col sm="2" className="hidden-sm-down"><FontAwesome name='tags'/> Category</Col>
            <Col sm="3" className="hidden-sm-down">Description</Col>
            <Col sm="2">Amount</Col>
          </Row>
          {rows}
          <Row className="total">
            <Col className="text-right" sm="10" xs="8">Total:</Col>
            <Col sm="2" xs="4">{formatPrice(total)}</Col>
          </Row>
        </div>
        } 
      </div>
    )
	}
}

export default Transactions;


