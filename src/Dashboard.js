import React from 'react';
import API from "./api";
import Transactions from "./Transactions";
import Multiselect from "./Multiselect";
import AccountFilter from "./AccountFilter";

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.filterByAccount = this.filterByAccount.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
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

  filterByAccount(val) {
    this.setState({account: val});
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
        <AccountFilter 
          accounts={accounts}
          account={account}
          changeOption={this.filterByAccount} />
        <Multiselect clear={this.state.clear} onSelectCategory={this.handleCategory} categories={categoriesObj} />
        <Transactions account={account} selectedCategories={selectedCategories} data={data} />
      </div>  
    )

  }

}

export default Dashboard;
