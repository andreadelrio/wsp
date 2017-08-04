import React from 'react';
import API from "./api";
import Transactions from "./Transactions";
import Multiselect from "./Multiselect";
import AccountFilter from "./AccountFilter";
import Banner from "./Banner";
import { Container, Row, Col, Button } from "reactstrap";
import logo from "./img/wsb-logo.png";

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.filterByAccount = this.filterByAccount.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.state = { account: "", categories: "", clear: false };
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

  handleSort() {
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
  let accountsObj = [];
  
  if (state && state.data) {
    data = state.data;
    account = state.account;
    accounts = state.accounts;
    categories = state.categories;
    selectedCategories = state.selectedCategories;
    categories.forEach(function(element, i) {
      let categoryObj = { label: element.replace(/_/g, " "), value: element };
      categoriesObj.push(categoryObj);
    });
    accounts.forEach(function(element, i) {
      let accountObj = { label: element['accountName'], value: element['accountId'] };
      accountsObj.push(accountObj);
    });
    accountsObj.unshift({label: "All accounts", value: ""});
  }  

    return (
      <div>
        <Container fluid={true}>
          <Row>
            <Col md="2" className="p-0 hidden-md-down">
              <div className="sidebar">
                <div className="logo">
                  <img src={logo} alt=""/>
                  <span className="pl-2">WSB</span>
                </div>
                <div className="menu">
                  <p className="py-2 pl-3">ACCOUNTS</p>
                  <p className="py-2 pl-2 selected">TRANSACTIONS</p>
                  <p className="py-2 pl-3">SERVICES</p>
                  <p className="py-2 pl-3">PAY BILLS</p>
                </div>
              </div>
            </Col>
            <Col className="p-0" md="12" lg="10" xs="12">
              <Banner data={data} />
              <Container>
                <Row className="filters pt-4">
                  <Col md="6" lg="5" xs="12">
                    <AccountFilter 
                      accounts={accountsObj}
                      account={account}
                      clear={this.state.clear} 
                      changeOption={this.filterByAccount} />
                  </Col>
                  <Col md="6" lg="5" xs="12">
                    <Multiselect clear={this.state.clear} onSelectCategory={this.handleCategory} categories={categoriesObj} />
                  </Col>
                  <Col md="12" lg="2" xs="12">
                  <Button className="clear" onClick={this.clearFilters} color="primary">Clear Filters</Button>
                  </Col>
                </Row>
                <Transactions sort={this.state.sort} changeDate={this.handleSort} account={account} selectedCategories={selectedCategories} data={data} />
              </Container>
            </Col>
          </Row>
        </Container>
      </div>  
    )

  }

}

export default Dashboard;
