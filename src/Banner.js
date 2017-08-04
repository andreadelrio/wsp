import React from 'react';
import { Container, Row, Col } from "reactstrap";
import './App.css';
import avatar from "./img/adr.jpg";
import { formatPrice } from './helpers';



class Banner extends React.Component {

  render() {

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
          <Col xs={{size:12}} lg={{size:10, offset:0}} className="avatar">
            <img className="img-fluid rounded-circle" src={avatar} alt=""/>
            <div className="welcome">
              <h5>Welcome back, Andrea!</h5>
              <p className="hidden-sm-down" >Your last visit was: Friday, July 28th, 2017, at 12:45PM PDT</p>
            </div>
          </Col>
          <Col xs={{size:7, offset:5}} lg={{size:2, offset:0}}>Total Balance:
            <h4>{formatPrice(total)}</h4>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Banner;
