import React from 'react';
import API from "./api";
import Transactions from "./Transactions";
import Multiselect from "./Multiselect";
import AccountFilter from "./AccountFilter";
import { Container, Row, Col, Button } from "reactstrap";
import './App.css';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.filterByAccount = this.filterByAccount.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.state = { account: "", categories: "" };
  }

  componentDidMount() {
    let component = this;
    API.getData().then(function(data) {
      console.log(data,'data')
      component.setState({
        data: data.transactionData.transactions,
        categories: data.categories,
        accounts: data.accounts
      });
    });
  }

  handleCategory(category) {
    this.setState({selectedCategories: category});
  }

  sortByDate() {
    this.setState({sort: !this.state.sort});
  }

  filterByAccount(val) {
    this.setState({account: val});
  }

  clearFilters() {
    this.setState({ selectedCategories: "", account: "", sort: false, clear: true});
  }

  componentDidUpdate(){
    if (this.state.clear) {
      this.setState({clear: false});
    }
  }

  render() {

  let data;
  let account;
  let accounts;
  let categories;
  let selectedCategories;
  let state = this.state;
  let categoriesObj = [];
  
  if (state && state.data) {
    data = state.data;
    account = state.account;
    accounts = state.accounts;
    categories = state.categories;
    selectedCategories = state.selectedCategories;
    categories.forEach(function(element, i) {
      let categoryObj = { label: element, value: element };
      categoriesObj.push(categoryObj);
    });
  }  

    return (
      <div>
        <div className="banner"></div>
        <Container>
          <h3>Transactions</h3>
          <Row>
            <Col md="5" xs="12">
              <AccountFilter 
                accounts={accounts}
                account={account}
                changeOption={this.filterByAccount} />
            </Col>
            <Col md="5" xs="12">
              <Multiselect clear={this.state.clear} onSelectCategory={this.handleCategory} categories={categoriesObj} />
            </Col>
            <Col md="2" xs="12">
            <Button className="clear" onClick={this.clearFilters} color="primary">Clear Filters</Button>
            </Col>
          </Row>
          <Row className="mt-4 hidden-sm-down header">
            <Col sm="2"><div className="sort" onClick={this.sortByDate}>Sort {this.state.sort ? "UP" : "DOWN"}</div></Col>
            <Col sm="3">Account</Col>
            <Col sm="3" className="hidden-sm-down">Category</Col>
            <Col sm="3" className="hidden-sm-down">Description</Col>
            <Col sm="1">Amount</Col>
          </Row>
          <Transactions sort={this.state.sort} account={account} selectedCategories={selectedCategories} data={data} />
        </Container>
      </div>  
    )

  }

}

export default Dashboard;
