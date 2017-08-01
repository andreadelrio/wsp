import React from 'react';
import { Container, Row, Col } from "reactstrap";

class TransactionRow extends React.Component {

  render() {

    const thing = this.props.transaction 
    return (
      <Row>
        <Col sm="2" xs="12">{thing.transactionDate}</Col>
        <Col className="hidden-sm-down" sm="3">{thing.accountId}</Col>
        <Col sm="3" className="hidden-sm-down category">{thing.category ? thing.category.replace(/_/g, " ") : undefined}</Col>
        <Col sm="3" className="hidden-sm-down description">{thing.description}</Col>
        <Col xs="10" className="hidden-sm-up category">{thing.category ? thing.category.replace(/_/g, " ") : undefined} | {thing.description}</Col>
        <Col sm="1" xs="2">{thing.amount}</Col>
      </Row>
    )
  }
}

export default TransactionRow;
