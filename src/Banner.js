import React from 'react';
import { Container, Row, Col } from "reactstrap";
import './App.css';
import avatar from "./img/adr.jpg";
import { formatPrice } from './helpers';
import dateFormat from 'dateformat';



class Banner extends React.Component {

  render() {

    let someDay = new Date();
    someDay.setDate(someDay.getDate() - 5.3);
    let total = 0;
    let items;
    if (this.props && this.props.data) {
      items = this.props.data;
      items.map((transaction, i) => {
        total += transaction.amount
      });
    }

    return (
      <Container fluid={true} className="pt-4 banner">
        <Row>
          <Col xs={{size:4}} md={{size:1, offset:1}} className="avatar"><img className="img-fluid rounded-circle" src={avatar} alt=""/></Col>
          <Col md={{size:7, offset:0}}>
            <h5>Welcome back, Andrea!</h5>
            <span className="hidden-sm-down" >Your last visit was: {dateFormat(someDay, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</span>
          </Col>
          <Col xs={{size:8, offset:4}} md={{size:2, offset:0}}>Total Balance:
            <h4>{formatPrice(total)}</h4>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Banner;
